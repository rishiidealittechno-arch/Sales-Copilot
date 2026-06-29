from __future__ import annotations

from contextlib import contextmanager
from typing import Any, Iterator

import psycopg
from psycopg.rows import dict_row

from app.config import get_settings

_connection: psycopg.Connection | None = None


def get_connection() -> psycopg.Connection:
    global _connection

    if _connection is None or _connection.closed:
        settings = get_settings()
        _connection = psycopg.connect(
            settings.database_url,
            row_factory=dict_row,
            autocommit=False,
        )

    return _connection


@contextmanager
def db_cursor() -> Iterator[psycopg.Cursor[dict[str, Any]]]:
    conn = get_connection()
    with conn.cursor() as cursor:
        try:
            yield cursor
            conn.commit()
        except Exception:
            conn.rollback()
            raise


def close_db() -> None:
    global _connection

    if _connection is not None and not _connection.closed:
        _connection.close()
    _connection = None
