"use client"

import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Stage, PresentationControls } from "@react-three/drei"
import { Suspense } from "react"
import { LoadingSpinner } from "./LoadingSpinner"
import Image from 'next/image'

function Model({ modelPath }: { modelPath: string }) {
  const [error, setError] = useState<Error | null>(null);
  
  try {
    const { scene } = useGLTF(modelPath)
    
    // Scale adjustment based on model type
    let scale = 2;
    if (modelPath.includes('Shoes')) scale = 4;
    if (modelPath.includes('hat')) scale = 3;
    if (modelPath.includes('kids')) scale = 1.5;
    if (modelPath.includes('skirt') || modelPath.includes('coat')) scale = 0.8;
    
    return (
      <Stage environment="city" intensity={0.5}>
        <primitive 
          object={scene} 
          scale={scale}
          rotation={[0, Math.PI / 4, 0]} // Rotate 45 degrees for better view
        />
      </Stage>
    )
  } catch (err) {
    console.error('Error loading model:', err)
    throw err;
  }
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
    const checkModelAvailability = async () => {
      if (!modelPath) {
        setShouldShow3D(false)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        // Check if the file exists
        const response = await fetch(modelPath)
        if (!response.ok) {
          throw new Error('Model not found')
        }

        setShouldShow3D(true)
      } catch (err) {
        console.error('Error checking 3D model:', err)
        setShouldShow3D(false)
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    checkModelAvailability()
  }, [modelPath])

  // If we're not showing 3D or there's an error, show the fallback image
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
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Model modelPath={modelPath} />
          </PresentationControls>
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