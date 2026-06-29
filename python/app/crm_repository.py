from __future__ import annotations

import json
from datetime import date, datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from app.auth_context import resolve_workspace_id
from app.db import db_cursor

SNAKE_TO_CAMEL_OVERRIDES = {
    "workspace_id": "workspaceId",
    "account_id": "accountId",
    "first_name": "firstName",
    "last_name": "lastName",
    "opportunity_id": "opportunityId",
    "close_date": "closeDate",
    "due_date": "dueDate",
    "created_at": "createdAt",
    "updated_at": "updatedAt",
}


def _to_camel_case(column: str) -> str:
    if column in SNAKE_TO_CAMEL_OVERRIDES:
        return SNAKE_TO_CAMEL_OVERRIDES[column]
    parts = column.split("_")
    return parts[0] + "".join(part.capitalize() for part in parts[1:])


def _serialize_value(value: Any) -> Any:
    if isinstance(value, datetime):
        return value.isoformat()
    if isinstance(value, date):
        return value.isoformat()
    if isinstance(value, Decimal):
        return format(value, "f").rstrip("0").rstrip(".")
    if isinstance(value, UUID):
        return str(value)
    return value


def _row_to_api(row: dict[str, Any]) -> dict[str, Any]:
    return {_to_camel_case(key): _serialize_value(value) for key, value in row.items()}


def _ok(data: Any) -> str:
    return json.dumps({"ok": True, "data": data}, default=str)


def _error(message: str, status_code: int = 400) -> str:
    return json.dumps(
        {
            "ok": False,
            "status_code": status_code,
            "error": {"detail": message},
        },
        default=str,
    )


def _workspace_id() -> str:
    return resolve_workspace_id()


def _clean_optional_fields(fields: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in fields.items() if value is not None}


def _is_uuid(value: str) -> bool:
    try:
        UUID(value)
        return True
    except (ValueError, AttributeError, TypeError):
        return False


def _resolve_record_id(
    table: str,
    record_id: str,
    *,
    name_column: str | None = "name",
) -> str | None:
    if _is_uuid(record_id):
        return record_id

    if not name_column:
        return None

    workspace_id = _workspace_id()

    with db_cursor() as cursor:
        cursor.execute(
            f"""
            SELECT id
            FROM {table}
            WHERE workspace_id = %s AND LOWER({name_column}) = LOWER(%s)
            LIMIT 1
            """,
            (workspace_id, record_id.strip()),
        )
        row = cursor.fetchone()

    return str(row["id"]) if row else None


def _resolve_account_id(account_id: str) -> str | None:
    return _resolve_record_id("crm_accounts", account_id)


def _resolve_opportunity_id(opportunity_id: str) -> str | None:
    return _resolve_record_id("crm_opportunities", opportunity_id)


def _build_update_clause(fields: dict[str, Any]) -> tuple[str, list[Any]]:
    assignments: list[str] = []
    values: list[Any] = []

    for column, value in fields.items():
        assignments.append(f"{column} = %s")
        values.append(value)

    assignments.append("updated_at = CURRENT_TIMESTAMP")
    return ", ".join(assignments), values


def list_records(table: str) -> str:
    workspace_id = _workspace_id()

    with db_cursor() as cursor:
        cursor.execute(
            f"""
            SELECT *
            FROM {table}
            WHERE workspace_id = %s
            ORDER BY created_at DESC
            """,
            (workspace_id,),
        )
        rows = cursor.fetchall()

    return _ok([_row_to_api(row) for row in rows])


def get_record(table: str, record_id: str, *, name_column: str | None = "name") -> str:
    workspace_id = _workspace_id()
    resolved_id = _resolve_record_id(table, record_id, name_column=name_column)

    if not resolved_id:
        return _error(f"{table} record not found", 404)

    with db_cursor() as cursor:
        cursor.execute(
            f"""
            SELECT *
            FROM {table}
            WHERE id = %s AND workspace_id = %s
            LIMIT 1
            """,
            (resolved_id, workspace_id),
        )
        row = cursor.fetchone()

    if not row:
        return _error(f"{table} record not found", 404)

    return _ok(_row_to_api(row))


def create_record(table: str, fields: dict[str, Any]) -> str:
    workspace_id = _workspace_id()
    payload = {"workspace_id": workspace_id, **fields}
    columns = list(payload.keys())
    placeholders = ", ".join(["%s"] * len(columns))
    column_sql = ", ".join(columns)

    with db_cursor() as cursor:
        cursor.execute(
            f"""
            INSERT INTO {table} ({column_sql})
            VALUES ({placeholders})
            RETURNING *
            """,
            tuple(payload[column] for column in columns),
        )
        row = cursor.fetchone()

    return _ok(_row_to_api(row))


