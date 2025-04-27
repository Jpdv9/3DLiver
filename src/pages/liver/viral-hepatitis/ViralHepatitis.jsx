import React, { useState } from 'react'
import LiverModel from '../LiverModel'
import './ViralHepatitis.css'

export default function ViralHepatitis()  {
    const [isHealthy, setIsHealthy] =  useState(false)

    const handleToggle = () => {
        setIsHealthy(!isHealthy)
    }

    return(
        <div className = 'viral-hepatitis-container'>
            <h2 className='hepatitis-title'> Higado Con Hepatitis Viral </h2>
            <div className='hepatitis-toggle-container'>
                <button className='hepatitis-toggle-button' onClick={handleToggle}>
                    {isHealthy ? 'Ver hepatitis viral' : 'Ver hígado sano'}
                </button>
            </div>

            <div className='hepatitis-model-wrapper'>
                <LiverModel
                    modelPath={
                        isHealthy
                            ? '/modelos/Liver/healthy-liver.glb'
                            : '/modelos/viral-hepatitis/liverHepatitis.glb'
                    }
                    scale={0.09}
                />
                <p className="heptatitis-model-instructions">
                    🖱 Usa el mouse para explorar el modelo 3D:
                    <br />• Haz clic y arrastra para rotar 
                    <br />• Usa scroll para hacer zoom 
                    <br />• Haz clic derecho para mover la vista
                </p>
                <div className='hepatitis-scroll-container'>
                    <button 
                        className='hepatitis-scroll-button'
                        onClick={() => {
                            const section =  document.getElementById('lecciones')
                            if (section) section.scrollIntoView({ behavior: 'smooth'})
                        }}
                    >
                        Ir a las lecciones ⬇
                    </button>
                </div>

                <section className='hepatitis-lesson-section' id='lecciones'>
                    <h3> ¿Qué es la hepatitis viral? </h3>
                    <p>
                        La hepatitis viral es una inflamación del hígado causada por virus. Existen varios tipos, siendo los más comunes los virus de la hepatitis A, B, C, D y E. 
                        Estos virus pueden causar desde infecciones leves hasta enfermedades hepáticas graves.
                        <br /> La hepatitis B y C son las más preocupantes, ya que pueden llevar a cirrosis y cáncer de hígado.
                        <br /> La hepatitis A y E son generalmente autolimitadas y se transmiten principalmente a través de agua o alimentos contaminados.
                        <br /> La hepatitis B y C se transmiten a través de fluidos corporales, como sangre y relaciones sexuales desprotegidas.
                    </p>
                </section>
            </div>
        </div>
    )
}
