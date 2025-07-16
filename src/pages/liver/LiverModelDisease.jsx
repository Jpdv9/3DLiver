import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Html, Box, Plane, KeyboardControls, useKeyboardControls } from "@react-three/drei"
import * as THREE from "three"

// Hook para detectar el tamaño de pantalla
function useResponsive() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
    isTablet: typeof window !== "undefined" ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}

// Componente para controles de teclado 3D
function KeyboardController({ modelRef, setModelPosition }) {
  const [, get] = useKeyboardControls()

  useFrame(() => {
    const { forward, backward, left, right } = get()

    if (modelRef.current) {
      const speed = 0.05

      if (forward) {
        setModelPosition((prev) => [prev[0], prev[1], prev[2] - speed])
      }
      if (backward) {
        setModelPosition((prev) => [prev[0], prev[1], prev[2] + speed])
      }
      if (left) {
        setModelPosition((prev) => [prev[0] - speed, prev[1], prev[2]])
      }
      if (right) {
        setModelPosition((prev) => [prev[0] + speed, prev[1], prev[2]])
      }
    }
  })

  return null
}

// Componente para el modelo 3D con eventos mejorados
function Model({ path, showInstructions, position = [0, 1, 0], screenSize, setModelPosition }) {
  
  const modelRef = useRef()
  const [isRotating, setIsRotating] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [wheelDelta, setWheelDelta] = useState(0)
  const [modelScale, setModelScale] = useState(1)

  // Usar useGLTF directamente pero con limpieza mejorada
  const { scene } = useGLTF(path)

  // Función para limpiar el caché del modelo específico
  const clearModelCache = (modelPath) => {
    if (useGLTF.cache && useGLTF.cache.delete) {
      useGLTF.cache.delete(modelPath)
    }
  }

  // Limpiar caché del modelo anterior al cambiar
  useEffect(() => {
    return () => {
      // Limpiar caché al desmontar
      clearModelCache(path)
    }
  }, [path])

  // Limpiar el estado cuando cambie el modelo
  useEffect(() => {
    setShowMessage(false)
    setIsHovered(false)
    setClickCount(0)
    setModelScale(1)
    setIsRotating(true)
    
    // Restaurar cursor por defecto
    document.body.style.cursor = "default"
  }, [path])

  // Configurar sombras cuando se carga el modelo
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  // Control de la rotación del modelo con la tecla "R"
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "r") {
        setIsRotating((prev) => {
          console.log("Rotación cambiada a:", !prev)
          return !prev
        })
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  useFrame(() => {
    if (modelRef.current && isRotating && scene) {
      modelRef.current.rotation.y += 0.005
    }

    // Efecto de hover - escala suave
    if (modelRef.current && scene) {
      const targetScale = isHovered ? getModelScale() * 1.1 : getModelScale()
      modelRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  // Escala responsiva del modelo
  const getModelScale = () => {
    if (screenSize.isMobile) return 3
    if (screenSize.isTablet) return 4
    return 5
  }

  // Eventos de mouse mejorados
  const handleClick = (event) => {
    event.stopPropagation()
    setShowMessage(true)
    setClickCount((prev) => prev + 1)
  }

  const handleDoubleClick = (event) => {
    event.stopPropagation()
    setIsRotating((prev) => !prev)
    console.log("Doble click - Rotación:", !isRotating)
  }

  const handlePointerEnter = (event) => {
    event.stopPropagation()
    setIsHovered(true)
    document.body.style.cursor = "pointer"
  }

  const handlePointerLeave = (event) => {
    event.stopPropagation()
    setIsHovered(false)
    document.body.style.cursor = "default"
  }

  const handleWheel = (event) => {
    event.stopPropagation()
    const delta = event.delta
    setWheelDelta(delta)

    // Cambiar escala con la rueda del mouse
    setModelScale((prev) => {
      const newScale = prev + (delta > 0 ? -0.1 : 0.1)
      return Math.max(0.5, Math.min(3, newScale))
    })
  }

  const handlePointerDown = (event) => {
    event.stopPropagation()
    console.log("Pointer down en el modelo")
  }

  const handlePointerUp = (event) => {
    event.stopPropagation()
    console.log("Pointer up en el modelo")
  }

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      document.body.style.cursor = "default"
    }
  }, [])

  // Mostrar el modelo si está disponible
  if (!scene) {
    return null
  }

  return (
    <>
      <primitive
        ref={modelRef}
        object={scene}
        scale={getModelScale() * modelScale}
        position={position}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMissed={() => setShowMessage(false)}
      />

      {/* Información Hígado Mejorada - HTML 3D */}
      {showMessage && (
        <Html position={[-0.5, 2.5, 0]} distanceFactor={screenSize.isMobile ? 3 : 1.5} occlude transform>
          <div className={`liver-info-3d ${screenSize.isMobile ? "liver-info-mobile" : ""}`}>
            <div className="liver-info-header">
              <h2>🫀 Información del Hígado</h2>
              <button className="close-btn" onClick={() => setShowMessage(false)}>
                ✕
              </button>
            </div>

            <div className="liver-info-content">
              <div className="info-section">
                <h3>📋 Función Principal</h3>
                <p>El hígado filtra la sangre y elimina toxinas del cuerpo, procesando más de 500 funciones vitales.</p>
              </div>

              <div className="info-section">
                <h3>🔬 Características</h3>
                <ul>
                  <li>• Peso: 1.2 - 1.5 kg</li>
                  <li>• Células: Hepatocitos</li>
                  <li>• Regeneración: Sí</li>
                  <li>• Ubicación: Abdomen superior derecho</li>
                </ul>
              </div>
            </div>
          </div>
        </Html>
      )}

      {/* Instrucciones HTML dentro de la escena 3D - Mejoradas */}
      {showInstructions && !screenSize.isMobile && (
        <Html
          position={[-2, 2, 0]}
          className="html-3d-instructions"
          transform
          occlude
          distanceFactor={screenSize.isTablet ? 2.8 : 1.8}
        >
          <div className={`instructions-3d-container ${screenSize.isTablet ? "instructions-tablet" : ""}`}>
            <h1 className="instructions-3d-title">🎮 Controles Avanzados 3D</h1>

            <div className="instructions-3d-content">
              <div className="control-section">
                <h4>🖱️ Eventos de Mouse:</h4>
                <ul className="instructions-3d-list">
                  <li>• Click: Mostrar información</li>
                  <li>• Doble Click: Toggle rotación</li>
                  <li>• Hover: Efecto de escala</li>
                  <li>• Wheel: Cambiar tamaño</li>
                  <li>• Drag: Rotar vista</li>
                </ul>
              </div>

              <div className="control-section">
                <h4>⌨️ Controles de Teclado:</h4>
                <ul className="instructions-3d-list">
                  <li>• W: Adelante</li>
                  <li>• S: Atrás</li>
                  <li>• A: Izquierda</li>
                  <li>• D: Derecha</li>
                  <li>• R: Toggle rotación</li>
                </ul>
              </div>

              <div className="control-section">
                <h4>📊 Estado Actual:</h4>
                <div className="status-indicators">
                  <span className={`status ${isHovered ? "active" : ""}`}>Hover: {isHovered ? "ON" : "OFF"}</span>
                  <span className={`status ${isRotating ? "active" : ""}`}>Rotación: {isRotating ? "ON" : "OFF"}</span>
                </div>
              </div>
            </div>
          </div>
        </Html>
      )}

      {/* KeyboardController */}
      <KeyboardController modelRef={modelRef} setModelPosition={setModelPosition} />
    </>
  )
}

