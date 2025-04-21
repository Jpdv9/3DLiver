// src/liver/fatty-liver/FattyLiver.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Model } from './Model'
import './FattyLiver.css'

const FattyLiver = () => {
  return (
    <div className="fatty-liver-container">
      <header className="fatty-liver-header">
        <h1>Modelo 3D - Hígado Graso Temprano</h1>
        <p>Estudia los detalles del hígado afectado por esteatosis con nuestro modelo interactivo.</p>
      </header>

      <section className="canvas-wrapper">
        <Canvas shadows camera={{ position: [0, 2, 4], fov: 50 }}>
          {/* Iluminación */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          {/* Entorno e interacción */}
          <Environment preset="sunset" />
          <OrbitControls />

          {/* Modelo GLB */}
          <Model />
        </Canvas>
      </section>
    </div>
  )
}

export default FattyLiver
