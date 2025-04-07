"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, useGLTF, Float, MeshReflectorMaterial } from "@react-three/drei"
import * as THREE from "three"

function ClothingModel({ position, rotation, scale, url, color }) {
  const { scene } = useGLTF(url)
  const ref = useRef()

  // Apply color to the model if provided
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005

      if (color && ref.current.children.length > 0) {
        ref.current.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.color = new THREE.Color(color)
          }
        })
      }
    }
  })

  return <primitive ref={ref} object={scene} position={position} rotation={rotation} scale={scale} />
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#101010"
        metalness={0.5}
      />
    </mesh>
  )
}

// Update the FloatingClothes function to use more accurate descriptions
function FloatingClothes() {
  const clothes = [
    {
      url: "/assets/3d/maid_uniform.glb",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: 1.5,
      color: "#000000",
    },
    {
      url: "/assets/3d/tan_womans_coat.glb",
      position: [-2, -0.5, -1],
      rotation: [0, Math.PI / 4, 0],
      scale: 1.2,
      color: "#D2B48C",
    },
    {
      url: "/assets/3d/womenshoes.glb",
      position: [2, -0.2, -1],
      rotation: [0, -Math.PI / 5, 0],
      scale: 1.3,
      color: "#000000",
    },
  ]

  return (
    <>
      {clothes.map((item, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <ClothingModel {...item} />
        </Float>
      ))}
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 5]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Suspense fallback={null}>
          <FloatingClothes />
          <Floor />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

