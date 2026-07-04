import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { authApi, getErrorMessage, getLoginErrorMessage } from '../services/api'
import type { User, UserCredentials, UserRegister } from '../types'

interface AuthContextValue {
  isAuthenticated: boolean
  loading: boolean
  user: User | null
  token: string | null
  login: (credentials: UserCredentials) => Promise<boolean>
  register: (payload: UserRegister) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  loading: true,
  user: null,
  token: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
})

const TOKEN_KEY = 'smart_restaurant_token'
const USER_KEY = 'smart_restaurant_user'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(TOKEN_KEY)
  })
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const stored = window.localStorage.getItem(USER_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [isAuthenticated, setAuthenticated] = useState(() => !!token)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    const fetchProfile = async () => {
      if (!token) {
        if (isActive) {
          setAuthenticated(false)
          setLoading(false)
        }
        return
      }

      setLoading(true)
      try {
        const response = await authApi.getProfile()
        if (!isActive) return

        const profileUser = response.data?.user
        if (!profileUser) {
          throw new Error('Profile not found')
        }

        setUser(profileUser)
        window.localStorage.setItem(USER_KEY, JSON.stringify(profileUser))
        setAuthenticated(true)
      } catch (error: unknown) {
        if (!isActive) return

        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.removeItem(USER_KEY)
        setToken(null)
        setUser(null)
        setAuthenticated(false)
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    fetchProfile()

    return () => {
      isActive = false
    }
  }, [token])

  const handleAuthResponse = (response: any) => {
    const authToken = response.data?.token
    const authUser = response.data?.user
    if (authToken) {
      window.localStorage.setItem(TOKEN_KEY, authToken)
      setToken(authToken)
      setAuthenticated(true)
    }
    if (authUser) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(authUser))
      setUser(authUser)
    }
  }

  const login = async (credentials: UserCredentials) => {
    try {
      const response = await authApi.login(credentials)
      handleAuthResponse(response)
      return true
    } catch (error: unknown) {
      throw new Error(getLoginErrorMessage(error))
    }
  }

  const register = async (payload: UserRegister) => {
    try {
      const response = await authApi.register(payload)
      handleAuthResponse(response)
      return true
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error))
    }
  }

  const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
    setAuthenticated(false)
    authApi.logout().catch(() => {})
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
