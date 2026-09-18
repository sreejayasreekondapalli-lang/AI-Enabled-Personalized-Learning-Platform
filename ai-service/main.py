from fastapi import FastAPI, UploadFile, File
from pypdf import PdfReader
import io

app = FastAPI(
    title="AI Learning Platform",
    description="AI backend for personalized learning",
    version="1.0"
)


@app.get("/")
def home():
    return {
        "message": "AI Learning Platform AI Service is Running"
    }


# PDF TEXT EXTRACTION
@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        return {
            "message": "Only PDF files are allowed"
        }

    file_data = await file.read()

    pdf = PdfReader(io.BytesIO(file_data))

    text = ""

    for page in pdf.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return {
        "filename": file.filename,
        "pages": len(pdf.pages),
        "text": text
    }


# COMPETENCY GAP ANALYSIS
@app.post("/analyze-gaps")
def analyze_gaps(data: dict):

    scores = data.get("scores", {})

    weak_areas = []
    strong_areas = []

    for competency, score in scores.items():

        if score < 60:
            weak_areas.append({
                "competency": competency,
                "score": score
            })
        else:
            strong_areas.append({
                "competency": competency,
                "score": score
            })

    return {
        "message": "Competency gap analysis completed",
        "weak_areas": weak_areas,
        "strong_areas": strong_areas
    }


# MCQ GENERATION
@app.post("/generate-mcqs")
def generate_mcqs(data: dict):

    text = data.get("text", "")
    topic = data.get("topic", "General")

    if not text:
        return {
            "message": "Learning material text is required"
        }

    questions = [
        {
            "question": "What is statistical analysis?",
            "options": [
                "The process of analyzing data",
                "The process of deleting data",
                "The process of hiding data",
                "The process of ignoring data"
            ],
            "correctAnswer": "The process of analyzing data",
            "difficulty": "Easy",
            "topic": topic
        },
        {
            "question": "What is the mean?",
            "options": [
                "The average value of a set of numbers",
                "The largest value only",
                "The smallest value only",
                "The number of values"
            ],
            "correctAnswer": "The average value of a set of numbers",
            "difficulty": "Easy",
            "topic": topic
        },
        {
            "question": "Which of these is used for data visualization?",
            "options": [
                "Charts and graphs",
                "Passwords",
                "Folders",
                "Emails"
            ],
            "correctAnswer": "Charts and graphs",
            "difficulty": "Easy",
            "topic": topic
        }
    ]

    return {
        "message": "MCQs generated successfully",
        "topic": topic,
        "totalQuestions": len(questions),
        "questions": questions
    }