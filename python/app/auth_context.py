from __future__ import annotations

import base64
import hashlib
import hmac
from contextvars import ContextVar
from datetime import datetime, timezone
from http.cookies import SimpleCookie
from typing import Any

import httpx

from app.config import get_settings
from app.db import db_cursor

request_cookie_header: ContextVar[str | None] = ContextVar(
    "request_cookie_header", default=None
)
request_authorization_header: ContextVar[str | None] = ContextVar(
    "request_authorization_header", default=None
)
workspace_id_context: ContextVar[str | None] = ContextVar(
    "workspace_id_context", default=None
)

SESSION_COOKIE_NAME = "better-auth.session_token"


def _parse_cookie_header(cookie_header: str | None) -> dict[str, str]:
    if not cookie_header:
        return {}

    jar = SimpleCookie()
    jar.load(cookie_header)
    return {key: morsel.value for key, morsel in jar.items()}


def _verify_signed_cookie(signed_value: str, secret: str) -> str | None:
    if "." not in signed_value:
        return None

    value, signature = signed_value.rsplit(".", 1)
    expected = base64.b64encode(
        hmac.new(
            secret.encode("utf-8"),
            value.encode("utf-8"),
            hashlib.sha256,
        ).digest()
    ).decode("utf-8")

    if not hmac.compare_digest(signature, expected):
        return None

    return value


def _session_token_from_cookie(cookie_header: str | None) -> str | None:
    cookies = _parse_cookie_header(cookie_header)
    signed_value = cookies.get(SESSION_COOKIE_NAME)

    if not signed_value:
        return None

    settings = get_settings()
    if not settings.better_auth_secret:
        return None

    return _verify_signed_cookie(signed_value, settings.better_auth_secret)


def _session_token_from_authorization(authorization_header: str | None) -> str | None:
    if not authorization_header:
        return None

    scheme, _, token = authorization_header.partition(" ")
    if scheme.lower() != "bearer" or not token.strip():
        return None

    return token.strip()


def _workspace_from_session_row(row: dict[str, Any]) -> str:
    expires_at = row["expires_at"]
    if isinstance(expires_at, datetime):
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        if expires_at <= datetime.now(timezone.utc):
            raise PermissionError("Session expired.")

    workspace_id = row["workspace_id"]
    if not workspace_id:
        raise PermissionError(
            "No active workspace on your session. Select a workspace in settings first."
        )

    return workspace_id


def _workspace_from_session_token(session_token: str) -> str:
    with db_cursor() as cursor:
        cursor.execute(
            '''
            SELECT "activeOrganizationId" AS workspace_id, "expiresAt" AS expires_at
            FROM session
            WHERE token = %s
            LIMIT 1
            ''',
            (session_token,),
        )
        row = cursor.fetchone()

    if not row:
        raise PermissionError("Session not found or expired.")

    workspace_id = _workspace_from_session_row(row)
    workspace_id_context.set(workspace_id)
    return workspace_id


def _workspace_from_auth_api(cookie_header: str | None) -> str | None:
    if not cookie_header:
        return None

    settings = get_settings()

    try:
        with httpx.Client(timeout=10.0) as client:
            response = client.get(
                f"{settings.better_auth_url}/api/auth/get-session",
                headers={"Cookie": cookie_header},
            )
    except httpx.HTTPError:
        return None

    if response.status_code != 200:
        return None

    try:
        payload = response.json()
    except ValueError:
        return None

    if not payload:
        return None

    session = payload.get("session") or {}
    workspace_id = session.get("activeOrganizationId")
    if not workspace_id:
        return None

    workspace_id_context.set(workspace_id)
    return workspace_id


def resolve_workspace_id(
    cookie_header: str | None = None,
    authorization_header: str | None = None,
) -> str:
    existing = workspace_id_context.get()
    if existing:
        return existing

    header = cookie_header if cookie_header is not None else request_cookie_header.get()
    auth_header = (
        authorization_header
        if authorization_header is not None
        else request_authorization_header.get()
    )

    session_token = _session_token_from_authorization(auth_header)
    if session_token:
        return _workspace_from_session_token(session_token)

    session_token = _session_token_from_cookie(header)
    if session_token:
        return _workspace_from_session_token(session_token)

    workspace_id = _workspace_from_auth_api(header)
    if workspace_id:
        return workspace_id

    raise PermissionError(
        "Authentication required. Sign in and select an active workspace."
    )


def clear_request_context() -> None:
    workspace_id_context.set(None)
