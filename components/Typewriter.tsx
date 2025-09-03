'use client'

import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
  loop?: boolean
  loopDelay?: number
}

export const Typewriter = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = "", 
  onComplete,
  loop = false,
  loopDelay = 2000
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      setIsTyping(true)
    }
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else {
      if (onComplete) {
        onComplete()
      }
      
      // Loop functionality
      if (loop) {
        setTimeout(() => {
          setDisplayText('')
          setCurrentIndex(0)
        }, loopDelay)
      }
    }
  }, [currentIndex, text, speed, isTyping, onComplete, loop, loopDelay])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && isTyping && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

export default Typewriter
