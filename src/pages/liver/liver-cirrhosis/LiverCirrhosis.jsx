import React, { useState } from 'react'
import LiverModel from '../LiverModel'
import './LiverCirrhosis.css'

export default function LiverCirrhosis() {
  const [isHealthy, setIsHealthy] = useState(false)

  const handleToggle = () => {
    setIsHealthy(!isHealthy)
  }

  return (
    <div className="cirrhosis-container">
      <h2 className="titulo">Cirrosis Hepática</h2>
      
      <div className="toggle-container">
        <button className="toggle-button" onClick={handleToggle}>
          {isHealthy ? 'Ver hígado con cirrosis' : 'Ver hígado sano'}
        </button>
      </div>

      <div className="model-wrapper">
        <LiverModel
          modelPath={
            isHealthy
              ? '/modelos/fattyliver/healthy-liver.glb'
              : '/modelos/livercirrhosis/CirrosisLiver.glb'
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
          <h3>¿Qué es la cirrosis hepática?</h3>
          <p>
            La cirrosis hepática es una condición crónica e irreversible del hígado donde el tejido hepático normal es reemplazado por tejido cicatricial.
            Es el resultado final de daño hepático prolongado y puede ser causada por diversas condiciones como hepatitis viral, consumo excesivo de alcohol o hígado graso.
          </p>

          <div className="lesson-block">
            <h4>Etapas de la cirrosis</h4>
            <ul>
              <li><strong>Cirrosis compensada:</strong> El hígado aún puede funcionar relativamente bien.</li>
              <li><strong>Cirrosis descompensada:</strong> El hígado ya no puede funcionar adecuadamente.</li>
              <li><strong>Insuficiencia hepática:</strong> Fase final donde el hígado pierde casi toda su función.</li>
            </ul>
          </div>

          <div className="lesson-block">
            <h4>Síntomas comunes</h4>
            <p>
              En etapas tempranas puede ser asintomática. En fases avanzadas puede presentar:
              fatiga, ictericia, hinchazón abdominal, confusión mental, sangrado fácil y moretones.
            </p>
          </div>

          <div className="lesson-block">
            <h4>Tratamiento</h4>
            <ul>
              <li>Tratar la causa subyacente (hepatitis, alcoholismo, etc.)</li>
              <li>Control de complicaciones</li>
              <li>Cambios en el estilo de vida</li>
              <li>En casos avanzados, puede requerir trasplante hepático</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
