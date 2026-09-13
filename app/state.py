# ============================================================
# state.py  —  Defines the ChatState (conversation state)
# ============================================================

from typing import Annotated, List, TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph import add_messages


# This holds the conversation history
# "add_messages" tells LangGraph to append new messages (not replace)
class ChatState(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]
