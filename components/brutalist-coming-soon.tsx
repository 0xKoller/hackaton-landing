"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface BrutalistComingSoonProps {
  type: "prizes" | "prizes-no-amount" | "judges" | "mentors"
  className?: string
}

export function BrutalistComingSoon({ type, className = "" }: BrutalistComingSoonProps) {
  const [dots, setDots] = useState("...")

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "."
        if (prev === ".") return ".."
        if (prev === "..") return "..."
        return "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Different messages based on type
  const getMessage = () => {
    switch (type) {
      case "prizes":
        return "Prize details will be announced soon. Stay tuned for information about our $50,000+ prize pool and special rewards for participants."
      case "prizes-no-amount":
        return "Prize details will be announced soon. Stay tuned for information about our exclusive prize pool and special rewards for participants. Expect recognition, opportunities, and valuable resources for the winning teams."
      case "judges":
        return "Our panel of industry experts and thought leaders will be revealed soon. Expect top professionals from WhatsApp, AI, and tech industries."
      case "mentors":
        return "Technical mentors from various AI and development backgrounds will be announced shortly. They'll help you optimize your solutions during the hackathon."
      default:
        return "More information coming soon."
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Decorative elements */}
      <div className="absolute -left-4 -top-4 w-20 h-20 border-t-2 border-l-2 border-green-500/50" />
      <div className="absolute -right-4 -bottom-4 w-20 h-20 border-b-2 border-r-2 border-green-500/50" />

      <motion.div
        className="bg-black border-l-8 border-green-500 p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center mb-6">
          <div className="bg-green-500 h-8 w-8 mr-4"></div>
          <h3 className="text-4xl font-black uppercase text-white">COMING SOON{dots}</h3>
        </div>

        <p className="text-white/80 font-mono text-lg mb-6">{getMessage()}</p>

        {/* Animated placeholder elements */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-4 bg-green-500/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Digital circuit pattern */}
        <div className="mt-8 h-24 w-full circuit-pattern opacity-30"></div>

        {/* Animated blinking cursor */}
        <div className="mt-6 flex items-center">
          <span className="text-green-500 font-mono">LOADING DATA</span>
          <div className="ml-2 h-4 w-3 bg-green-500 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  )
}
