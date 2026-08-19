'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FloatingInput } from '../../components/ui/floating-input'
import { Button } from '../../components/ui/button'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import '../../components/dashboard/dashboard.css'

// Metadata has been moved to layout.js since this is a Client Component.



// SVG for the Asterisk Logo
const AsteriskLogo = () => (
  <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M24 0V48M0 24H48M7.02944 7.02944L40.9706 40.9706M7.02944 40.9706L40.9706 7.02944" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Dynamic Content State
  const [scenario, setScenario] = useState('general') // 'first-time', 'returning', 'general'
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const hasLoggedIn = localStorage.getItem('admin_login_history')

    if (!hasLoggedIn) {
      setScenario('first-time')
    } else {
      setScenario(Math.random() > 0.5 ? 'returning' : 'general')
    }
  }, [])

  const contentMap = {
    'returning': {
      heading: 'Welcome\nBack!',
      description: 'Sign in to continue managing your WebTycoons dashboard, monitor key insights, and stay in control of your digital operations.'
    },
    'first-time': {
      heading: 'Welcome to the\nWebTycoons Dashboard!',
      description: 'Access a centralized workspace designed to help you manage projects, monitor performance, and streamline your digital operations efficiently.'
    },
    'general': {
      heading: 'Manage Your Workspace\nwith Confidence!',
      description: 'Securely access your dashboard to oversee your data, manage resources, and keep everything running smoothly from one place.'
    }
  }

  const currentContent = isMounted ? contentMap[scenario] : contentMap['general']

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include' ensures the HttpOnly cookie is accepted
        credentials: 'include',
        body: JSON.stringify({ email: form.username, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Login failed')

      // Only store non-sensitive UI state — the actual auth token is in HttpOnly cookie
      localStorage.setItem('admin_logged_in', 'true')
      localStorage.setItem('admin_login_history', 'true')
      // Store user display info (not the token) for dashboard UI use
      if (data.user) localStorage.setItem('admin_user', JSON.stringify(data.user))
      // NOTE: We deliberately do NOT store data.token in localStorage — it is
      // already set as an HttpOnly cookie by the server and is XSS-safe there.

      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.')
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-[#f4f6f8] font-sans text-slate-900 p-4 sm:p-8">

      {/* THE MAIN CONTAINER BOX */}
      <div className="w-full max-w-[1100px] min-h-[500px] flex flex-col lg:flex-row bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden">

        {/* LEFT PANEL - Hidden on mobile, 50% on lg */}
        <div className="hidden lg:flex flex-col relative w-[45%] xl:w-1/2 bg-[#2d3dda] text-white overflow-hidden selection:bg-white/20">

          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          {/* Geometric Curves (Overlapping arcs) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <svg className="absolute w-[200%] h-[200%] -top-[10%] -left-[30%]" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="white" strokeWidth="0.05" fill="none">
              <circle cx="0" cy="50" r="40" />
              <circle cx="0" cy="50" r="48" />
              <circle cx="0" cy="50" r="56" />
              <circle cx="0" cy="50" r="64" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col h-full p-8 lg:p-12">
            <div className="mt-2">
              <AsteriskLogo />
            </div>

            <div className="mt-12 max-w-[400px]">
              <h1 className="text-[36px] lg:text-[44px] font-bold tracking-tight leading-[1.1] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 whitespace-pre-line">
                {currentContent.heading} <span className="inline-block origin-bottom-right hover:animate-pulse"></span>
              </h1>
              <p className="text-[#aab3fa] text-[15px] leading-[1.6] font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                {currentContent.description}
              </p>
            </div>

            <div className="mt-auto pt-6">
              <p className="text-[#8894eb] text-[13px] font-medium tracking-wide">
                © {new Date().getFullYear()} WebTycoons. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Form Area */}
        <div className="w-full lg:w-[55%] xl:w-1/2 flex flex-col p-8 lg:p-10 justify-center relative bg-white">

          <div className="max-w-[400px] w-full mx-auto">

            <div className="flex flex-col items-center justify-center mb-8">
              <img src="/assets/img/logo-new.png" alt="WebTycoons Logo" className="h-[45px] w-auto object-contain mb-3" />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-[28px] font-extrabold tracking-tight mb-2">Welcome Back!</h1>
              <p className="text-[14px] text-slate-500 font-medium">Please enter your credentials to access the admin portal.</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[14px] font-medium flex items-center gap-3 mb-6 animate-in fade-in duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="relative group">
                <FloatingInput
                  label="Email Address"
                  type="email"
                  id="email"
                  required
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                />
              </div>

              <div className="relative group">
                <FloatingInput
                  label="Password"
                  type={showPwd ? 'text' : 'password'}
                  id="password"
                  required
                  className="pr-12"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors z-20"
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[54px] bg-[#1a1a1a] hover:bg-black text-white rounded-xl font-bold text-[15px] transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] active:scale-[0.98]"
                >
                  {loading ? 'Logging in...' : 'Login Now'}
                </Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
