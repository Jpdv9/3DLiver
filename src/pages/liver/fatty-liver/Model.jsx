// src/components/Model.jsx
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model({ path, ...props }) {
  const { nodes, materials } = useGLTF(path)
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
