from fastapi import APIRouter, Depends
from app.firebase.firebase_admin import db
from app.firebase.auth import verify_firebase_token

router = APIRouter(prefix="/notes", tags=["Notes"])

@router.get("/")
def get_notes(uid: str = Depends(verify_firebase_token)):
    docs = (
        db.collection("users")
        .document(uid)
        .collection("notes")
        .order_by("created_at", direction="DESCENDING")
        .stream()
    )

    notes = []
    for doc in docs:
        note = doc.to_dict()
        note["id"] = doc.id
        notes.append(note)

    return notes
