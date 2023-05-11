from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

class Input(BaseModel):
    text: str

app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate(request: Request, input: Input):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.openai.com/v1/engines/gpt-3.5-turbo",
            headers={
                "Content-Type": "application/json",
                "Authorization": "Bearer "
            },
            json={
                "prompt": input.text,
                "max_tokens": 50,
                "temperature": 0.7,
                "n": 1,
                "stop": "\n"
            }
        )
        print(response.status_code)
        print(response.text)
        if response.status_code == 200:
            return JSONResponse(content={"text": response.json()["choices"][0]["text"]})
        else:
            return JSONResponse(content={"text": "Error"})
