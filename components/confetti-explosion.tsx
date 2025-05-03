"use client"

import { useEffect, useRef, useState } from "react"

interface ConfettiExplosionProps {
  active: boolean
  duration?: number
  particleCount?: number
  width?: number
  height?: number
  colors?: string[]
  onComplete?: () => void
}

export function ConfettiExplosion({
  active,
  duration = 2000,
  particleCount = 50,
  width = 300,
  height = 300,
  colors = ["#25D366", "#128C7E", "#075E54", "#FFFFFF", "#34B7F1"],
  onComplete,
}: ConfettiExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<any[]>([])
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Create particles when active changes to true
  useEffect(() => {
    if (active && particles.length === 0) {
      const newParticles = []
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: width / 2,
          y: height / 2,
          size: Math.random() * 8 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          speed: Math.random() * 6 + 2,
          velocity: {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8,
          },
          rotationSpeed: (Math.random() - 0.5) * 2,
          shape: Math.random() > 0.5 ? "circle" : "square",
        })
      }
      setParticles(newParticles)
      startTimeRef.current = null
    }
  }, [active, colors, height, particleCount, particles.length, width])

  // Animation loop
  useEffect(() => {
    if (!active || particles.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      const updatedParticles = [...particles]
      let allOutside = true

      updatedParticles.forEach((particle, i) => {
        // Apply gravity and friction
        particle.velocity.y += 0.1
        particle.velocity.x *= 0.99
        particle.velocity.y *= 0.99

        // Update position
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y
        particle.rotation += particle.rotationSpeed

        // Check if any particle is still inside the canvas
        if (
          particle.x > -particle.size &&
          particle.x < width + particle.size &&
          particle.y > -particle.size &&
          particle.y < height + particle.size
        ) {
          allOutside = false
        }

        // Draw particle
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.fillStyle = particle.color

        if (particle.shape === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        }

        ctx.restore()
      })

      // Continue animation if not all particles are outside or duration hasn't elapsed
      if (!allOutside && elapsed < duration) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete
        setParticles([])
        if (onComplete) onComplete()
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active, particles, width, height, duration, onComplete])

  if (!active && particles.length === 0) return null

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  )
}
