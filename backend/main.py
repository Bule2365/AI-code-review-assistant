from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.review import router as review_router

app = FastAPI(title="AI Code Review Assistant API")

# Pastikan CORS mengizinkan frontend Anda mengakses backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL Frontend Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. KRUSIAL: Pastikan baris include_router ini ada!
app.include_router(review_router)


@app.get("/")
def root():
    return {"status": "Active", "engine": "FastAPI Node"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
