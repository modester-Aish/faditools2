'use client'

import { useState, useEffect } from 'react'

interface ModernRevealProps {
  text: string
  className?: string
  delay?: number
  repeatDelay?: number
}

export const ModernReveal = ({ 
  text, 
  className = "", 
  delay = 0,
  repeatDelay = 3000
}: ModernRevealProps) => {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setColorIndex(1)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (colorIndex === 0) return

    const repeatTimer = setInterval(() => {
      setColorIndex(prev => prev === 1 ? 2 : 1)
    }, repeatDelay)

    return () => clearInterval(repeatTimer)
  }, [colorIndex, repeatDelay])

  const colors = [
    'text-primary-500',    // Initial color
    'text-green-500',      // Green
    'text-purple-500'      // Purple
  ]

  return (
    <span 
      className={`${className} ${colors[colorIndex]} transition-colors duration-1000 ease-in-out`}
    >
      {text}
    </span>
  )
}

export default ModernReveal
