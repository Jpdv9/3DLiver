import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Html, Box, Plane } from "@react-three/drei"
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

// Componente para el modelo 3D
function Model({ path, showInstructions, position = [0, 1, 0], screenSize }) {
  const { scene } = useGLTF(path)
  const modelRef = useRef()
  const [isRotating, setIsRotating] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [modelPosition, setModelPosition] = useState(position)

  // Control de la rotación del modelo con la tecla "R"
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "r") {
        setIsRotating((prev) => !prev)
      }
    }

    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [])

  useFrame(() => {
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += 0.005
    }
  })

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

  // Escala responsiva del modelo
  const getModelScale = () => {
    if (screenSize.isMobile) return 3
    if (screenSize.isTablet) return 4
    return 5
  }

  return (
    <>
      <primitive
        ref={modelRef}
        object={scene}
        scale={path.includes("chemo-treatment.glb") ? [0.7, 0.7, 0.7] : getModelScale()}
        position={modelPosition}
        onClick={() => setShowMessage(true)}
        onPointerMissed={() => setShowMessage(false)}
      />

      {/* Información Hígado - Responsiva */}
      {showMessage && (
        <Html
          position={[modelPosition[0], modelPosition[1] + 1, modelPosition[2]]}
          distanceFactor={screenSize.isMobile ? 8 : 6}
          occlude
        >
          <div className={`liver-message ${screenSize.isMobile ? "liver-message-mobile" : ""}`}>
            <h2>Información sobre el hígado</h2>
            <p>El hígado filtra la sangre y elimina toxinas del cuerpo.</p>
          </div>
        </Html>
      )}

      {/* Instrucciones HTML dentro de la escena 3D - Solo para tablet y desktop */}
      {showInstructions && !screenSize.isMobile && (
        <Html
          position={[-2, 2, 0]}
          className="html-3d-instructions"
          transform
          occlude
          distanceFactor={screenSize.isTablet ? 3 : 2}
        >
          <div className={`instructions-3d-container ${screenSize.isTablet ? "instructions-tablet" : ""}`}>
            <h1 className="instructions-3d-title">Controles del Modelo 3D</h1>
            <div className="instructions-3d-content">
              <p>🖱 Usa el mouse para explorar el modelo 3D:</p>
              <ul className="instructions-3d-list">
                <li>• Haz clic y arrastra para rotar</li>
                <li>• Usa scroll para hacer zoom</li>
                <li>• Haz clic derecho para mover la vista</li>
                <li>• Presiona 'R' para activar/desactivar rotación</li>
              </ul>
            </div>
          </div>
        </Html>
      )}
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
      height: "80vh",
      camera: { position: [0, 2, 8], fov: 25 },
    }
  }

  const canvasConfig = getCanvasConfig()

  return (
    <div className="liver-model-container">
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
        <Model
          path={modelPath}
          showInstructions={showHtmlInstructions}
          position={modelPosition}
          screenSize={screenSize}
        />
      </Canvas>
    </div>
  )
}
