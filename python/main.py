import openai_secret_manager
import openai
from fastapi import FastAPI

app = FastAPI()

# Load the OpenAI API key
secrets = openai_secret_manager.get_secret("openai")
openai.api_key = secrets["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"]

@app.post("/submit")
async def submit(text: str):
    # Send the input to the OpenAI API and receive a response
    response = openai.Completion.create(
        engine="davinci",
        prompt=text,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )

    # Extract the response text from the API response
    response_text = response.choices[0].text.strip()

    # Return the response text as a JSON object
    return {"response": response_text}