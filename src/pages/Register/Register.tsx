import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import SectionHeader from '../../components/Common/SectionHeader'
import Loader from '../../components/Loader/Loader'

const Register = () => {
  const { register } = useAuth()
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsLoading(true)

    try {
      if (!fullname.trim() || !email.trim() || !phone.trim() || !password.trim()) {
        throw new Error('Please fill in all fields')
      }

      const success = await register({ fullname: fullname.trim(), email: email.trim(), phone: phone.trim(), password })
      if (success) {
        setSuccessMessage('Registration successful. Please log in to continue.')
        setFullname('')
        setEmail('')
        setPhone('')
        setPassword('')
        window.setTimeout(() => navigate('/login'), 1200)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1E2D1] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-2xl shadow-[rgba(84,26,26,0.08)]">
        <SectionHeader title="Create account" subtitle="Register for a refined dining experience" />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-[#6E564D]">Full name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A] outline-none focus:border-[#810B38] focus:ring-4 focus:ring-[rgba(129,11,56,0.12)]"
              required
            />
          </div>
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
            <label className="block text-sm text-[#6E564D]">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          {error ? <p className="text-sm text-[#810B38]">{error}</p> : null}
          {successMessage ? <p className="text-sm text-[#1C7A5E]">{successMessage}</p> : null}
          <button type="submit" disabled={isLoading} className="w-full rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A] disabled:cursor-not-allowed disabled:opacity-70">
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
          {isLoading ? <div className="flex justify-center"><Loader /></div> : null}
        </form>
        <div className="mt-4 flex flex-col gap-2 text-sm text-[#810B38]">
          <Link to="/login" className="underline underline-offset-4">Already have an account? Sign in</Link>
          <Link to="/forgot-password" className="underline underline-offset-4">Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
