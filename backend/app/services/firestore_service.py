from app.firebase.firebase_admin import db
from datetime import datetime

def save_note(uid, title, summary, key_points, source):
    note_ref = (
        db.collection("users")
        .document(uid)
        .collection("notes")
        .document()
    )

    note_ref.set({
        "title": title,
        "summary": summary,
        "key_points": key_points,
        "source": source,
        "created_at": datetime.utcnow()
    })

    return note_ref.id
