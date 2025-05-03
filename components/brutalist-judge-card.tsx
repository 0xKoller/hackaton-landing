"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface BrutalistJudgeCardProps {
  name: string
  title: string
  bio: string
  image: string
  index: number
}

export function BrutalistJudgeCard({ name, title, bio, image, index }: BrutalistJudgeCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="group relative overflow-hidden">
        {/* Judge image with faded edges */}
        <div className="aspect-square w-full overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10"></div>
          <Image
            src={image || "/placeholder.svg?height=400&width=400"}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
          />
        </div>

        {/* Judge info with brutalist styling */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transform translate-y-0 group-hover:translate-y-0 transition-transform">
          <div className="bg-green-500 inline-block px-3 py-1 mb-2">
            <h3 className="text-2xl font-black uppercase text-black">{name}</h3>
          </div>
          <div className="bg-black/80 p-2 border-l-4 border-green-500">
            <p className="text-sm font-mono text-green-500">{title}</p>
            <p className="mt-2 text-sm font-mono text-white/80 line-clamp-3 group-hover:line-clamp-none">{bio}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