def update_record(
    table: str,
    record_id: str,
    fields: dict[str, Any],
    *,
    name_column: str | None = "name",
) -> str:
    workspace_id = _workspace_id()
    cleaned = _clean_optional_fields(fields)

    if not cleaned:
        return _error("No fields provided to update.")

    resolved_id = _resolve_record_id(table, record_id, name_column=name_column)
    if not resolved_id:
        return _error(
            f"Record not found. Use list tools to find the correct id or exact name for: {record_id}",
            404,
        )

    with db_cursor() as cursor:
        cursor.execute(
            f"""
            SELECT id
            FROM {table}
            WHERE id = %s AND workspace_id = %s
            LIMIT 1
            """,
            (resolved_id, workspace_id),
        )
        existing = cursor.fetchone()

        if not existing:
            return _error(f"{table} record not found", 404)

        set_clause, values = _build_update_clause(cleaned)
        cursor.execute(
            f"""
            UPDATE {table}
            SET {set_clause}
            WHERE id = %s AND workspace_id = %s
            RETURNING *
            """,
            (*values, resolved_id, workspace_id),
        )
        row = cursor.fetchone()

    return _ok(_row_to_api(row))


def _record_exists(
    table: str,
    record_id: str,
    workspace_id: str,
    *,
    id_column: str = "id",
    name_column: str | None = "name",
) -> bool:
    if id_column != "id":
        lookup_id = record_id
    elif _is_uuid(record_id):
        lookup_id = record_id
    elif name_column:
        lookup_id = _resolve_record_id(table, record_id, name_column=name_column)
    else:
        return False

    if not lookup_id:
        return False

    with db_cursor() as cursor:
        cursor.execute(
            f"""
            SELECT {id_column}
            FROM {table}
            WHERE {id_column} = %s AND workspace_id = %s
            LIMIT 1
            """,
            (lookup_id, workspace_id),
        )
        return cursor.fetchone() is not None


def list_accounts() -> str:
    return list_records("crm_accounts")


def list_accounts_without_industry() -> str:
    workspace_id = _workspace_id()

    with db_cursor() as cursor:
        cursor.execute(
            """
            SELECT *
            FROM crm_accounts
            WHERE workspace_id = %s
              AND (industry IS NULL OR BTRIM(industry) = '')
            ORDER BY created_at DESC
            """,
            (workspace_id,),
        )
        rows = cursor.fetchall()

    return _ok([_row_to_api(row) for row in rows])


