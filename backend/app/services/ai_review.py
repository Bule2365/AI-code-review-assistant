import os
import json
from google import genai
from google.genai import types
from app.models.result import ReviewResponse
from app.analyzers.security import get_security_prompt
from app.analyzers.complexity import get_complexity_prompt

# HAPUS BARIS GLOBAL `client = genai.Client()` DI SINI!


def review_code(code: str, language: str) -> ReviewResponse:
    # Pindahkan ke dalam fungsi ini
    client = genai.Client()

    base_prompt = (
        f"You are an expert code reviewer. Analyze this {language} code.\n"
        f"Provide a comprehensive review including security, performance, style, and complexity.\n"
        f"Code to review:\n\n{code}"
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=base_prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ReviewResponse,
        ),
    )

    result_data = json.loads(response.text)
    return ReviewResponse(**result_data)
