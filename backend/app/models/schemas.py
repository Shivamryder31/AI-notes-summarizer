# app/models/schemas.py
from pydantic import BaseModel
from typing import List, Optional

class SummarizeRequest(BaseModel):
    text: str
    max_length: Optional[int] = 180
    min_length: Optional[int] = 80

class SummarizeResponse(BaseModel):
    summary: str
    key_points: List[str]
