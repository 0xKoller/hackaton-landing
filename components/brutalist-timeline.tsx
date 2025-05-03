"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { useInView } from "framer-motion"

interface TimelineEvent {
  time: string
  title: string
  description: string
}

interface BrutalistTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function BrutalistTimeline({ events = [], className = "" }: BrutalistTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  if (!events || events.length === 0) {
    return (
      <div className={`relative ${className}`}>
        <div className="p-8 border-l-4 border-green-500">
          <p className="text-white/80 font-mono">No timeline events available.</p>
        </div>
      </div>
    )
  }

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const decorationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.5,
      },
    },
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Decorative corners */}
      <motion.div
        className="absolute -left-4 -top-4 w-20 h-20 border-t-2 border-l-2 border-green-500/50"
        variants={decorationVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      <motion.div
        className="absolute -right-4 -bottom-4 w-20 h-20 border-b-2 border-r-2 border-green-500/50"
        variants={decorationVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      {/* Title */}
      <motion.div
        className="mb-12 inline-block"
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <div className="bg-green-500 px-4 py-2 text-black relative overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black/10"
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
          <h3 className="text-4xl font-black uppercase relative z-10">24-HOUR SCHEDULE</h3>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="relative ml-4 pl-8 border-l-4 border-green-500"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="mb-12 relative"
            variants={itemVariants}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              x: 10,
              transition: { duration: 0.2 },
            }}
          >
            {/* Time marker with 3D rotation effect */}
            <div className="absolute -left-12 -mt-1 flex items-center justify-center perspective-500">
              <motion.div
                className="w-8 h-8 bg-green-500 flex items-center justify-center"
                animate={{
                  rotateY: hoveredIndex === index ? [0, 180, 360] : 0,
                  scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: hoveredIndex === index ? 1.5 : 0.5,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xs font-mono font-bold text-black">{index + 1}</span>
              </motion.div>
            </div>

            {/* Time */}
            <motion.div
              className="inline-block bg-black border-2 border-green-500 px-3 py-1 mb-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(37, 211, 102, 0.5)",
              }}
            >
              <span className="text-lg font-mono font-bold text-green-500">{event.time}</span>
            </motion.div>

            {/* Content with glitch effect on hover */}
            <motion.div
              className="bg-black border-l-4 border-green-500 p-4 relative overflow-hidden"
              whileHover={{
                borderLeftWidth: "8px",
                transition: { duration: 0.2 },
              }}
            >
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-green-500/5"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.2, 0, 0.1, 0],
                    x: [0, -5, 5, -2, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              )}

              <h4 className="text-2xl font-black uppercase text-white mb-2">{event.title}</h4>
              <p className="text-white/80 font-mono">{event.description}</p>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-green-500/30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0,
                  rotate: hoveredIndex === index ? 90 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-green-500/30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0,
                  rotate: hoveredIndex === index ? -90 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Connecting line animation */}
            {index < events.length - 1 && (
              <motion.div
                className="absolute left-0 w-[2px] bg-green-500/50"
                style={{ top: "100%", height: "40px", left: "-10px" }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.3,
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* End marker with pulse effect */}
      <motion.div
        className="absolute bottom-0 left-0 ml-4 -mb-4 -ml-4"
        initial={{ opacity: 0, scale: 0, rotate: -90 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
                rotate: 0,
              }
            : {
                opacity: 0,
                scale: 0,
                rotate: -90,
              }
        }
        transition={{
          duration: 0.7,
          delay: events.length * 0.1 + 0.5,
          type: "spring",
          stiffness: 200,
        }}
      >
        <motion.div
          className="w-12 h-12 bg-green-500 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 0px rgba(37, 211, 102, 0)",
              "0 0 20px rgba(37, 211, 102, 0.7)",
              "0 0 0px rgba(37, 211, 102, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <span className="text-lg font-mono font-bold text-black">24H</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
