import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import AuditForm from './components/AuditForm'
import AuditResults from './components/AuditResults'
import ShareView from './components/ShareView'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [auditResult, setAuditResult] = useState(null)
  const [shareId, setShareId] = useState(null)

  useEffect(() => {
    // Load saved form state from localStorage
    const savedState = localStorage.getItem('auditFormState')
    if (savedState) {
      // Restore form state
    }
  }, [])

  return (
    <div className="App">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/audit" element={<AuditForm onAuditComplete={setAuditResult} />} />
          <Route path="/results" element={<AuditResults result={auditResult} onShare={setShareId} />} />
          <Route path="/share/:id" element={<ShareView />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App