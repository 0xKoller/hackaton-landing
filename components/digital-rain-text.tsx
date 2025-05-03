"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface DigitalRainTextProps {
  text: string
  className?: string
  delay?: number
}

export function DigitalRainText({ text, className = "", delay = 0 }: DigitalRainTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [characters, setCharacters] = useState<string[]>([])
  const [revealed, setRevealed] = useState<boolean[]>([])

  // Matrix characters for randomization
  const matrixChars =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789"

  useEffect(() => {
    // Split text into array of characters
    const chars = text.split("")
    setCharacters(chars)

    // Initialize all characters as not revealed
    setRevealed(new Array(chars.length).fill(false))

    // Reveal characters one by one with delay
    let timeout: NodeJS.Timeout

    chars.forEach((_, index) => {
      timeout = setTimeout(
        () => {
          setRevealed((prev) => {
            const updated = [...prev]
            updated[index] = true
            return updated
          })
        },
        delay + index * 100,
      ) // Stagger the reveal
    })

    return () => clearTimeout(timeout)
  }, [text, delay])

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: revealed[index] ? 1 : 0,
            y: revealed[index] ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
        >
          {revealed[index] ? (
            <motion.span
              initial={{ color: "#25D366" }}
              animate={{ color: "#ffffff" }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ) : (
            <span className="text-green-500">{matrixChars[Math.floor(Math.random() * matrixChars.length)]}</span>
          )}
        </motion.span>
      ))}
    </div>
  )
}
