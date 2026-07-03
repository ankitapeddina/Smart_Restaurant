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
    <div className="min-h-screen bg-[#F1E2D1] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-2xl shadow-[rgba(84,26,26,0.08)]">
        <SectionHeader title="Welcome back" subtitle="Login to your dashboard" />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-[#6E564D]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#6E564D]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]"
              required
            />
          </div>
          {error && <p className="text-sm text-[#810B38]">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A]">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
