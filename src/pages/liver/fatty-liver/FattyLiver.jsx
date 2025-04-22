import React, { useState } from 'react'
import LiverModel from './LiverModel'
import './FattyLiver.css'

export default function FattyLiver() {
  const [isHealthy, setIsHealthy] = useState(false)

  const handleToggle = () => {
    setIsHealthy(!isHealthy)
  }

  return (
    <div className="fatty-liver-container">
      <h2 className="titulo">Hígado Graso</h2>
      
      <div className="toggle-container">
        <button className="toggle-button" onClick={handleToggle}>
          {isHealthy ? 'Ver hígado graso' : 'Ver hígado sano'}
        </button>
      </div>

      <div className="model-wrapper">
        <LiverModel
          modelPath={
            isHealthy
              ? '/modelos/fattyliver/healthy-liver.glb'
              : '/modelos/fattyliver/early-fatty-liver.glb'
          }
          scale={0.09} // <--- Más grande
        />
        <p className="model-instructions">
          🖱 Usa el mouse para explorar el modelo 3D:
          <br />• Haz clic y arrastra para rotar <br />• Usa scroll para hacer zoom <br />• Haz clic derecho para mover la vista
        </p>
        
      </div>
    </div>
  )
}
