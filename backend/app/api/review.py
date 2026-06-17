from fastapi import APIRouter, HTTPException, UploadFile, File, Form

# Ganti nama impor menggunakan alias 'as ai_engine_review' agar tidak bentrok
from app.services.ai_review import review_code as ai_engine_review
from app.parsers.python_parser import parse_python_file

router = APIRouter()


@router.post("/review")
async def review_code(file: UploadFile = File(...), language: str = Form(...)):
    try:
        contents = await file.read()
        code_str = contents.decode("utf-8")

        # Validasi berdasarkan bahasa
        if language == "python":
            try:
                code_str = parse_python_file(code_str)
            except ValueError as ve:
                raise HTTPException(status_code=400, detail=str(ve))

        # Panggil fungsi AI yang sudah diganti aliasnya
        analysis_result = ai_engine_review(code_str, language)
        return analysis_result

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memproses file: {str(e)}")
