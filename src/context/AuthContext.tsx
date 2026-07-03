import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { UserCredentials } from '../types'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (credentials: UserCredentials) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false)

  const login = async (credentials: UserCredentials) => {
    if (credentials.email && credentials.password) {
      setAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
