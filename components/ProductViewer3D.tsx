"use client"

import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Stage } from "@react-three/drei"
import { Suspense } from "react"
import { LoadingSpinner } from "./LoadingSpinner"
import Image from 'next/image'

// Scale values for different product types
const MODEL_SCALES = {
  shoes: 4,
  hat: 3,
  kids: 1.5,
  skirt: 0.8,
  coat: 0.8,
  default: 2
}

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  
  let scale = MODEL_SCALES.default
  Object.entries(MODEL_SCALES).forEach(([key, value]) => {
    if (modelPath.toLowerCase().includes(key)) {
      scale = value
    }
  })
  
  return (
    <Stage environment="city" intensity={0.5}>
      <primitive 
        object={scene} 
        scale={scale}
        rotation={[0, Math.PI / 4, 0]}
      />
    </Stage>
  )
}

interface ProductViewer3DProps {
  modelPath: string
  fallbackImage: string
}

export default function ProductViewer3D({ modelPath, fallbackImage }: ProductViewer3DProps) {
  const [shouldShow3D, setShouldShow3D] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const checkModelAvailability = async () => {
      if (!modelPath) {
        setShouldShow3D(false)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(modelPath)
        if (!response.ok) {
          throw new Error('Model not found')
        }

        if (isMounted) {
          setShouldShow3D(true)
        }
      } catch (err) {
        console.error('Failed to load 3D model:', err)
        if (isMounted) {
          setShouldShow3D(false)
          setError(err as Error)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    checkModelAvailability()
    return () => { isMounted = false }
  }, [modelPath])

  if (!shouldShow3D || error) {
    return (
      <div className="relative w-full h-full min-h-[300px]">
        {!imageError ? (
          <Image
            src={fallbackImage}
            alt="Product"
            fill
            className="object-cover rounded-lg"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-full h-full min-h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model modelPath={modelPath} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
} 