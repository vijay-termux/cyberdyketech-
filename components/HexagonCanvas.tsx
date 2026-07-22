'use client'

import { useEffect, useRef } from 'react'

export default function HexagonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 70 // Account for navbar height
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Hexagon animation
    let animationId: number
    let time = 0

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.strokeStyle = '#007bff'
      ctx.lineWidth = 1
      ctx.beginPath()

      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.001

      // Draw multiple hexagons
      const hexagons = 8
      for (let i = 0; i < hexagons; i++) {
        const angle = (i / hexagons) * Math.PI * 2
        const radius = 100 + Math.sin(time + i) * 50
        const x = canvas.width / 2 + Math.cos(angle) * radius
        const y = canvas.height / 2 + Math.sin(angle) * radius
        const size = 30 + Math.sin(time + i * 0.5) * 15
        const opacity = 0.3 + Math.sin(time + i) * 0.2

        drawHexagon(x, y, size, opacity)
      }

      // Draw center hexagons
      for (let i = 0; i < 3; i++) {
        const size = 80 + Math.sin(time + i * 1.2) * 20
        const opacity = 0.2 + Math.sin(time + i) * 0.1
        drawHexagon(canvas.width / 2, canvas.height / 2, size, opacity)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="hexagon-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  )
}
