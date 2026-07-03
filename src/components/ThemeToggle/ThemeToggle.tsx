import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCC3AA]/30 bg-white/90 text-[#541A1A] transition hover:border-[#810B38]/80 hover:text-[#810B38]"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </motion.button>
  )
}

export default ThemeToggle
