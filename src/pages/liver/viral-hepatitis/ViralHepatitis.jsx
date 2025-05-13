import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import LiverModel from "../LiverModelDisease"
import { IoIosHelpCircleOutline } from "react-icons/io"
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md"
import "./ViralHepatitis.css"
import "../controls.css"

export default function ViralHepatitis() {
  const [isHealthy, setIsHealthy] = useState(false)
  const [showInstructionsPopover, setShowInstructionsPopover] = useState(false)
  const [activeTab, setActiveTab] = useState("what-is")
  const [showHtmlInstructions, setShowHtmlInstructions] = useState(false)

  const iconRef = useRef(null)
  const popoverRef = useRef(null)

  const handleToggle = () => {
    setIsHealthy(!isHealthy)
    setShowInstructionsPopover(false)
  }

  const toggleInstructionsPopover = () => {

    setShowHtmlInstructions(!showHtmlInstructions)
    setShowInstructionsPopover(false)
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        showInstructionsPopover &&
        iconRef.current &&
        !iconRef.current.contains(event.target) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
        setShowInstructionsPopover(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [showInstructionsPopover])

  const lessons = [
    {
      id: "what-is",
      title: "¿Qué es la hepatitis viral?",
      content: (
        <>
          <p>
            La hepatitis viral es una inflamación del hígado causada por virus. Existen varios tipos, siendo los más
            comunes los virus de la hepatitis A, B, C, D y E. Estos virus pueden causar desde infecciones leves hasta
            enfermedades hepáticas graves.
            <br /> La hepatitis B y C son las más preocupantes, ya que pueden llevar a cirrosis y cáncer de hígado.
            <br /> La hepatitis A y E son generalmente autolimitadas y se transmiten principalmente a través de agua o
            alimentos contaminados.
            <br /> La hepatitis B y C se transmiten a través de fluidos corporales, como sangre y relaciones sexuales
            desprotegidas.
          </p>
        </>
      ),
    },
    {
      id: "symptoms",
      title: "Sintomas comunes",
      content: (
        <>
          <p>
            Los síntomas de la hepatitis viral pueden variar según el tipo y la gravedad de la infección. Algunos
            síntomas comunes incluyen:
            <ul>
              <li>Fatiga</li>
              <li>Ictericia (color amarillento en la piel y ojos)</li>
              <li>Dolor abdominal</li>
              <li>Pérdida de apetito</li>
              <li>Náuseas y vómitos</li>
            </ul>
            Sin embargo, algunas personas pueden no presentar síntomas, especialmente en las etapas iniciales de la
            infección.
          </p>
        </>
      ),
    },
    {
      id: "treatment",
      title: "Tratamiento",
      content: (
        <>
          <p>
            El tratamiento de la hepatitis viral depende del tipo de virus y la gravedad de la infección. En algunos
            casos, el tratamiento puede no ser necesario, ya que el cuerpo puede eliminar el virus por sí mismo. Sin
            embargo, en casos más graves, se pueden utilizar medicamentos antivirales para ayudar a controlar la
            infección y prevenir complicaciones.
            <br /> Para la hepatitis B y C, existen tratamientos antivirales específicos que pueden ayudar a reducir la
            carga viral y prevenir el daño hepático.
            <br /> La hepatitis A y E generalmente no requieren tratamiento específico, pero es importante mantener una
            buena hidratación y reposo.
            <br /> La prevención es clave, y las vacunas están disponibles para la hepatitis A y B.
            <br /> La hepatitis C no tiene vacuna, pero se pueden tomar medidas para reducir el riesgo de infección,
            como evitar compartir agujas y practicar sexo seguro.
            <br /> La hepatitis D solo ocurre en personas infectadas con hepatitis B, por lo que la prevención de la
            hepatitis B también previene la hepatitis D.
            <br /> La hepatitis E es más común en áreas con saneamiento deficiente y se puede prevenir mejorando las
            condiciones de higiene y acceso a agua potable.
          </p>
        </>
      ),
    },
  ]

  return (
    <div className="viral-hepatitis-container">
      {/**Migaja de pan */}
      <nav className="hepatitis-breadcrumbs">
        <Link to="/"> Inicio / </Link>
        <Link to="/higado"> Enfermadades /</Link>
        <span>Heaptitis Viral</span>
      </nav>
      <h2 className="hepatitis-title"> HEPATITIS VIRAL </h2>

      <div className="hepatitis-model-wrapper">
        <div className="hepatitis-instructions-help-container">
          <button
            ref={iconRef}
            className="hepatitis-help-icon"
            onClick={toggleInstructionsPopover}
            aria-label="Mostrar controles del modelo 3D"
          >
            <IoIosHelpCircleOutline />
          </button>

          {showInstructionsPopover && (
            <div ref={popoverRef} className="hepatitis-instructions-popover">
              <p>
                🖱 Usa el mouse para explorar el modelo 3D:
                <br />• Haz clic y arrastra para rotar
                <br />• Usa scroll para hacer zoom
                <br />• Haz clic derecho para mover la vista
              </p>
            </div>
          )}
        </div>

        <div className="hepatitis-model-container">
          <LiverModel
            modelPath={isHealthy ? "/modelos/Liver/healthy-liver.glb" : "/modelos/hepatitis/HepatitsLiver.glb"}
            scale={0.09}
            width="1200px"
            height="650px"
            showHtmlInstructions={showHtmlInstructions}
            isHealthy={isHealthy}
          />
        </div>

        <div className="hepatitis-toggle-container">
          <button className="hepatitis-toggle-button" onClick={handleToggle}>
            {isHealthy ? "Ver hepatitis viral" : "Ver hígado sano"}
          </button>
        </div>

        <div className="hepatitis-scroll-container">
          <button
            className="hepatitis-scroll-button"
            onClick={() => {
              const section = document.getElementById("lecciones")
              if (section) section.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explorar lecciones <MdOutlineKeyboardDoubleArrowDown />
          </button>
        </div>

        <section className="hepatitis-lesson-section" id="lecciones">
          <div className="hepatitis-tabs-header">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                className={`hepatitis-tab-button ${activeTab === lesson.id ? "active" : ""}`}
                onClick={() => handleTabClick(lesson.id)}
              >
                {lesson.title}
              </button>
            ))}
          </div>

          <div className="hepatitis-tab-content">
            {lessons.map(
              (lesson) =>
                activeTab === lesson.id && (
                  <div key={lesson.id} className="hepatitis-tab-pane">
                    <h3>{lesson.title}</h3>
                    {lesson.content}
                  </div>
                ),
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
