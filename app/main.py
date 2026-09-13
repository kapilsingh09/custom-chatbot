from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from langgraph.graph import StateGraph,START,END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import BaseMessage,HumanMessage
from langgraph.graph import add_messages
from typing import Annotated,List,TypedDict


load_dotenv()
app = FastAPI()



class ChatState(TypedDict):
    messages:Annotated[List[BaseMessage],add_messages]


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/chat")
def run_model(state:ChatState):
    return state['messages'][-1].content
