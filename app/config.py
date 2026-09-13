# ============================================================
# config.py  —  Loads environment variables from .env
# ============================================================

import os
from dotenv import load_dotenv

# Load the .env file (from the project root)
load_dotenv()

# Read API keys
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_API_KEY2 = os.getenv("GOOGLE_API_KEY2")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
HF_TOKEN = os.getenv("HF_TOKEN")

# Make sure the main key exists
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in .env file!")
