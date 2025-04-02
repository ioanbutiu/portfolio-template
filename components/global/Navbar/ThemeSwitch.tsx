'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/global/ThemeProvider'

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className='bg-card hover:bg-primary hover:text-primary-foreground rounded-sm flex items-center justify-center h-full w-auto aspect-square transition-colors p-2'
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={14} className="" />
      ) : (
        <Sun size={14} className="" />
      )}
    </button>
  )
}