import ast


def parse_python_file(content: str) -> str:
    try:
        # Validasi sintaksis secara lokal
        ast.parse(content)
        return content
    except SyntaxError as e:
        # Lontarkan error spesifik jika ada kesalahan ketik/sintaksis
        raise ValueError(f"Sintaksis Python tidak valid pada baris {e.lineno}: {e.msg}")
