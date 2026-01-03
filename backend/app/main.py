# app/main.py
from fastapi import FastAPI
from app.firebase.init import init_firebase
from fastapi.middleware.cors import CORSMiddleware
from app.routers.summarize import router as summarize_router
from app.routers.pdf_summarize import router as pdf_router
from app.routers.notes import router as notes_router

app = FastAPI(title="AI Notes - Backend")

init_firebase() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(summarize_router, prefix="/api")
app.include_router(pdf_router, prefix="/api")


app.include_router(notes_router, prefix="/api")
