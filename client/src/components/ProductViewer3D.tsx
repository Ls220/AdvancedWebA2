"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Stage } from "@react-three/drei"
import * as THREE from "three"

function Model({ modelPath, color }) {
  const { scene } = useGLTF(modelPath)

  // Apply color to the model if provided
  if (color) {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Clone the material to avoid affecting other instances
        child.material = child.material.clone()
        child.material.color = new THREE.Color(color)
      }
    })
  }

  return <primitive object={scene} />
}

export default function ProductViewer3D({ modelPath, color }) {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} contactShadow shadows>
          <Model modelPath={modelPath} color={color} />
        </Stage>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        autoRotate
        autoRotateSpeed={2}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}

