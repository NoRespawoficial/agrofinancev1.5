'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const BP = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Simple SVG icon for Google to look modern
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
)

export default function LoginPage() {
  const { user, loading, login } = useAuth()
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) router.replace('/dashboard/')
  }, [user, loading, router])

  const handleGoogleLogin = async () => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 600))
    // Simulamos que Google nos devuelve estos datos por defecto para el MVP
    login('Miguel Ríofrío', 'Chavín de Huántar S.A.C.', 'miguel@chavin.pe')
    router.replace('/dashboard/')
  }

  if (loading) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F2] px-4 relative">
      <button 
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold text-[rgba(80,108,92,0.65)] hover:text-[#137C53] min-h-[44px] px-3 rounded-xl hover:bg-[rgba(90,190,145,0.08)] transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Volver
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 overflow-hidden">
            <img src={`${BP}/logo.png`} alt="AgroFinance" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-black text-[#13301F] tracking-tight">AgroFinance</h1>
          <p className="text-xs font-semibold tracking-[0.18em] text-[#137C53] uppercase mt-0.5">Carbon Intelligence</p>
          <p className="text-sm text-[rgba(80,108,92,0.65)] mt-3 text-center">
            Inicia sesión para acceder a tu panel ESG
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white rounded-3xl border border-[rgba(90,190,145,0.15)] shadow-[0_8px_40px_rgba(16,40,28,0.08)] p-8 text-center"
        >
          <button
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white border-2 border-gray-100 text-[#13301F] font-bold text-sm hover:bg-gray-50 hover:border-gray-200 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mb-4 min-h-[44px]"
          >
            {submitting ? (
              <><Loader2 className="w-5 h-5 animate-spin text-[#137C53]" /> Conectando...</>
            ) : (
              <><GoogleIcon /> Continuar con Google</>
            )}
          </button>
          
          <div className="relative flex items-center py-2 mb-4">
            <div className="flex-grow border-t border-[rgba(90,190,145,0.15)]"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-semibold text-[rgba(80,108,92,0.4)]">Single Sign-On (SSO)</span>
            <div className="flex-grow border-t border-[rgba(90,190,145,0.15)]"></div>
          </div>
          
          <p className="text-[11px] text-[rgba(80,108,92,0.6)] leading-relaxed">
            Al continuar, AgroFinance obtendrá tu nombre y correo corporativo bajo estrictos estándares de seguridad y confidencialidad.
          </p>
        </motion.div>

        <p className="text-center text-[11px] text-[rgba(80,108,92,0.45)] mt-6">
          Campaña 2025-2026 · Datos protegidos por sesión de usuario
        </p>
      </div>
    </div>
  )
}
