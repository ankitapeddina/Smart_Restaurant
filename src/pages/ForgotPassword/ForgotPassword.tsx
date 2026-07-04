import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi, getErrorMessage } from '../../services/api'
import SectionHeader from '../../components/Common/SectionHeader'
import Loader from '../../components/Loader/Loader'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)

    try {
      const response = await authApi.forgotPassword({ email: email.trim() })
      setMessage(response.data?.message || 'If an account exists, we sent a reset link to your email.')
      setEmail('')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1E2D1] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-2xl shadow-[rgba(84,26,26,0.08)]">
        <SectionHeader title="Forgot password" subtitle="Recover access to your account" />
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
          {error ? <p className="text-sm text-[#810B38]">{error}</p> : null}
          {message ? <p className="text-sm text-[#1C7A5E]">{message}</p> : null}
          <button type="submit" disabled={isLoading} className="w-full rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A] disabled:cursor-not-allowed disabled:opacity-70">
            {isLoading ? 'Sending...' : 'Send reset link'}
          </button>
          {isLoading ? <div className="flex justify-center"><Loader /></div> : null}
        </form>
        <div className="mt-4 flex flex-col gap-2 text-sm text-[#810B38]">
          <Link to="/login" className="underline underline-offset-4">Back to login</Link>
          <Link to="/register" className="underline underline-offset-4">Create a new account</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
