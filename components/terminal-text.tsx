"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TerminalTextProps {
  lines: string[]
  typingSpeed?: number
  startDelay?: number
  className?: string
  onComplete?: () => void
}

export function TerminalText({
  lines,
  typingSpeed = 30,
  startDelay = 500,
  className = "",
  onComplete,
}: TerminalTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  // Typing effect
  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsComplete(true)
      if (onComplete) onComplete()
      return
    }

    // Initial delay before starting to type
    let timeout: NodeJS.Timeout
    if (currentChar === 0 && currentLine === 0) {
      timeout = setTimeout(() => {
        typeNextChar()
      }, startDelay)
      return () => clearTimeout(timeout)
    }

    // Type next character
    function typeNextChar() {
      if (currentLine < lines.length) {
        const line = lines[currentLine]

        if (currentChar < line.length) {
          // Still typing current line
          setDisplayedLines((prev) => {
            const newLines = [...prev]
            if (newLines.length <= currentLine) {
              newLines.push(line.substring(0, currentChar + 1))
            } else {
              newLines[currentLine] = line.substring(0, currentChar + 1)
            }
            return newLines
          })
          setCurrentChar(currentChar + 1)

          // Schedule next character
          timeout = setTimeout(typeNextChar, typingSpeed)
        } else {
          // Line complete, move to next line
          setCurrentChar(0)
          setCurrentLine(currentLine + 1)

          // Small pause between lines
          timeout = setTimeout(typeNextChar, typingSpeed * 3)
        }
      }
    }

    timeout = setTimeout(typeNextChar, typingSpeed)
    return () => clearTimeout(timeout)
  }, [currentLine, currentChar, lines, typingSpeed, startDelay, onComplete])

  // Blinking cursor effect
  useEffect(() => {
    if (isComplete) return

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [isComplete])

  return (
    <div className={`font-mono text-green-500 bg-black p-4 border-2 border-green-500 ${className}`}>
      {displayedLines.map((line, index) => (
        <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-1">
          <span className="text-green-300">{">"}</span> {line}
          {index === displayedLines.length - 1 && !isComplete && (
            <span
              className={`inline-block w-2 h-4 bg-green-500 ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
            ></span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
