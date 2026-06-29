from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.agent import extract_assistant_text, get_agent, to_langchain_messages
from app.auth_context import (
    clear_request_context,
    request_authorization_header,
    request_cookie_header,
    resolve_workspace_id,
)
from app.config import get_settings
from app.db import close_db
from app.schemas import ChatRequest, ChatResponse

settings = get_settings()

app = FastAPI(title="Leads App AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.client_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
def shutdown_event():
    close_db()


@app.get("/")
async def root():
    return {"message": "AI Python Running"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: Request, body: ChatRequest):
    if not settings.mistral_api_key:
        raise HTTPException(
            status_code=500,
            detail="MISTRAL_API_KEY is not configured in python/.env",
        )

    cookie_header = request.headers.get("cookie")
    authorization_header = request.headers.get("authorization")
    request_cookie_header.set(cookie_header)
    request_authorization_header.set(authorization_header)

    try:
        resolve_workspace_id(cookie_header, authorization_header)
    except PermissionError as error:
        raise HTTPException(status_code=401, detail=str(error)) from error

    try:
        agent = get_agent()
        result = await agent.ainvoke({"messages": to_langchain_messages(body.messages)})
        return ChatResponse(message=extract_assistant_text(result["messages"]))
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"AI request failed: {error}",
        ) from error
    finally:
        clear_request_context()
