import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value.trim())
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setError('')
    setEmailError('')
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setError('')
    setPasswordError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setEmailError('')
    setPasswordError('')

    // Validation
    let hasError = false

    if (!email.trim()) {
      setEmailError('Email is required')
      hasError = true
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      hasError = true
    }

    if (!password) {
      setPasswordError('Password is required')
      hasError = true
    }

    if (hasError) {
      return
    }

    setIsLoading(true)

    try {
      const success = await login({ email: email.trim(), password })
      if (success) {
        navigate('/')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Sign In (Customer)</h1>
          <p className="login-subtitle">Login to your dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`form-input ${emailError ? 'form-input--error' : ''}`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {emailError && <p className="form-error">{emailError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`form-input ${passwordError ? 'form-input--error' : ''}`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {passwordError && <p className="form-error">{passwordError}</p>}
          </div>

          {error && <p className="form-alert form-alert--error">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading || !email || !password} 
            className="login-button"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="button-content">
                <span className="button-spinner" />
                <span className="button-text">Signing in...</span>
              </span>
            ) : (
              'Sign In (Customer)'
            )}
          </button>
        </form>

        <div className="login-links">
          <Link to="/forgot-password" className="login-link">
            Forgot password?
          </Link>
          <Link to="/register" className="login-link">
            Create a new account
          </Link>
        </div>

        <div className="mt-6 border-t border-[#DCC3AA]/40 pt-4">
          <p className="mb-3 text-sm font-semibold text-[#810B38]">-------------------------</p>
          <p className="mb-3 text-sm font-semibold text-[#810B38]">Admin access</p>
          <div className="flex flex-col gap-2">
            <Link to="/admin/login" className="login-link">
              Login as Admin
            </Link>
            <Link to="/admin/register" className="login-link">
              Register Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
