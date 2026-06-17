# backend/app/analyzers/security.py
def get_security_prompt(code: str) -> str:
    return f"Analisis kode berikut ini secara khusus untuk celah keamanan (e.g., SQL Injection, secret yang di-hardcode, XSS). Code:\n\n{code}"
