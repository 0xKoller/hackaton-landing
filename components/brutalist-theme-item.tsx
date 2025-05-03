"use client"

import { motion } from "framer-motion"

interface BrutalistThemeItemProps {
  title: string
  description: string
  index: number
}

export function BrutalistThemeItem({ title, description, index }: BrutalistThemeItemProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="border-l-8 border-green-500 pl-4 py-2 mb-8">
        <h4 className="text-2xl font-black uppercase text-green-500">{title}</h4>
        <p className="text-white/80 font-mono">{description}</p>
      </div>
    </motion.div>
  )
}
