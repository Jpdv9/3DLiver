import React, { useState } from 'react'
import LiverModel from '../LiverModel'
import './LiverCancer.css'

export default function FattyLiver() {
  const [isHealthy, setIsHealthy] = useState(false)

  const handleToggle = () => {
    setIsHealthy(!isHealthy)
  }

  return (
    <div className="liver-cancer-container">
      <h2 className="titulo">Cáncer de Higado</h2>
      
      <div className="toggle-container">
        <button className="toggle-button" onClick={handleToggle}>
          {isHealthy ? 'Ver cáncer de hígado' : 'Ver hígado sano'}
        </button>
      </div>

      <div className="model-wrapper">
        <LiverModel
          modelPath={
            isHealthy
              ? '/modelos/Liver/healthy-liver.glb'
              : '/modelos/cancerliver/CancerLiver.glb'
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
  

        <section className="cancer-lesson-section" id="lecciones">
  <h3>¿Qué es el Cáncer de hígado?</h3>
  <p>
  El cáncer de hígado es una enfermedad en la que se forman células malignas (cancerosas) en los tejidos del hígado. Puede ser primario (inicia en el hígado) o secundario/metastásico (se origina en otro órgano y se disemina al hígado).
  El tipo más común de cáncer hepático primario es el carcinoma hepatocelular (CHC).
  </p>

  <div className="lesson-block">
    <h4>Causas y factores de riesgo</h4>
    <ul>Algunos factores aumentan el riesgo de desarrollar cáncer de hígado, entre ellos:
      <li>Infección crónica por hepatitis B o C</li>
      <li>Cirrosis hepática (por alcoholismo, hepatitis, hígado graso, etc.)</li>
      <li>Consumo excesivo de alcohol</li>
      <li>Diabetes y obesidad</li>
      <li>Aflatoxinas (toxinas en alimentos mal almacenados)</li>
      <li>Tabaquismo</li>
    </ul>
  </div>

  <div className="lesson-block">
    <h4>Síntomas comunes</h4>
    <p>
    El cáncer de hígado en etapas tempranas puede no causar síntomas. A medida que progresa, pueden aparecer: Dolor abdominal (especialmente en el lado derecho) Pérdida de peso inexplicada, 
    Pérdida de apetito, Ictericia (coloración amarilla de piel y ojos), Fatiga extrema, Hinchazón en el abdomen, Náuseas y vómitos.
    </p>
  </div>

  <div className="lesson-block">
    <h4>Tratamiento</h4>
    <ul>
      <li><strong>Cirugía:</strong> Resección del tumor o trasplante de hígado.</li>
      <li><strong>Ablación:</strong> Destrucción del tumor sin cirugía (radiofrecuencia, microondas, etc.).</li>
      <li><strong>Quimioterapia:</strong> Se usa en casos avanzados o no operables.</li>
      <li><strong>Terapia dirigida:</strong> Medicamentos que bloquean el crecimiento de células cancerosas (ej. sorafenib).</li>
    </ul>
  </div>
</section>

      </div>
    </div>
  )
}
