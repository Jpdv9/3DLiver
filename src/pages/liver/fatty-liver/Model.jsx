// src/liver/fatty-liver/Model.jsx
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/early-fatty-liver.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fattyliver.geometry}
        material={materials.earlyfattyliver}
        rotation={[2.387, 0.427, 0.371]}
        scale={0.023}
      />
    </group>
  )
}

useGLTF.preload('/early-fatty-liver.glb')
