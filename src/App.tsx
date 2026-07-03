import './App.css'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { useTheme } from './hooks/useTheme'

function App() {
  useTheme()

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App

