import uuid
from fastapi import APIRouter
from langchain_core.messages import HumanMessage

from app.models.schemas import ChatRequest, ChatResponse
from app.services.graph import workflow

# Create a router (like a mini FastAPI app for this endpoint)
router = APIRouter()


router.post('/s/research-agents')
def go_for_research():
    