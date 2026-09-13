# ============================================================
# services/graph.py  —  Builds the LangGraph workflow
# ============================================================
# This is the same logic from your notebook:
#   START → chat_node → END
# with InMemorySaver so it remembers conversation history.
# ============================================================

from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import InMemorySaver
from langchain_core.messages import SystemMessage

from app.models.state import ChatState
from app.services.llm import google_llm


# ----------------------------------------------------------
# The "chat_node" — calls the LLM with conversation history
# ----------------------------------------------------------
def chat_node(state: ChatState) -> dict:
    """Takes the conversation history, adds a system prompt, and calls the LLM."""
    messages = state.get("messages", [])

    system_prompt = SystemMessage(
        content="You are a helpful assistant chatbot. Always reply politely and helpfully."
    )

    # Call the LLM with system prompt + all previous messages
    response = google_llm.invoke([system_prompt] + messages)

    return {"messages": [response]}


# ----------------------------------------------------------
# Build the graph:  START → chat_node → END
# ----------------------------------------------------------
graph = StateGraph(ChatState)
graph.add_node("chat_node", chat_node)
graph.add_edge(START, "chat_node")
graph.add_edge("chat_node", END)

# Compile with memory checkpointer
checkpointer = InMemorySaver()
workflow = graph.compile(checkpointer=checkpointer)
