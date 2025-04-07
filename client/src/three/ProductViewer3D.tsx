"use client"

import { Suspense, useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Stage, useAnimations } from "@react-three/drei"
import * as THREE from "three"

function Model({ modelPath, color }) {
  const group = useRef()
  const { scene, animations } = useGLTF(modelPath)
  const { actions } = useAnimations(animations, group)

  // Apply color to the model if provided
  useEffect(() => {
    if (color) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Clone the material to avoid affecting other instances
          child.material = child.material.clone()
          child.material.color = new THREE.Color(color)
        }
      })
    }
  }, [scene, color])

  // Play animation if available
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Get the first animation
      const firstAction = Object.values(actions)[0]
      firstAction.play()
    }
  }, [actions])

  return <primitive ref={group} object={scene} />
}

// Update the CameraController function to better position the camera based on model type
function CameraController({ modelPath }) {
  const { camera } = useThree()

  useEffect(() => {
    // Adjust camera position based on model type
    if (modelPath.includes("cowboy-hat")) {
      camera.position.set(0, 0, 2)
    } else if (modelPath.includes("shoes")) {
      camera.position.set(0, 0.5, 2.5)
    } else if (modelPath.includes("t-shirt")) {
      camera.position.set(0, 0, 3)
    } else if (modelPath.includes("jacket")) {
      camera.position.set(0, 0, 3)
    } else {
      camera.position.set(0, 0, 2.5)
    }
    camera.lookAt(0, 0, 0)
  }, [camera, modelPath])

  return null
}

// Update the ProductViewer3D component props
export default function ProductViewer3D({ modelPath, color }) {
  return (
    <Canvas shadows>
      <CameraController modelPath={modelPath} />
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

