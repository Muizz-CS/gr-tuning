import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <--- MUST BE HERE TO ACTIVATE TAILWIND

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)