def get_crm_summary() -> str:
    workspace_id = _workspace_id()

    with db_cursor() as cursor:
        cursor.execute(
            """
            SELECT
                (SELECT COUNT(*) FROM crm_accounts WHERE workspace_id = %s) AS accounts,
                (SELECT COUNT(*) FROM crm_accounts
                 WHERE workspace_id = %s
                   AND (industry IS NULL OR BTRIM(industry) = '')) AS accounts_without_industry,
                (SELECT COUNT(*) FROM crm_contacts WHERE workspace_id = %s) AS contacts,
                (SELECT COUNT(*) FROM crm_opportunities WHERE workspace_id = %s) AS opportunities,
                (SELECT COUNT(*) FROM crm_deals WHERE workspace_id = %s) AS deals,
                (SELECT COUNT(*) FROM crm_tasks WHERE workspace_id = %s) AS tasks,
                (SELECT COUNT(*) FROM crm_tasks
                 WHERE workspace_id = %s AND status = 'pending') AS pending_tasks,
                (SELECT COALESCE(SUM(amount), 0) FROM crm_opportunities
                 WHERE workspace_id = %s) AS total_opportunity_amount,
                (SELECT COALESCE(SUM(value), 0) FROM crm_deals
                 WHERE workspace_id = %s) AS total_deal_value
            """,
            tuple([workspace_id] * 9),
        )
        totals = cursor.fetchone()

        cursor.execute(
            """
            SELECT stage, COUNT(*) AS count
            FROM crm_opportunities
            WHERE workspace_id = %s AND stage IS NOT NULL AND BTRIM(stage) <> ''
            GROUP BY stage
            ORDER BY count DESC, stage ASC
            """,
            (workspace_id,),
        )
        opportunities_by_stage = [
            {"stage": row["stage"], "count": row["count"]} for row in cursor.fetchall()
        ]

        cursor.execute(
            """
            SELECT status, COUNT(*) AS count
            FROM crm_deals
            WHERE workspace_id = %s AND status IS NOT NULL AND BTRIM(status) <> ''
            GROUP BY status
            ORDER BY count DESC, status ASC
            """,
            (workspace_id,),
        )
        deals_by_status = [
            {"status": row["status"], "count": row["count"]} for row in cursor.fetchall()
        ]

        cursor.execute(
            """
            SELECT status, COUNT(*) AS count
            FROM crm_tasks
            WHERE workspace_id = %s
            GROUP BY status
            ORDER BY count DESC, status ASC
            """,
            (workspace_id,),
        )
        tasks_by_status = [
            {"status": row["status"], "count": row["count"]} for row in cursor.fetchall()
        ]

        cursor.execute(
            """
            SELECT industry, COUNT(*) AS count
            FROM crm_accounts
            WHERE workspace_id = %s AND industry IS NOT NULL AND BTRIM(industry) <> ''
            GROUP BY industry
            ORDER BY count DESC, industry ASC
            LIMIT 5
            """,
            (workspace_id,),
        )
        top_industries = [
            {"industry": row["industry"], "count": row["count"]}
            for row in cursor.fetchall()
        ]

        cursor.execute(
            """
            SELECT name, industry, created_at
            FROM crm_accounts
            WHERE workspace_id = %s
            ORDER BY created_at DESC
            LIMIT 5
            """,
            (workspace_id,),
        )
        recent_accounts = [_row_to_api(row) for row in cursor.fetchall()]

    summary = {
        "counts": {
            "accounts": totals["accounts"],
            "accountsWithoutIndustry": totals["accounts_without_industry"],
            "contacts": totals["contacts"],
            "opportunities": totals["opportunities"],
            "deals": totals["deals"],
            "tasks": totals["tasks"],
            "pendingTasks": totals["pending_tasks"],
        },
        "totals": {
            "opportunityAmount": _serialize_value(totals["total_opportunity_amount"]),
            "dealValue": _serialize_value(totals["total_deal_value"]),
        },
        "opportunitiesByStage": opportunities_by_stage,
        "dealsByStatus": deals_by_status,
        "tasksByStatus": tasks_by_status,
        "topIndustries": top_industries,
        "recentAccounts": recent_accounts,
    }

    return _ok(summary)


def create_account(
    name: str,
    website: str | None = None,
    industry: str | None = None,
    description: str | None = None,
) -> str:
    return create_record(
        "crm_accounts",
        _clean_optional_fields(
            {
                "name": name,
                "website": website,
                "industry": industry,
                "description": description,
            }
        ),
    )


def update_account(
    account_id: str,
    name: str | None = None,
    website: str | None = None,
    industry: str | None = None,
    description: str | None = None,
) -> str:
    return update_record(
        "crm_accounts",
        account_id,
        _clean_optional_fields(
            {
                "name": name,
                "website": website,
                "industry": industry,
                "description": description,
            }
        ),
    )


def list_contacts() -> str:
    return list_records("crm_contacts")


def create_contact(
    account_id: str,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    phone: str | None = None,
    title: str | None = None,
) -> str:
    workspace_id = _workspace_id()
    resolved_account_id = _resolve_account_id(account_id)

    if not resolved_account_id or not _record_exists(
        "crm_accounts", resolved_account_id, workspace_id, name_column=None
    ):
        return _error("Account not found in this workspace", 404)

    return create_record(
        "crm_contacts",
        _clean_optional_fields(
            {
                "account_id": resolved_account_id,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone": phone,
                "title": title,
            }
        ),
    )


def update_contact(
    contact_id: str,
    account_id: str | None = None,
    first_name: str | None = None,
    last_name: str | None = None,
    email: str | None = None,
    phone: str | None = None,
    title: str | None = None,
) -> str:
    workspace_id = _workspace_id()

    resolved_account_id = _resolve_account_id(account_id) if account_id else None
    if account_id and (
        not resolved_account_id
        or not _record_exists(
            "crm_accounts", resolved_account_id, workspace_id, name_column=None
        )
    ):
        return _error("Account not found in this workspace", 404)

    return update_record(
        "crm_contacts",
        contact_id,
        _clean_optional_fields(
            {
                "account_id": resolved_account_id,
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone": phone,
                "title": title,
            }
        ),
        name_column=None,
    )


def list_opportunities() -> str:
    return list_records("crm_opportunities")


