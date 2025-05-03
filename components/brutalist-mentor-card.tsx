"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface BrutalistMentorCardProps {
  name: string
  expertise: string
  bio: string
  image: string
  index: number
}

export function BrutalistMentorCard({ name, expertise, bio, image, index }: BrutalistMentorCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="group relative bg-black border-l-4 border-green-500 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Mentor image */}
          <div className="w-full md:w-1/3 aspect-square relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10"></div>
            <Image
              src={image || "/placeholder.svg?height=200&width=200"}
              alt={name}
              width={200}
              height={200}
              className="h-full w-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
            />
          </div>

          {/* Mentor info */}
          <div className="p-4 md:p-6 w-full md:w-2/3">
            <div className="bg-green-500 inline-block px-2 py-1 mb-2">
              <h3 className="text-xl font-black uppercase text-black">{name}</h3>
            </div>
            <div className="mb-2 inline-block bg-black border border-green-500/50 px-2">
              <p className="text-sm font-mono text-green-500">{expertise}</p>
            </div>
            <p className="font-mono text-white/80 text-sm">{bio}</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-6 h-6 bg-green-500"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-r border-t border-green-500"></div>
      </div>
    </motion.div>
  )
}
