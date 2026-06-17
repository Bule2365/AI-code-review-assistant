# backend/app/analyzers/style.py
def get_style_prompt(code: str) -> str:
    return f"Analisis kode berikut ini untuk konsistensi gaya dan pemformatan (e.g., konvensi penamaan, panjang baris, docstrings, dan kepatuhan terhadap panduan gaya seperti PEP 8). Code:\n\n{code}"
