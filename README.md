# AI Code Review Assistant (v1.5)

> Intelligent Multi-Language Code Review Platform powered by FastAPI, React, and Gemini AI.

AI Code Review Assistant adalah platform visual berbasis cloud (_cloud dashboard_) yang dirancang untuk mengotomatisasi proses audit, peninjauan (_review_), dan optimasi kode secara otonom.

Ditenagai oleh **FastAPI** pada backend dan **Gemini 2.5 Flash** melalui SDK resmi Google GenAI, sistem ini mampu memetakan _Abstract Syntax Tree (AST)_, mendeteksi potensi celah keamanan (_security flaws_), menemukan masalah kualitas kode, serta memberikan rekomendasi optimasi performa secara terstruktur.

---

## Fitur Utama

- **Autonomous Code Diagnostics**
  Unggah file kode (`.py`, `.js`, `.jsx`) dan AI akan menganalisis struktur serta kualitasnya secara otomatis.

- **Structured JSON AI Output**
  Menggunakan skema validasi **Pydantic** untuk memastikan hasil analisis AI selalu konsisten dan terstruktur.

- **Modern Cyberpunk Dashboard UI**
  Dibangun menggunakan **React**, **Vite**, **Tailwind CSS v4**, dan **Framer Motion** untuk pengalaman pengguna yang modern dan responsif.

- **Python AST Parsing**
  Memvalidasi sintaks Python menggunakan parser AST sebelum proses analisis AI dilakukan.

- **Secure API Architecture**
  Menggunakan _environment variables_ untuk penyimpanan kredensial serta konfigurasi CORS yang aman.

## Demo

Aplikasi mendukung berbagai metode pencarian untuk memberikan hasil yang relevan.

| Deskripsi                                     | Tampilan                                                               |
| :-------------------------------------------- | :--------------------------------------------------------------------- |
| Tampilan awal sistem                          | ![Tampilan Awal](assets/images/Screenshot%202026-06-29%20133536.png)   |
| Tampilan proses AI mulai menganalisis sintaks | ![Tampilan Proses](assets/images/Screenshot%202026-06-29%20134609.png) |
| Tampilan hasil pada sintaks file javascript   | ![File javascript](assets/images/Screenshot%202026-06-29%20134619.png) |
| Tampilan hasil pada sintaks file python       | ![File python](assets/images/Screenshot%202026-06-29%20134536.png)     |

---

## Struktur Proyek

```text
ai-code-review-assistant/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── review.py
│   │   ├── analyzers/
│   │   │   ├── complexity.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   └── result.py
│   │   ├── parsers/
│   │   │   └── python_parser.py
│   │   └── services/
│   │       └── ai_review.py
│   ├── main.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ReviewDashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
```

---

## Instalasi

### Prasyarat

Pastikan telah menginstal:

- Python 3.10 atau lebih baru
- Node.js 18 atau lebih baru
- npm

---

## Konfigurasi Backend (FastAPI)

Masuk ke direktori backend:

```bash
cd backend
```

Buat dan aktifkan virtual environment:

```bash
# Windows PowerShell
python -m venv .venv
.venv\Scripts\activate
```

Instal dependensi Python:

```bash
pip install -r requirements.txt
```

Buat file `.env` di folder `backend/`:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=8000
```

Jangan lupa ambil api key dari akun google gemiin anda

Jalankan server FastAPI:

```bash
python main.py
```

Atau bisa juga menggunakan:

```bash
python -m uvicorn main:app --reload
```

Backend akan tersedia di:

```text
http://localhost:8000
```

Dokumentasi API:

```text
http://localhost:8000/docs
```

---

## Konfigurasi Frontend (React + Vite)

Buka terminal baru lalu masuk ke direktori frontend:

```bash
cd frontend
```

Instal dependensi:

```bash
npm install
```

Jalankan server pengembangan:

```bash
npm run dev
```

Frontend akan tersedia di:

```text
http://localhost:5173
```

---

## Cara Menggunakan

1. Buka aplikasi di:

   ```text
   http://localhost:5173
   ```

2. Pilih bahasa pemrograman target:
   - Python
   - JavaScript

3. Unggah file kode:
   - `.py`
   - `.js`
   - `.jsx`

4. Klik tombol **Execute Diagnostic**.

5. Tunggu proses analisis selesai.

6. Tinjau hasil analisis yang mencakup:
   - Security Review
   - Performance Analysis
   - Code Style Assessment
   - Complexity Metrics
   - AI Recommendations

---

## Keamanan

Contoh `.gitignore`:

```gitignore
.env
.venv/
node_modules/
dist/
__pycache__/
```

---

## Teknologi yang Digunakan

### Backend

- FastAPI
- Pydantic
- Google GenAI SDK
- Python AST

### Frontend

- React
- Vite
- Tailwind CSS v4
- Framer Motion
- Axios

---

## Roadmap

- [ ] Multi-file project analysis
- [ ] GitHub repository scanning
- [ ] Pull Request review integration
- [ ] Team collaboration dashboard
- [ ] CI/CD integration
- [ ] PDF report export

---

## Lisensi

Proyek ini dibuat untuk tujuan pembelajaran, eksperimen, dan pengembangan portofolio.

---

**AI Code Review Assistant**
_Intelligent Multi-Language Code Review Platform powered by FastAPI, React, and Gemini AI._
