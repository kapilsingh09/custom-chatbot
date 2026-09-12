# 🤖 MA-Chatbot — Multi-Agent AI Chatbot

A production-oriented multi-agent AI chatbot built with **LangGraph**, **LangChain**, and **FastAPI**. It intelligently routes user queries to specialized agents — from general conversation and deep research to RAG-powered knowledge retrieval and external tool calling — delivering grounded, cited answers in real time.

---

## ✨ Key Features

| Capability | Description |
|---|---|
| **Supervisor / Router** | Understands user intent and dispatches to the right specialist agent |
| **Deep Research** | Parallel web researchers with evidence collection, credibility checking & contradiction detection |
| **Advanced RAG** | Hybrid search (vector + BM25), query rewriting, reranking, contextual compression, and citations |
| **Tool Calling** | Extensible tool registry — web search, calculator, code execution, URL reader, and more |
| **Memory** | Short-term, long-term, and user-preference memory with extraction and retrieval agents |
| **Streaming** | Real-time streaming of agent activity, tool execution status, and the final answer |
| **Critic / Verification** | Evidence verification, claim-to-evidence mapping, and hallucination reduction |

---

## 🏗️ Architecture

```
User Query
    │
    ▼
┌──────────────────┐
│  Supervisor /     │
│  Router Agent     │
└──────┬───────────┘
       │
       ├──► General Chat Agent
       ├──► Deep Research Agent  ──► Research Planner ──► Parallel Web Researchers
       ├──► RAG Agent            ──► Hybrid Retrieval ──► Reranker
       ├──► Tool-Calling Agent   ──► Tool Registry
       └──► Critic / Verification Agent
                    │
                    ▼
           Final Answer / Writer Agent
                    │
                    ▼
          Streamed Response + Citations
```

---

## 🛠️ Tech Stack

- **Orchestration** — [LangGraph](https://github.com/langchain-ai/langgraph) · [LangChain](https://github.com/langchain-ai/langchain)
- **LLM Providers** — Google Gemini · Anthropic · OpenAI · Groq
- **Embeddings** — HuggingFace / Sentence Transformers
- **Vector Store** — ChromaDB
- **Search** — Tavily
- **Backend** — FastAPI · Uvicorn
- **Database** — PostgreSQL · SQLAlchemy · asyncpg
- **Caching** — Redis
- **Document Parsing** — PyPDF · python-docx · BeautifulSoup · lxml
- **Observability** — LangSmith

---

## 📁 Project Structure

```
MA-chatbot/
├── app/
│   ├── notebooks/       # Exploration & prototyping notebooks
│   └── scripts/         # Utility scripts
├── main.py              # Application entry point
├── pyproject.toml       # Project metadata & dependencies
├── .env                 # API keys (not committed)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python **3.12+**
- [uv](https://github.com/astral-sh/uv) (recommended) or pip

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/MA-chatbot.git
cd MA-chatbot

# Install dependencies with uv
uv sync
```

### Environment Variables

Create a `.env` file in the project root with the following keys:

```env
GOOGLE_API_KEY=your-google-api-key
GROQ_API_KEY=your-groq-api-key
HF_TOKEN=your-huggingface-token
TAVILY_API_KEY=your-tavily-api-key
```

### Run

```bash
uv run python main.py
```

---

## 🗺️ Roadmap

The project is being built in four phases:

### Phase 1 — Foundation
- [x] Project setup & dependency management
- [ ] Chat with streaming
- [ ] Supervisor / Router agent
- [ ] Tool calling
- [ ] Basic memory
- [ ] LangGraph orchestration

### Phase 2 — Intelligence
- [ ] Advanced RAG (hybrid search, reranking, citations)
- [ ] Deep Research with parallel agents
- [ ] Evidence collection & verification
- [ ] Critic agent

### Phase 3 — Production
- [ ] Authentication & user workspaces
- [ ] PostgreSQL & Redis integration
- [ ] Observability & evaluation
- [ ] Cost / token tracking

### Phase 4 — Advanced
- [ ] Multimodal RAG & Graph RAG
- [ ] Voice input / output
- [ ] Human-in-the-loop workflows
- [ ] Autonomous background agents

---

## 📄 License

This project is for personal / educational use. See the repository for license details.