// Componente para la sala de hospital
function HospitalRoom({ isHealthy, screenSize }) {
  const { scene } = useThree()

  useEffect(() => {
    scene.background = new THREE.Color("#f0f0f0")
    scene.fog = new THREE.Fog("#f0f0f0", 20, 30)
  }, [scene])

  return (
    <>
      {/* Iluminación de hospital */}
      <ambientLight intensity={0.5} />
      <rectAreaLight position={[0, 5, 0]} width={4} height={1} intensity={5} color="#f8f8ff" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />

      {/* Suelo de hospital */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <meshStandardMaterial color="#e6e6e6" />
      </Plane>

      {/* Paredes de la sala */}
      <Plane args={[20, 10]} position={[0, 4, -5]} receiveShadow>
        <meshStandardMaterial color="#f0f8ff" />
      </Plane>
      <Plane args={[20, 10]} position={[-5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color="#f0f8ff" />
      </Plane>
      <Plane args={[20, 10]} position={[5, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color="#f0f8ff" />
      </Plane>

      {/* Mesa de examen médico */}
      <group position={[0, 0, 0]}>
        <Box args={[3, 0.1, 2]} position={[0, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={isHealthy ? "#a8d8ea" : "#ffcccb"} />
        </Box>
        {/* Patas de la mesa */}
        <Box args={[0.1, 0.5, 0.1]} position={[1.4, -0.3, 0.9]} castShadow>
          <meshStandardMaterial color="#888888" />
        </Box>
        <Box args={[0.1, 0.5, 0.1]} position={[-1.4, -0.3, 0.9]} castShadow>
          <meshStandardMaterial color="#888888" />
        </Box>
        <Box args={[0.1, 0.5, 0.1]} position={[1.4, -0.3, -0.9]} castShadow>
          <meshStandardMaterial color="#888888" />
        </Box>
        <Box args={[0.1, 0.5, 0.1]} position={[-1.4, -0.3, -0.9]} castShadow>
          <meshStandardMaterial color="#888888" />
        </Box>
      </group>

      {/* Líneas de color en la pared */}
      <Box args={[10, 0.2, 0.1]} position={[0, 1.5, -5]} castShadow>
        <meshStandardMaterial color={isHealthy ? "#5d8aa8" : "#e58c8a"} />
      </Box>
      <Box args={[0.1, 0.2, 10]} position={[5, 1.5, 0]} castShadow>
        <meshStandardMaterial color={isHealthy ? "#5d8aa8" : "#e58c8a"} />
      </Box>
      <Box args={[0.1, 0.2, 10]} position={[-5, 1.5, 0]} castShadow>
        <meshStandardMaterial color={isHealthy ? "#5d8aa8" : "#e58c8a"} />
      </Box>

      {/* Carrito médico - Solo en pantallas grandes */}
      {!screenSize.isMobile && (
        <group position={[3, 0, 2]}>
          <Box args={[1, 0.8, 0.6]} position={[0, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[0.05, 0.1, 0.05]} position={[0.4, -0.45, 0.25]} castShadow>
            <meshStandardMaterial color="#888888" />
          </Box>
          <Box args={[0.05, 0.1, 0.05]} position={[-0.4, -0.45, 0.25]} castShadow>
            <meshStandardMaterial color="#888888" />
          </Box>
          <Box args={[0.05, 0.1, 0.05]} position={[0.4, -0.45, -0.25]} castShadow>
            <meshStandardMaterial color="#888888" />
          </Box>
          <Box args={[0.05, 0.1, 0.05]} position={[-0.4, -0.45, -0.25]} castShadow>
            <meshStandardMaterial color="#888888" />
          </Box>
        </group>
      )}
    </>
  )
}

// Componente para controlar la cámara
function CameraController({ target }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(...target))
  }, [camera, target])

  return null
}

// Configuración de teclas para KeyboardControls
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
]

export default function LiverModel({
  modelPath = "/placeholder.svg?height=400&width=400",
  showHtmlInstructions = false,
  isHealthy = false,
}) {
  const screenSize = useResponsive()
  const [modelPosition, setModelPosition] = useState([0, 1, 0])

  // Configuración responsiva del canvas
  const getCanvasConfig = () => {
    if (screenSize.isMobile) {
      return {
        width: "100%",
        height: "60vh",
        camera: { position: [0, 2, 6], fov: 35 },
      }
    }
    if (screenSize.isTablet) {
      return {
        width: "100%",
        height: "70vh",
        camera: { position: [0, 2, 7], fov: 30 },
      }
    }
    return {
      width: "100%",
      height: "60vh",
      camera: { position: [0, 2, 8], fov: 25 },
    }
  }

  const canvasConfig = getCanvasConfig()

  return (
    <div className="liver-model-container">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          style={{
            width: canvasConfig.width,
            height: canvasConfig.height,
            maxWidth: "100%",
          }}
          shadows
          camera={canvasConfig.camera}
        >
          <HospitalRoom isHealthy={isHealthy} screenSize={screenSize} />
          <OrbitControls
            target={modelPosition}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <CameraController target={modelPosition} />
          {/* Agregar key única basada en modelPath para forzar re-render */}
          <Model
            key={modelPath} // Esta es la línea clave que soluciona el problema
            path={modelPath}
            showInstructions={showHtmlInstructions}
            position={modelPosition}
            screenSize={screenSize}
            setModelPosition={setModelPosition}
          />
        </Canvas>
      </KeyboardControls>
    </div>
  )
}