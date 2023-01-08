// @ts-nocheck
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { Mesh } from 'three'

const Cube = () => {

  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) {
      return
    }
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}

export default function BrandyGlass() {
  return (
    <div className='h-screen'>
      <Canvas>
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Cube />
      </Canvas>
    </div>
  )
}
