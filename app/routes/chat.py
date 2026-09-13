# ============================================================
# routes/chat.py  —  The /chat endpoint
# ============================================================

import uuid
from fastapi import APIRouter
from langchain_core.messages import HumanMessage

from app.models.schemas import ChatRequest, ChatResponse
from app.services.graph import workflow

# Create a router (like a mini FastAPI app for this endpoint)
router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Main chat endpoint.
    - Receives a user message from the frontend
    - Runs it through the LangGraph workflow
    - Returns the AI's reply
    """
    # If no thread_id provided, create a new one
    thread_id = request.thread_id or str(uuid.uuid4())

    # Prepare the input (same format as your notebook)
    query = {"messages": [HumanMessage(content=request.message)]}

    # Config with thread_id so LangGraph remembers the conversation
    config = {"configurable": {"thread_id": thread_id}}

    # Run the workflow
    result = workflow.invoke(query, config=config)

    # Extract the AI's reply text
    ai_message = result["messages"][-1]

    # The AI response can be a string or a list of content blocks
    if isinstance(ai_message.content, str):
        reply_text = ai_message.content
    elif isinstance(ai_message.content, list):
        # Extract text from content blocks (like in your notebook output)
        reply_text = " ".join(
            block["text"] for block in ai_message.content
            if isinstance(block, dict) and "text" in block
        )
    else:
        reply_text = str(ai_message.content)

    return ChatResponse(reply=reply_text, thread_id=thread_id)
