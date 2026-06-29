from __future__ import annotations

from typing import Optional

from langchain_core.tools import tool

from app import crm_repository


def _run(action):
    try:
        return action()
    except PermissionError as error:
        return crm_repository._error(str(error), 401)
    except Exception as error:
        return crm_repository._error(str(error), 500)


@tool
def list_accounts() -> str:
    """List all CRM accounts (leads) in the active workspace."""
    return _run(crm_repository.list_accounts)


@tool
def list_accounts_without_industry() -> str:
    """List CRM accounts (leads) that have no industry assigned."""
    return _run(crm_repository.list_accounts_without_industry)


@tool
def get_crm_summary() -> str:
    """Get a workspace CRM summary: record counts, pipeline breakdown, totals, and recent activity."""
    return _run(crm_repository.get_crm_summary)


@tool
def create_account(
    name: str,
    website: Optional[str] = None,
    industry: Optional[str] = None,
    description: Optional[str] = None,
) -> str:
    """Create a CRM account. `name` is required."""
    return _run(
        lambda: crm_repository.create_account(
            name=name,
            website=website,
            industry=industry,
            description=description,
        )
    )


@tool
def update_account(
    account_id: str,
    name: Optional[str] = None,
    website: Optional[str] = None,
    industry: Optional[str] = None,
    description: Optional[str] = None,
) -> str:
    """Update a CRM account by UUID or exact company name."""
    return _run(
        lambda: crm_repository.update_account(
            account_id=account_id,
            name=name,
            website=website,
            industry=industry,
            description=description,
        )
    )


@tool
def list_contacts() -> str:
    """List all CRM contacts in the active workspace."""
    return _run(crm_repository.list_contacts)


@tool
def create_contact(
    account_id: str,
    first_name: Optional[str] = None,
    last_name: Optional[str] = None,
    email: Optional[str] = None,
    phone: Optional[str] = None,
    title: Optional[str] = None,
) -> str:
    """Create a CRM contact linked to an account. `account_id` is required."""
    return _run(
        lambda: crm_repository.create_contact(
            account_id=account_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            title=title,
        )
    )


@tool
def update_contact(
    contact_id: str,
    account_id: Optional[str] = None,
    first_name: Optional[str] = None,
    last_name: Optional[str] = None,
    email: Optional[str] = None,
    phone: Optional[str] = None,
    title: Optional[str] = None,
) -> str:
    """Update a CRM contact by id."""
    return _run(
        lambda: crm_repository.update_contact(
            contact_id=contact_id,
            account_id=account_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            title=title,
        )
    )


@tool
def list_opportunities() -> str:
    """List all CRM opportunities in the active workspace."""
    return _run(crm_repository.list_opportunities)


@tool
def create_opportunity(
    account_id: str,
    name: str,
    stage: Optional[str] = None,
    amount: Optional[str] = None,
    close_date: Optional[str] = None,
) -> str:
    """Create a CRM opportunity linked to an account. `account_id` and `name` are required."""
    return _run(
        lambda: crm_repository.create_opportunity(
            account_id=account_id,
            name=name,
            stage=stage,
            amount=amount,
            close_date=close_date,
        )
    )


@tool
def update_opportunity(
    opportunity_id: str,
    account_id: Optional[str] = None,
    name: Optional[str] = None,
    stage: Optional[str] = None,
    amount: Optional[str] = None,
    close_date: Optional[str] = None,
) -> str:
    """Update a CRM opportunity by id."""
    return _run(
        lambda: crm_repository.update_opportunity(
            opportunity_id=opportunity_id,
            account_id=account_id,
            name=name,
            stage=stage,
            amount=amount,
            close_date=close_date,
        )
    )


@tool
def list_deals() -> str:
    """List all CRM deals in the active workspace."""
    return _run(crm_repository.list_deals)


@tool
def create_deal(
    opportunity_id: str,
    name: str,
    value: Optional[str] = None,
    status: Optional[str] = None,
) -> str:
    """Create a CRM deal linked to an opportunity. `opportunity_id` and `name` are required."""
    return _run(
        lambda: crm_repository.create_deal(
            opportunity_id=opportunity_id,
            name=name,
            value=value,
            status=status,
        )
    )


@tool
def update_deal(
    deal_id: str,
    opportunity_id: Optional[str] = None,
    name: Optional[str] = None,
    value: Optional[str] = None,
    status: Optional[str] = None,
) -> str:
    """Update a CRM deal by id."""
    return _run(
        lambda: crm_repository.update_deal(
            deal_id=deal_id,
            opportunity_id=opportunity_id,
            name=name,
            value=value,
            status=status,
        )
    )


@tool
def list_tasks() -> str:
    """List all CRM tasks in the active workspace."""
    return _run(crm_repository.list_tasks)


@tool
def create_task(
    title: str,
    opportunity_id: Optional[str] = None,
    description: Optional[str] = None,
    status: Optional[str] = None,
    due_date: Optional[str] = None,
) -> str:
    """Create a CRM task. `title` is required. Link to an opportunity with `opportunity_id`."""
    return _run(
        lambda: crm_repository.create_task(
            title=title,
            opportunity_id=opportunity_id,
            description=description,
            status=status,
            due_date=due_date,
        )
    )


@tool
def update_task(
    task_id: str,
    opportunity_id: Optional[str] = None,
    title: Optional[str] = None,
    description: Optional[str] = None,
    status: Optional[str] = None,
    due_date: Optional[str] = None,
) -> str:
    """Update a CRM task by id."""
    return _run(
        lambda: crm_repository.update_task(
            task_id=task_id,
            opportunity_id=opportunity_id,
            title=title,
            description=description,
            status=status,
            due_date=due_date,
        )
    )


CRM_TOOLS = [
    list_accounts,
    list_accounts_without_industry,
    get_crm_summary,
    create_account,
    update_account,
    list_contacts,
    create_contact,
    update_contact,
    list_opportunities,
    create_opportunity,
    update_opportunity,
    list_deals,
    create_deal,
    update_deal,
    list_tasks,
    create_task,
    update_task,
]
