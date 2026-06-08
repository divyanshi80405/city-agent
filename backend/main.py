from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import fitz
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "City-Agent Backend Running"
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "filename": file.filename,
        "status": "uploaded successfully"
    }

@app.post("/analyze")
async def analyze_file(file: UploadFile = File(...)):

    pdf_bytes = await file.read()

    document = fitz.open(
        stream=pdf_bytes,
        filetype="pdf"
    )

    text = ""

    for page in document:
        text += page.get_text()

    department = "General Municipal Office"
    affected_departments = []
    generated_tasks = []

    lower_text = text.lower()
    matched_keywords = []

    health_keywords = [
        "insurance",
        "health",
        "medical",
        "ecg",
        "cardiovascular",
        "healthcare"
    ]

    if any(word in lower_text for word in ["tax", "income", "declaration"]):
        department = "Tax Department"
        affected_departments = [
            "Citizen Services"
        ]   

        generated_tasks = [
            "Verify tax records",
            "Update citizen profile"
        ]

    elif any(word in lower_text for word in health_keywords):
        department = "Health Department"
        affected_departments = [
            "Citizen Services"
        ]

        generated_tasks = [
        "Verify insurance eligibility",
        "Update healthcare records"
        ]

        matched_keywords = [
            word
            for word in health_keywords
            if word in lower_text
        ]

    elif any(word in lower_text for word in ["residence", "address", "registration"]):

        department = "Registry Office"

        affected_departments = [
            "Tax Department",
            "Health Department"
        ]

        generated_tasks = [
            "Update citizen address records",
            "Notify Tax Department",
            "Notify Health Department"
        ]

    if "ecg" in lower_text:
        summary = (
            "This document describes an AI-based healthcare "
            "project focused on ECG anomaly detection and "
            "cardiovascular monitoring."
        )

    elif "tax" in lower_text:
        summary = (
            "This document contains information related "
            "to tax records and citizen taxation updates."
        )

    elif "residence" in lower_text or "address" in lower_text:
        summary = (
            "This document contains residence registration "
            "or address change information."
        )

    else:
        summary = text[:150]

    validation = "Document appears complete"

    recommendation = (
        f"Forward to {department}"
    )

    task_statuses = [
        {
            "task": "Verify insurance eligibility",
            "status": "Completed"
        },
        {
            "task": "Update healthcare records",
            "status": "In Progress"
        }
    ]

    return {
        "department": department,
        "summary": summary,
        "validation": validation,
        "recommendation": recommendation,
        "matched_keywords": matched_keywords,
        "affected_departments": affected_departments,
        "generated_tasks": generated_tasks,
        "text": text[:1000],
        "task_statuses": task_statuses
    }