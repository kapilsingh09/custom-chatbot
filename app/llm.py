# ============================================================
# llm.py  —  Creates the Google Gemini LLM instance
# ============================================================

from langchain_google_genai import ChatGoogleGenerativeAI
from app.config import GOOGLE_API_KEY

# Create the LLM — this is the same as in your notebook
google_llm = ChatGoogleGenerativeAI(
    model="gemini-3.1-flash-lite",
    api_key=GOOGLE_API_KEY,
)
