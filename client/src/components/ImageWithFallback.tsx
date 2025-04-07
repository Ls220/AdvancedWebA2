"use client"

import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackColor?: string
  className?: string
  width?: number
  height?: number
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackColor = "#f0f0f0",
  className = "",
  width,
  height,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{
          backgroundColor: fallbackColor,
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "100%",
        }}
      >
        <span className="text-sm text-gray-500">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => setError(true)}
    />
  )
}

