"use client"

import { Suspense, useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Stage, useAnimations } from "@react-three/drei"
import * as THREE from "three"
import { GLTF } from 'three-stdlib'
import { PerspectiveCamera } from 'three'

interface ModelProps {
  modelPath: string
  color?: string
}

interface CameraControllerProps {
  modelPath: string
}

interface GLTFResult extends GLTF {
  nodes: Record<string, THREE.Object3D>
  materials: Record<string, THREE.Material>
}

function Model({ modelPath, color }: ModelProps) {
  const gltf = useGLTF(modelPath) as GLTFResult
  const { animations } = gltf
  const { actions } = useAnimations(animations, gltf.scene)

  useEffect(() => {
    if (!color) return

    Object.values(gltf.materials).forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.color.set(color)
      }
    })
  }, [color, gltf.materials])

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0]
      if (firstAction) {
        firstAction.play()
      }
    }
  }, [actions])

  return (
    <Stage adjustCamera={false}>
      <primitive object={gltf.scene} />
    </Stage>
  )
}

function CameraController({ modelPath }: CameraControllerProps) {
  const { camera } = useThree()
  const gltf = useGLTF(modelPath) as GLTFResult

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return

    const box = new THREE.Box3().setFromObject(gltf.scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = camera.fov * (Math.PI / 180)
    const cameraZ = Math.abs(maxDim / Math.tan(fov / 2)) * 1.5
    camera.position.set(0, 0, cameraZ)
    camera.lookAt(center)

    camera.updateProjectionMatrix()
  }, [camera, gltf.scene])

  return null
}

export default function ProductViewer3D({ modelPath, color }: ModelProps) {
  return (
    <Canvas shadows>
      <CameraController modelPath={modelPath} />
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} shadows>
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

