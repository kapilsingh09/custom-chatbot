# ============================================================
# schemas.py  —  Pydantic models for request/response
# ============================================================

from pydantic import BaseModel


class ChatRequest(BaseModel):
    """What the frontend sends to us."""
    message: str
    thread_id: str = ""  # optional — if empty, we create a new one


class ChatResponse(BaseModel):
    """What we send back to the frontend."""
    reply: str
    thread_id: str
