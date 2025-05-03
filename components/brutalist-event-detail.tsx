"use client"

import type React from "react"

import { motion } from "framer-motion"

interface BrutalistEventDetailProps {
  icon: React.ReactNode
  title: string
  value: string
  index: number
}

export function BrutalistEventDetail({ icon, title, value, index }: BrutalistEventDetailProps) {
  return (
    <motion.div
      className="flex items-start gap-4 mb-8"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      <div className="bg-green-500 p-3 text-black rounded-none transform transition-transform duration-300 hover:rotate-3 hover:scale-110">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-black uppercase text-green-500">{title}</h4>
        <p className="text-lg font-mono text-white/80">{value}</p>
      </div>
    </motion.div>
  )
}
