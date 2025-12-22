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
  // Start with full text to match server-side render
  const [displayText, setDisplayText] = useState(text)
  const [currentIndex, setCurrentIndex] = useState(text.length)
  const [isTyping, setIsTyping] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  // Reset after mount to start animation
  useEffect(() => {
    // Small delay to ensure hydration completes
    const timer = setTimeout(() => {
      setHasStarted(true)
      setDisplayText('')
      setCurrentIndex(0)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!hasStarted) return
    
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      setIsTyping(true)
    }
  }, [delay, hasStarted])

  useEffect(() => {
    if (!hasStarted || !isTyping) return

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
  }, [currentIndex, text, speed, isTyping, onComplete, loop, loopDelay, hasStarted])

  return (
    <span className={className} suppressHydrationWarning>
      {displayText}
      {currentIndex < text.length && isTyping && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

export default Typewriter
