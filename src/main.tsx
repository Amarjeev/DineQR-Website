import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'

import './index.css'
import App from './App'
import { GlobalProvider } from './Manager/useContext/GlobalContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        {/* 🔥 AnimatePresence wraps entire app for route animations */}
        <AnimatePresence mode="wait">
          <App />
        </AnimatePresence>

        {/* ✅ Global Toaster for notifications */}
        <Toaster
          position="top-center"
          containerStyle={{ marginTop: '80px' }}
          reverseOrder={false}
        />
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
)
