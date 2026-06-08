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

    lower_text = text.lower()

    if any(word in lower_text for word in ["tax", "income", "declaration"]):
        department = "Tax Department"

    elif any(word in lower_text for word in ["insurance", "health", "medical"]):
        department = "Health Department"

    elif any(word in lower_text for word in ["residence", "address", "registration"]):
        department = "Registry Office"

    return {
        "department": department,
        "text": text[:1000]
    }