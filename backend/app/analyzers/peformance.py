# backend/app/analyzers/performance.py
def get_performance_prompt(code: str) -> str:
    return f"Analisis kode berikut ini secara khusus untuk masalah Performa (e.g., loop yang tidak efisien, kebocoran memori, algoritma suboptimal, kueri yang tidak di-index). Code:\n\n{code}"
