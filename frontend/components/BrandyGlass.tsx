// @ts-nocheck
import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Sky } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Mesh } from 'three'

const Cube = () => {

  const meshRef = useRef<Mesh>(null)

  const [colorMap, displacementMap, normalMap, roughnessMap, metalness] = useLoader(TextureLoader, [
    '/PaymentCard002_4K_Color.jpg',
    '/PaymentCard002_4K_Displacement.jpg',
    '/PaymentCard002_4K_Opacity.jpg',
    '/PaymentCard002_4K_Roughness.jpg',
    '/PaymentCard002_4K_Metalness.jpg',
  ])

  useFrame(() => {
    if (!meshRef.current) {
      return
    }
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef} shadow>
      <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#0f0f0f" />
      <planeGeometry args={[3, 2, 10]} />
      <meshLambertMaterial
        displacementScale={0.2}
        map={colorMap}
        displacementMap={displacementMap}
      />
    </mesh>
  )
}

export default function BrandyGlass() {
  return (
    <div className='h-screen bg-slate-500 z-0'>
      <div className='z-10 text-center'>
        <p className=''>Ready for growing your bank account?</p>
      </div>
      <Suspense fallback={null}>
        <Canvas background='black'>
          <ambientLight intensity={0.2} />
          <directionalLight />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Cube />
        </Canvas>
      </Suspense>
    </div>
  )
}
