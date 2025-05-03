"use client"

import { useState, useEffect, useRef } from "react"

interface UseCounterProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  onComplete?: () => void
  formatter?: (value: number) => string
}

export function useCounter({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  onComplete,
  formatter = (value) => value.toString(),
}: UseCounterProps) {
  // Initialize with start value
  const [count, setCount] = useState(start)
  const [isComplete, setIsComplete] = useState(false)

  // Use refs to avoid dependencies in useEffect
  const endRef = useRef(end)
  const startRef = useRef(start)
  const durationRef = useRef(duration)
  const onCompleteRef = useRef(onComplete)

  // Update refs if props change
  useEffect(() => {
    endRef.current = end
    startRef.current = start
    durationRef.current = duration
    onCompleteRef.current = onComplete
  }, [end, start, duration, onComplete])

  useEffect(() => {
    // Skip animation for zero duration
    if (durationRef.current <= 0) {
      setCount(endRef.current)
      setIsComplete(true)
      if (onCompleteRef.current) onCompleteRef.current()
      return
    }

    let animationFrameId: number | null = null
    let startTime: number | null = null
    let timeoutId: NodeJS.Timeout | null = null

    // Function to run the animation
    const runAnimation = () => {
      const animate = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp
        }

        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / durationRef.current, 1)

        // Easing function for smooth animation
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
        const easedProgress = easeOutQuart(progress)

        // Calculate current value
        const currentValue = Math.floor(startRef.current + easedProgress * (endRef.current - startRef.current))

        setCount(currentValue)

        if (progress < 1) {
          // Continue animation
          animationFrameId = requestAnimationFrame(animate)
        } else {
          // Animation complete
          setCount(endRef.current)
          setIsComplete(true)
          if (onCompleteRef.current) onCompleteRef.current()
        }
      }

      // Start the animation loop
      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation after delay
    if (delay > 0) {
      timeoutId = setTimeout(runAnimation, delay)
    } else {
      runAnimation()
    }

    // Cleanup function
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    }
  }, []) // Empty dependency array - run once on mount

  return {
    count,
    isComplete,
    formattedCount: formatter(count),
  }
}
