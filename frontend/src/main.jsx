import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Memastikan style Tailwind/CSS global Anda termuat

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)