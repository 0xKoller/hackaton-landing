"use client"

import type React from "react"

import { motion } from "framer-motion"

interface BrutalistTextProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function BrutalistText({ children, delay = 0, className = "" }: BrutalistTextProps) {
  return (
    <motion.p
      className={`text-xl md:text-2xl font-mono ${className}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.p>
  )
}
