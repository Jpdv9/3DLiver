import LiverModel from '../LiverModel'
import './FattyLiver.css'
import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { IoIosHelpCircleOutline } from "react-icons/io"
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md"
import "../controls.css"

export default function FattyLiver() {
  const [isHealthy, setIsHealthy] = useState(false)
  const [showInstructionsPopover, setShowInstructionsPopover] = useState(false)
  const [activeTab, setActiveTab] = useState("what-is")
  const [showHtmlInstructions, setShowHtmlInstructions] = useState(false)
  const [showTreatment, setShowTreatment] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const iconRef = useRef(null)
  const popoverRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleTreatmentToggle = () => {
    setShowTreatment(true)
    setIsHealthy(false)
  }

  const handleFattyLiver = () => {
    setIsHealthy(false)
    setShowTreatment(false)
  }

  const handleHealthyLiver = () => {
    setIsHealthy(true)
    setShowInstructionsPopover(false)
    setShowTreatment(false)
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
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [showInstructionsPopover])

  const lessons = [
    {
      id: "what-is",
      title: "¿Qué es el hígado graso?",
      icon: "🧈",
      content: (
        <div className="lesson-content">
          <div className="content-highlight">
            <p>
              El <strong>hígado graso</strong> es una condición en la que se acumula grasa en las células hepáticas. Puede ser causada por una dieta alta en grasas, alcohol, obesidad o trastornos metabólicos.
            </p>
          </div>
          <div className="content-section">
            <h4>📌 Tipos</h4>
            <p>Puede clasificarse como <em>alcohólico</em> o <em>no alcohólico</em>.</p>
          </div>
        </div>
      ),
    },
    {
      id: "symptoms",
      title: "Síntomas comunes",
      icon: "🩺",
      content: (
        <div className="lesson-content">
          <div className="content-section">
            <h4>🧭 Síntomas principales</h4>
            <ul>              
              <li>Dolor abdominal</li>
              <li>Pérdida de apetito</li>
              <li>Ictericia</li>
              <li>Fatiga</li>
              <li>Inflamación del hígado</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "treatment",
      title: "Tratamiento y prevención",
      icon: "💊",
      content: (
        <div className="lesson-content">
          <div className="content-section">
            <h4>🛡️ Recomendaciones</h4>
            <ul>
              <li>Mejorar la alimentación</li>
              <li>Evitar el alcohol</li>
              <li>Hacer ejercicio regularmente</li>
              <li>Consultar al médico para seguimiento</li>
            </ul>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="fatty-liver-container">
      <nav className="breadcrumbs">
        <Link to="/">Inicio / </Link>
        <Link to="/higado">Enfermedades / </Link>
        <span>Hígado Graso</span>
      </nav>

      <h2 className="section-title">HÍGADO GRASO</h2>

      <div className="model-wrapper">
        {!isMobile && (
          <div className="instructions-help">
            <button ref={iconRef} onClick={toggleInstructionsPopover} className="help-icon">
              <IoIosHelpCircleOutline />
            </button>
            {showInstructionsPopover && (
              <div ref={popoverRef} className="popover">
                <p>
                  🖱 Usa el mouse para explorar el modelo 3D:
                  <br />• Haz clic y arrastra para rotar
                  <br />• Usa scroll para hacer zoom
                  <br />• Clic derecho para mover la vista
                </p>
              </div>
            )}
          </div>
        )}

        <LiverModel
          modelPath={
            showTreatment
              ? "/modelos/medicine/MedicineModel.glb"
              : isHealthy
              ? "/modelos/fattyliver/healthy-liver.glb"
              : "/modelos/fattyliver/early-fatty-liver.glb"
          }
          showHtmlInstructions={showHtmlInstructions}
          isHealthy={isHealthy}
        />

        <div className="toggle-buttons">
          <button className={isHealthy && !showTreatment ? "active" : ""} onClick={handleHealthyLiver}>❤️ Hígado sano</button>
          <button className={!isHealthy && !showTreatment ? "active" : ""} onClick={handleFattyLiver}>🧈 Hígado graso</button>
          <button className={showTreatment ? "active" : ""} onClick={handleTreatmentToggle}>💊 Tratamiento</button>
        </div>

        <div className="scroll-down">
          <button
            onClick={() => {
              const section = document.getElementById("lecciones")
              if (section) section.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span className="scroll-icon">📚</span> {isMobile ? "Lecciones" : "Explorar lecciones"} <MdOutlineKeyboardDoubleArrowDown />
          </button>
        </div>

        <section className="lessons-section" id="lecciones">
          <div className="mobile-accordion">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="accordion-item">
                <button
                  className={`accordion-header ${activeTab === lesson.id ? "active" : ""}`}
                  onClick={() => handleTabClick(lesson.id)}
                >
                  <span className="icon">{lesson.icon}</span>
                  <span className="title">{lesson.title}</span>
                </button>
                <div className={`accordion-content ${activeTab === lesson.id ? "active" : ""}`}>
                  {lesson.content}
                </div>
              </div>
            ))}
          </div>

          <div className="desktop-tabs">
            <div className="tabs-header">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={`tab-button ${activeTab === lesson.id ? "active" : ""}`}
                  onClick={() => handleTabClick(lesson.id)}
                >
                  <span className="icon">{lesson.icon}</span>
                  <span>{lesson.title}</span>
                </button>
              ))}
            </div>
            <div className="tab-content">
              {lessons.map(
                (lesson) =>
                  activeTab === lesson.id && (
                    <div key={lesson.id} className="tab-pane">
                      {lesson.content}
                    </div>
                  )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

