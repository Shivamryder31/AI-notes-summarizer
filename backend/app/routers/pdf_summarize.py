from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.services.hf_models import get_models
from app.utils.keypoints import extract_key_points
from app.firebase.auth import get_current_user
from app.firebase.firebase_admin import db
from datetime import datetime
import pdfplumber

router = APIRouter(prefix="/pdf", tags=["PDF Summarizer"])


@router.post("/summarize")
async def summarize_pdf(
    file: UploadFile = File(...),
    uid: str = Depends(get_current_user)  # ✅ uid is STRING
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    try:
        # 🔹 Extract text
        text = ""
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "

        if not text.strip():
            raise HTTPException(status_code=400, detail="No readable text found in PDF")

        models = get_models()

        # 🔹 Summarize
        summary = (
            models.summarize_long_text(text)
            if len(text) > 3500
            else models.summarize(text)
        )

        key_points = extract_key_points(summary)

        # 🔥 SAVE (matches existing notes)
        db.collection("notes").add({
            "userId": uid,                # ✅ FIXED
            "type": "pdf",
            "summary": summary,
            "key_points": key_points,     # ✅ MATCH frontend
            "createdAt": datetime.utcnow()
        })

        return {
            "summary": summary,
            "key_points": key_points
        }

    except HTTPException:
        raise
    except Exception as e:
        print("PDF summarization error:", e)
        raise HTTPException(status_code=500, detail="Failed to summarize PDF")
