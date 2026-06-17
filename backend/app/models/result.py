# backend/app/models/result.py
from pydantic import BaseModel
from typing import List, Optional


class ReviewIssue(BaseModel):
    line: Optional[int] = None
    severity: str  # e.g., "Critical", "Warning", "Suggestion"
    category: str  # e.g., "Security", "Performance", "Style", "Complexity"
    description: str
    suggestion: str


class ReviewResponse(BaseModel):
    score: int  # Skala 1-100
    summary: str
    issues: List[ReviewIssue]
