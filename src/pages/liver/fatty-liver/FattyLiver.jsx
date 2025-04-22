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
          scale={0.09}
        />
        <p className="model-instructions">
          🖱 Usa el mouse para explorar el modelo 3D:
          <br />• Haz clic y arrastra para rotar <br />• Usa scroll para hacer zoom <br />• Haz clic derecho para mover la vista
        </p>
        <div className="scroll-container">
  <button
    className="scroll-button"
    onClick={() => {
      const section = document.getElementById('lecciones')
      if (section) section.scrollIntoView({ behavior: 'smooth' })
    }}
  >
    Ir a las lecciones ⬇
  </button>
</div>
  

        <section className="lesson-section" id="lecciones">
  <h3>¿Qué es el hígado graso?</h3>
  <p>
    El hígado graso, o esteatosis hepática, es una condición caracterizada por la acumulación excesiva de grasa en las células del hígado.
    Puede estar asociada con malos hábitos alimenticios, obesidad, resistencia a la insulina y consumo de alcohol.
  </p>

  <div className="lesson-block">
    <h4>Tipos de hígado graso</h4>
    <ul>
      <li><strong>Esteatosis simple:</strong> Acumulación de grasa sin inflamación significativa.</li>
      <li><strong>Esteatohepatitis:</strong> Inflamación y daño hepático acompañado de grasa (NASH).</li>
      <li><strong>Fibrosis:</strong> Formación de cicatrices hepáticas por daño prolongado.</li>
      <li><strong>Cirrosis:</strong> Cicatrización severa e irreversible, que puede derivar en fallo hepático.</li>
    </ul>
  </div>

  <div className="lesson-block">
    <h4>Síntomas comunes</h4>
    <p>
      La mayoría de los pacientes no presentan síntomas en las primeras etapas. En fases avanzadas puede causar fatiga,
      dolor en la parte superior derecha del abdomen y malestar general.
    </p>
  </div>

  <div className="lesson-block">
    <h4>Tratamiento</h4>
    <ul>
      <li>Mejorar la dieta (baja en grasas y azúcares)</li>
      <li>Ejercicio regular</li>
      <li>Control de enfermedades como diabetes o colesterol</li>
      <li>Evitar el consumo de alcohol</li>
    </ul>
  </div>
</section>

      </div>
    </div>
  )
}
