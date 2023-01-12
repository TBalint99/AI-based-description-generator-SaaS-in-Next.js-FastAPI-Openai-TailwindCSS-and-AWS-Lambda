// @ts-nocheck
import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Sky } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Mesh } from 'three'
import * as THREE from "three";
import { motion } from "framer-motion"
import Link from 'next/link'

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
        transparent side={THREE.DoubleSide}
        map={colorMap}
        displacementMap={displacementMap}
      />
    </mesh>
  )
}

export default function BrandyGlass() {
  return (
    <div className='h-screen bg-gradient-to-b from-slate-500 to-slate-800 z-0'>
      
      <motion.div
        className='z-30 text-center pt-10'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          default: {
            duration: 0.2,
            ease: [0, 0.71, 0.2, 1.01]
          },
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
      >
        <h2 className='text-white text-2xl font-semibold'>Ready for growing your bank account?</h2>
        <p className='text-white text-xl font-semibold'>Scroll down...</p>
        <Link href="#scroll-to">
        <div className='flex justify-center text-white text-xl mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        </Link>
      </motion.div>
      <div className='h-5/6'>
        <Suspense fallback={null}>
          <Canvas background='black'>
            <ambientLight intensity={0.2} />
            <directionalLight />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <Cube />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  )
}
