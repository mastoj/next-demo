"use client"

import { useEffect, useRef, useState } from "react"
import type { PlasmaParams } from "./plasma-controls"

// Default parameters
const defaultParams: PlasmaParams = {
  speed: 0.03,
  scale: 16,
  turbulence: 1,
  colorTheme: "rainbow",
  wave1: 16,
  wave2: 8,
  wave3: 16,
  wave4: 8,
}

interface RetroPlasmaProps {
  params?: Partial<PlasmaParams>
}

// Define color palette generator functions for each theme
const generateRainbowPalette = (i: number) => {
  const r = Math.sin(0.024 * i + 0) * 127 + 128
  const g = Math.sin(0.024 * i + 2) * 127 + 128
  const b = Math.sin(0.024 * i + 4) * 127 + 128
  return [Math.floor(r), Math.floor(g), Math.floor(b)]
}

const generateSunsetPalette = (i: number) => {
  const r = Math.sin(0.024 * i + 0) * 127 + 128
  const g = Math.sin(0.024 * i + 2) * 64 + 64
  const b = Math.sin(0.024 * i + 4) * 64 + 32
  return [Math.floor(r), Math.floor(g), Math.floor(b)]
}

const generateCyberpunkPalette = (i: number) => {
  const r = Math.sin(0.024 * i + 0) * 127 + 128
  const g = Math.sin(0.024 * i + 2) * 64 + 32
  const b = Math.sin(0.024 * i + 4) * 127 + 128
  return [Math.floor(r), Math.floor(g), Math.floor(b)]
}

const generateMatrixPalette = (i: number) => {
  const r = Math.sin(0.024 * i + 0) * 32
  const g = Math.sin(0.024 * i + 2) * 127 + 128
  const b = Math.sin(0.024 * i + 4) * 32
  return [Math.floor(r), Math.floor(g), Math.floor(b)]
}

const generateRetroPalette = (i: number) => {
  const r = Math.sin(0.048 * i + 0) * 127 + 128
  const g = Math.sin(0.048 * i + 2) * 127 + 128
  const b = Math.sin(0.048 * i + 4) * 127 + 128
  return [Math.floor(r), Math.floor(g), Math.floor(b)]
}

const generateMonochromePalette = (i: number) => {
  const intensity = Math.sin(0.024 * i) * 127 + 128
  return [Math.floor(intensity), Math.floor(intensity), Math.floor(intensity)]
}

export default function RetroPlasma({ params: externalParams }: RetroPlasmaProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [params, setParams] = useState<PlasmaParams>({
    ...defaultParams,
    ...externalParams,
  })

  // Update params when external params change
  useEffect(() => {
    if (externalParams) {
      setParams((prev) => ({ ...prev, ...externalParams }))
    }
  }, [externalParams])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Select the appropriate color palette generator based on theme
    let colorGenerator: (i: number) => [number, number, number]

    switch (params.colorTheme) {
      case "sunset":
        colorGenerator = generateSunsetPalette
        break
      case "cyberpunk":
        colorGenerator = generateCyberpunkPalette
        break
      case "matrix":
        colorGenerator = generateMatrixPalette
        break
      case "retro":
        colorGenerator = generateRetroPalette
        break
      case "monochrome":
        colorGenerator = generateMonochromePalette
        break
      case "rainbow":
      default:
        colorGenerator = generateRainbowPalette
        break
    }

    // Pre-calculate palette for performance
    const palette: [number, number, number][] = []
    for (let i = 0; i < 256; i++) {
      palette[i] = colorGenerator(i)
    }

    console.log("Current theme:", params.colorTheme, "First color:", palette[0])

    // Use off-screen buffer for better performance
    const offScreenCanvas = document.createElement("canvas")
    offScreenCanvas.width = rect.width
    offScreenCanvas.height = rect.height
    const offCtx = offScreenCanvas.getContext("2d")
    if (!offCtx) return

    // Create image data for direct pixel manipulation
    const imageData = offCtx.createImageData(rect.width, rect.height)
    const data = imageData.data

    let time = 0

    const render = () => {
      time += params.speed

      // Calculate plasma values for each pixel
      for (let x = 0; x < rect.width; x++) {
        for (let y = 0; y < rect.height; y++) {
          // Plasma formula using sine waves with adjustable parameters
          const scaleFactor = params.scale / 16 // Normalize scale relative to default (16)
          const value =
            Math.sin(x / (params.wave1 * scaleFactor) + time) +
            Math.sin(y / (params.wave2 * scaleFactor) + time) +
            Math.sin((x + y) / (params.wave3 * scaleFactor) + time) +
            Math.sin(Math.sqrt(x * x + y * y) / (params.wave4 * scaleFactor) + time * params.turbulence)

          // Scale to 0-255 for color mapping
          const colorIndex = Math.floor(((value + 4) * 32) % 256)

          // Get color from palette and apply directly
          const [r, g, b] = palette[colorIndex]

          const index = (y * rect.width + x) * 4
          data[index] = r // R
          data[index + 1] = g // G
          data[index + 2] = b // B
          data[index + 3] = 255 // A (fully opaque)
        }
      }

      // Put the image data on the off-screen canvas
      offCtx.putImageData(imageData, 0, 0)

      // Draw the off-screen canvas to the visible canvas
      ctx.drawImage(offScreenCanvas, 0, 0, rect.width, rect.height)

      // Request next frame
      animationRef.current = requestAnimationFrame(render)
    }

    // Start the animation
    render()

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [params]) // Re-initialize when params change

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="w-full aspect-video bg-black" style={{ touchAction: "none" }} />
}
