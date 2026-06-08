'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error || 'Login failed.')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Login failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-neutral-800 p-6 shadow-xl space-y-4"
      >
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-wide">MEAT MOOT</h1>
          <p className="text-sm text-neutral-400 mt-1">Admin Login</p>
        </div>

        <div>
          <label htmlFor="login-email" className="block text-xs uppercase text-neutral-400 mb-1">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="login-pw" className="block text-xs uppercase text-neutral-400 mb-1">
            Password
          </label>
          <input
            id="login-pw"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-4 py-2 text-sm font-medium text-white transition"
        >
          {busy ? 'Signing in…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
