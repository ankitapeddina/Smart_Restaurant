import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import SectionHeader from '../../components/Common/SectionHeader'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const success = await login({ email, password })
      if (success) {
        navigate('/dashboard')
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch {
      setError('Server error. Please try again later.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[32px] border border-slate-500/10 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/30">
        <SectionHeader title="Welcome back" subtitle="Login to your dashboard" />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-emerald-400"
              required
            />
          </div>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
