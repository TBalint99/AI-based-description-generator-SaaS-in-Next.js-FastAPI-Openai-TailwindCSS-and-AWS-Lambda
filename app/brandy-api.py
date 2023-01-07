from fastapi import FastAPI, HTTPException
from app import generate_branding_description, generate_branding_keywords
from pydantic import BaseModel
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

MAX_INPUT_WORD_LIMIT = 200

app = FastAPI()
handler = Mangum(app)

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost:8000",
    "https://localhost:8000",
]

# enable React frontend via CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class DescriptionBase(BaseModel):
    topic: str
    category: str
    keywords: str
    num_of_words: int

class KeywordsBase(BaseModel):
    topic: str
    category: str

@app.get('/')
def hello():
    return "hello"

@app.post('/generate_branding_description')
async def generate_branding_description_api(request: DescriptionBase):
    validate_length(request.topic)
    description = generate_branding_description(request.topic, request.category, request.keywords, request.num_of_words)
    return { "description": description}

@app.post('/generate_branding_keywords')
async def generate_branding_keywords_api(request: KeywordsBase):
    validate_length(request.topic)
    keywords = generate_branding_keywords(request.topic, request.category)
    return { "keywords": keywords}

@app.post('/generate_branding_description_and_keywords')
async def generate_branding_keywords_api(request: DescriptionBase):
    validate_length(request.topic)
    description = generate_branding_description(request.topic, request.category, request.keywords, request.num_of_words)
    keywords = generate_branding_keywords(request.topic, request.category)
    return { "description": description, "keywords": keywords}


def validate_length(prompt: str):
    if len(prompt.strip(' ')) >= MAX_INPUT_WORD_LIMIT:
        raise HTTPException(status_code=400, detail=f"Number of words exceeded the free-trial limit: {MAX_INPUT_WORD_LIMIT}. Please shorten it.")