"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BrutalistCountdownProps {
  targetDate: Date
  className?: string
}

export function BrutalistCountdown({ targetDate, className = "" }: BrutalistCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    // Calculate time remaining
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If we're past the target date
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Initial calculation
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitching(true)
        setTimeout(() => setGlitching(false), 200)
      }
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(glitchInterval)
    }
  }, [targetDate])

  // Format numbers with leading zeros
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0")
  }

  return (
    <div className={`${className}`}>
      <motion.div
        className="bg-black border-4 border-green-500 p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Glitch overlay */}
        {glitching && <div className="absolute inset-0 bg-green-500/20 z-10"></div>}

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-green-500/50"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-r-4 border-t-4 border-green-500/50"></div>

        {/* Title */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-green-500 px-4 py-2 transform -skew-x-6">
            <h3 className="text-3xl md:text-4xl font-black uppercase text-black">24-HOUR HACKATHON</h3>
          </div>
          <p className="mt-4 text-xl font-mono text-white/80">JUNE 7TH, 2025 • CABA</p>
        </div>

        {/* Countdown display */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINS", value: timeLeft.minutes },
            { label: "SECS", value: timeLeft.seconds },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-black border-2 border-green-500 p-2 md:p-4 text-center relative overflow-hidden">
                {/* Animated background line */}
                <motion.div
                  className="absolute h-[1px] bg-green-500/30 left-0 right-0"
                  style={{ top: "50%" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 + index * 0.1 }}
                />

                <div className="text-4xl md:text-6xl font-mono font-bold text-green-500 relative z-10">
                  {formatNumber(item.value)}
                </div>
                <div className="text-xs md:text-sm font-mono text-white/70 mt-2">{item.label}</div>
              </div>

              {/* Corner accent */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div className="inline-block bg-green-500/10 border-l-4 border-green-500 px-4 py-2">
            <p className="text-xl font-mono text-white">
              <span className="text-green-500 font-bold">ONE DAY</span> TO HACK THE CHAT
            </p>
          </div>
        </motion.div>

        {/* Scanlines effect */}
        <div className="absolute inset-0 pointer-events-none scanlines"></div>
      </motion.div>
    </div>
  )
}
