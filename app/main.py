# ============================================================
# main.py  —  FastAPI app setup (entry point)
# ============================================================
# This file only does 2 things:
#   1. Creates the FastAPI app with CORS
#   2. Includes the route files
#
# Run with:  uvicorn app.main:app --reload
# ============================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router

# ----------------------------------------------------------
# Create the FastAPI app
# ----------------------------------------------------------
app = FastAPI(title="MA Chatbot API")

# Allow the Next.js frontend (localhost:3000) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------------
# Include routes
# ----------------------------------------------------------
app.include_router(chat_router)


@app.get("/")
def root():
    """Health check — just to verify the server is running."""
    return {"status": "ok", "message": "MA Chatbot API is running!"}
