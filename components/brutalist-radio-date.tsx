"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

interface BrutalistRadioDateProps {
  date: Date
  className?: string
}

export function BrutalistRadioDate({ date, className = "" }: BrutalistRadioDateProps) {
  const controls = useAnimation()
  const [tuning, setTuning] = useState(false)

  // Format date parts
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString()

  // Format for display in radio style
  const formattedDate = `${day}.${month}.${year}`

  // Generate random frequencies around the date
  const generateFrequencies = () => {
    const baseFreq = Number.parseInt(`${day}${month}`, 10) / 100
    return [
      (baseFreq - 0.6 + Math.random() * 0.3).toFixed(1),
      (baseFreq - 0.3 + Math.random() * 0.2).toFixed(1),
      baseFreq.toFixed(1),
      (baseFreq + 0.2 + Math.random() * 0.3).toFixed(1),
      (baseFreq + 0.5 + Math.random() * 0.4).toFixed(1),
    ]
  }

  const [frequencies] = useState(generateFrequencies())
  const [currentFreqIndex, setCurrentFreqIndex] = useState(2) // Start at the middle (correct date)

  // Simulate tuning the radio
  useEffect(() => {
    const tuneRadio = async () => {
      setTuning(true)

      // Randomly tune through frequencies
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * frequencies.length)
        setCurrentFreqIndex(randomIndex)
        await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300))
      }

      // Finally tune to the correct frequency
      setCurrentFreqIndex(2)
      setTuning(false)
    }

    // Initial tuning animation
    tuneRadio()

    // Occasionally retune
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        tuneRadio()
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [frequencies])

  // Needle animation
  useEffect(() => {
    controls.start({
      rotate: -30 + currentFreqIndex * 15,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    })
  }, [currentFreqIndex, controls])

  return (
    <div className={`relative bg-black border-4 border-green-500 p-4 ${className}`}>
      {/* Radio display */}
      <div className="bg-black border-2 border-green-500 p-3 relative overflow-hidden">
        {/* Frequency scale */}
        <div className="flex justify-between mb-2 relative">
          {frequencies.map((freq, index) => (
            <div
              key={index}
              className={`text-xs font-mono ${index === currentFreqIndex ? "text-green-500" : "text-green-500/50"}`}
            >
              {freq}
            </div>
          ))}

          {/* Frequency indicator line */}
          <div className="absolute top-full left-0 right-0 h-1 bg-green-500/30"></div>

          {/* Tuning needle */}
          <motion.div
            className="absolute top-full left-1/2 w-1 h-6 bg-green-500 origin-top"
            animate={controls}
            initial={{ rotate: 0 }}
          />
        </div>

        {/* Date display */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-black border-2 border-green-500 px-4 py-2">
            <motion.div
              animate={{
                opacity: tuning ? [1, 0.5, 1, 0.7, 1] : 1,
                y: tuning ? [0, -2, 1, -1, 0] : 0,
              }}
              transition={{
                duration: tuning ? 0.3 : 0,
                repeat: tuning ? Number.POSITIVE_INFINITY : 0,
              }}
            >
              <span className="text-4xl font-mono font-bold text-green-500 tracking-widest">{formattedDate}</span>
            </motion.div>
          </div>
        </div>

        {/* Static/noise effect */}
        <div className="absolute inset-0 pointer-events-none">
          {tuning && <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyNUQzNjYxMCIvPjwvc3ZnPg==')]"></div>
        </div>
      </div>

      {/* Radio controls */}
      <div className="flex justify-between mt-4">
        <div className="w-8 h-8 rounded-full bg-black border-2 border-green-500"></div>
        <div className="w-16 h-4 bg-black border-2 border-green-500"></div>
        <div className="w-8 h-8 rounded-full bg-black border-2 border-green-500"></div>
      </div>

      {/* Label */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-green-500 px-3 py-1">
        <span className="text-xs font-mono font-bold text-black uppercase">EVENT DATE</span>
      </div>
    </div>
  )
}