def create_opportunity(
    account_id: str,
    name: str,
    stage: str | None = None,
    amount: str | None = None,
    close_date: str | None = None,
) -> str:
    workspace_id = _workspace_id()
    resolved_account_id = _resolve_account_id(account_id)

    if not resolved_account_id or not _record_exists(
        "crm_accounts", resolved_account_id, workspace_id, name_column=None
    ):
        return _error("Account not found in this workspace", 404)

    return create_record(
        "crm_opportunities",
        _clean_optional_fields(
            {
                "account_id": resolved_account_id,
                "name": name,
                "stage": stage,
                "amount": amount,
                "close_date": close_date,
            }
        ),
    )


def update_opportunity(
    opportunity_id: str,
    account_id: str | None = None,
    name: str | None = None,
    stage: str | None = None,
    amount: str | None = None,
    close_date: str | None = None,
) -> str:
    workspace_id = _workspace_id()

    resolved_account_id = _resolve_account_id(account_id) if account_id else None
    if account_id and (
        not resolved_account_id
        or not _record_exists(
            "crm_accounts", resolved_account_id, workspace_id, name_column=None
        )
    ):
        return _error("Account not found in this workspace", 404)

    return update_record(
        "crm_opportunities",
        opportunity_id,
        _clean_optional_fields(
            {
                "account_id": resolved_account_id,
                "name": name,
                "stage": stage,
                "amount": amount,
                "close_date": close_date,
            }
        ),
    )


def list_deals() -> str:
    return list_records("crm_deals")


def create_deal(
    opportunity_id: str,
    name: str,
    value: str | None = None,
    status: str | None = None,
) -> str:
    workspace_id = _workspace_id()
    resolved_opportunity_id = _resolve_opportunity_id(opportunity_id)

    if not resolved_opportunity_id or not _record_exists(
        "crm_opportunities", resolved_opportunity_id, workspace_id, name_column=None
    ):
        return _error("Opportunity not found in this workspace", 404)

    return create_record(
        "crm_deals",
        _clean_optional_fields(
            {
                "opportunity_id": resolved_opportunity_id,
                "name": name,
                "value": value,
                "status": status,
            }
        ),
    )


def update_deal(
    deal_id: str,
    opportunity_id: str | None = None,
    name: str | None = None,
    value: str | None = None,
    status: str | None = None,
) -> str:
    workspace_id = _workspace_id()

    resolved_opportunity_id = (
        _resolve_opportunity_id(opportunity_id) if opportunity_id else None
    )
    if opportunity_id and (
        not resolved_opportunity_id
        or not _record_exists(
            "crm_opportunities",
            resolved_opportunity_id,
            workspace_id,
            name_column=None,
        )
    ):
        return _error("Opportunity not found in this workspace", 404)

    return update_record(
        "crm_deals",
        deal_id,
        _clean_optional_fields(
            {
                "opportunity_id": resolved_opportunity_id,
                "name": name,
                "value": value,
                "status": status,
            }
        ),
    )


def list_tasks() -> str:
    return list_records("crm_tasks")


def create_task(
    title: str,
    opportunity_id: str | None = None,
    description: str | None = None,
    status: str | None = None,
    due_date: str | None = None,
) -> str:
    workspace_id = _workspace_id()

    resolved_opportunity_id = (
        _resolve_opportunity_id(opportunity_id) if opportunity_id else None
    )
    if opportunity_id and (
        not resolved_opportunity_id
        or not _record_exists(
            "crm_opportunities",
            resolved_opportunity_id,
            workspace_id,
            name_column=None,
        )
    ):
        return _error("Opportunity not found in this workspace", 404)

    fields: dict[str, Any] = _clean_optional_fields(
        {
            "opportunity_id": resolved_opportunity_id,
            "title": title,
            "description": description,
            "status": status or "pending",
            "due_date": due_date,
        }
    )

    return create_record("crm_tasks", fields)


def update_task(
    task_id: str,
    opportunity_id: str | None = None,
    title: str | None = None,
    description: str | None = None,
    status: str | None = None,
    due_date: str | None = None,
) -> str:
    workspace_id = _workspace_id()

    resolved_opportunity_id = (
        _resolve_opportunity_id(opportunity_id) if opportunity_id else None
    )
    if opportunity_id and (
        not resolved_opportunity_id
        or not _record_exists(
            "crm_opportunities",
            resolved_opportunity_id,
            workspace_id,
            name_column=None,
        )
    ):
        return _error("Opportunity not found in this workspace", 404)

    return update_record(
        "crm_tasks",
        task_id,
        _clean_optional_fields(
            {
                "opportunity_id": resolved_opportunity_id,
                "title": title,
                "description": description,
                "status": status,
                "due_date": due_date,
            }
        ),
        name_column="title",
    )
