import json

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from app.agent import (
    extract_assistant_text,
    extract_chunk_text,
    format_tool_status,
    get_agent,
    to_langchain_messages,
)
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


def _format_sse(event: dict) -> str:
    return f"data: {json.dumps(event)}\n\n"


@app.post("/chat/stream")
async def chat_stream(request: Request, body: ChatRequest):
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

    async def generate():
        try:
            agent = get_agent()
            async for event in agent.astream_events(
                {"messages": to_langchain_messages(body.messages)},
                version="v2",
            ):
                kind = event["event"]
                if kind == "on_tool_start":
                    tool_name = event.get("name") or ""
                    if tool_name:
                        yield _format_sse(
                            {
                                "type": "status",
                                "content": format_tool_status(tool_name),
                            }
                        )
                elif kind == "on_chat_model_stream":
                    chunk = event["data"]["chunk"]
                    if getattr(chunk, "tool_call_chunks", None):
                        continue
                    text = extract_chunk_text(chunk)
                    if text:
                        yield _format_sse({"type": "token", "content": text})
            yield _format_sse({"type": "done"})
        except Exception as error:
            yield _format_sse(
                {"type": "error", "content": f"AI request failed: {error}"}
            )
        finally:
            clear_request_context()

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
