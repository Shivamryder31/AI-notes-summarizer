from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import SummarizeRequest, SummarizeResponse
from app.services.hf_models import get_models
from app.utils.chunker import chunk_text
from app.utils.keypoints import extract_key_points
from app.firebase.firebase_admin import db
from app.firebase.auth import get_current_user   # ✅ CHANGED
from datetime import datetime

router = APIRouter(tags=["Summarizer"])

@router.post("/summarize", response_model=SummarizeResponse)
def summarize(
    req: SummarizeRequest,
    user_id: str = Depends(get_current_user)   # ✅ CHANGED
):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text is empty")

    models = get_models()
    chunks = chunk_text(req.text)

    partial_summaries = []
    for chunk in chunks:
        s = models.summarize(chunk)
        partial_summaries.append(s)

    combined = " ".join(partial_summaries)

    final_summary = models.summarize(
        combined,
        max_length=250,
        min_length=120
    )

    key_points = extract_key_points(combined)

    db.collection("notes").add({
        "userId": user_id,
        "originalText": req.text[:2000],
        "summary": final_summary,
        "keyPoints": key_points,
        "source": "text",
        "createdAt": datetime.utcnow()
    })

    return {
        "summary": final_summary,
        "key_points": key_points
    }
