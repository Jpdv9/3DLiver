import React, { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Html, Box, Plane } from "@react-three/drei"
import * as THREE from "three"

// Componente para el modelo 3D
function Model({ path, showInstructions, position = [0, 1, 0] }) {
  const { scene } = useGLTF(path)
  const modelRef = useRef()
  const [showHelp, setShowHelp] = useState(false)
  const [showPositionControls, setShowPositionControls] = useState(false)
  const [modelPosition, setModelPosition] = useState(position)

  useFrame(() => {
    if (modelRef.current) {
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

  // Función para actualizar la posición del modelo
  const updatePosition = (axis, value) => {
    const newPosition = [...modelPosition]
    newPosition[axis] = Number.parseFloat(value)
    setModelPosition(newPosition)
  }

  return (
    <>
      <primitive ref={modelRef} object={scene} scale={5} position={modelPosition} />

      

      {/* Instrucciones HTML dentro de la escena 3D */}
      {showInstructions && (
        <Html position={[-2, 2, 0]} className="html-3d-instructions" transform occlude distanceFactor={2}>
          <div className="instructions-3d-container">
            <h1 className="instructions-3d-title">Controles del Modelo 3D</h1>
            <div className="instructions-3d-content">
              <p>🖱 Usa el mouse para explorar el modelo 3D:</p>
              <ul className="instructions-3d-list">
                <li>• Haz clic y arrastra para rotar</li>
                <li>• Usa scroll para hacer zoom</li>
                <li>• Haz clic derecho para mover la vista</li>
              </ul>
             
            </div>
          </div>
        </Html>
      )}
    </>
  )
}

// Componente para el póster médico en la pared
function MedicalPoster({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <Plane args={[2, 3]} receiveShadow>
        <meshStandardMaterial color="#ffffff" />
      </Plane>
      <Html transform position={[0, 0, 0.1]} scale={0.1} rotation={[0, Math.PI, 0]}>
        <div
          style={{ width: "500px", height: "750px", backgroundColor: "white", padding: "20px", fontFamily: "Arial" }}
        >
          <h2 style={{ color: "#2a5c82", textAlign: "center", marginBottom: "20px" }}>ANATOMÍA DEL HÍGADO</h2>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Anatomía del hígado"
              style={{ maxWidth: "100%", border: "1px solid #ccc" }}
            />
          </div>
          <h3 style={{ color: "#2a5c82", marginBottom: "10px" }}>Funciones principales:</h3>
          <ul style={{ paddingLeft: "20px", fontSize: "14px", lineHeight: "1.4" }}>
            <li>Filtración de la sangre</li>
            <li>Desintoxicación</li>
            <li>Metabolismo de nutrientes</li>
            <li>Producción de proteínas</li>
            <li>Almacenamiento de vitaminas</li>
          </ul>
          <div style={{ marginTop: "20px", fontSize: "12px", color: "#666", textAlign: "center" }}>
            Departamento de Hepatología
          </div>
        </div>
      </Html>
    </group>
  )
}

// Componente para la sala de hospital
function HospitalRoom({ isHealthy }) {
  const { scene } = useThree()

  // Configurar el fondo de la escena
  useEffect(() => {
    scene.background = new THREE.Color("#f0f0f0") // Color de fondo neutro
    scene.fog = new THREE.Fog("#f0f0f0", 20, 30)
  }, [scene])

  return (
    <>
      {/* Iluminación de hospital */}
      <ambientLight intensity={0.5} />

      {/* Luces fluorescentes de techo */}
      <rectAreaLight position={[0, 5, 0]} width={4} height={1} intensity={5} color="#f8f8ff" />

      {/* Luz direccional suave */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />

      {/* Suelo de hospital */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <meshStandardMaterial color="#e6e6e6" />
      </Plane>

      {/* Paredes de la sala */}

      {/* Pared trasera */}
      <Plane args={[20, 10]} position={[0, 4, -5]} receiveShadow>
        <meshStandardMaterial color="#f0f8ff" />
      </Plane>

      {/* Pared izquierda */}
      <Plane args={[20, 10]} position={[-5, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color="#f0f8ff" />
      </Plane>

      {/* Pared derecha */}
      <Plane args={[20, 10]} position={[5, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color="#f0f8ff" />
      </Plane>

      {/* Mesa de examen médico */}
      <group position={[0, 0, 0]}>
        {/* Base de la mesa */}
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

      {/* Póster médico en la pared */}
      <MedicalPoster position={[0, 3, -5.5]} rotation={[0, 0, 0]} />

      {/* Póster de hepatitis en la pared lateral */}
      <MedicalPoster position={[5.5, 3, -3]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Línea de color en la pared (típica de hospitales) */}
      <Box args={[10, 0.2, 0.1]} position={[0, 1.5, -5]} castShadow>
        <meshStandardMaterial color={isHealthy ? "#5d8aa8" : "#e58c8a"} />
      </Box>
      <Box args={[0.1, 0.2, 10]} position={[5, 1.5, 0]} castShadow>
        <meshStandardMaterial color={isHealthy ? "#5d8aa8" : "#e58c8a"} />
      </Box>
      <Box args={[0.1, 0.2, 10]} position={[-5, 1.5, 0]} castShadow>
        <meshStandardMaterial color={isHealthy ? "#5d8aa8" : "#e58c8a"} />
      </Box>

      {/* Pequeño carrito médico */}
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
    </>
  )
}

// Componente para controlar la cámara y el enfoque
function CameraController({ target }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(...target))
  }, [camera, target])

  return null
}

export default function LiverModel({
  modelPath,
  width = "1200px",
  height = "800px",
  scale = 0.09,
  showHtmlInstructions = false,
  isHealthy = false,
}) {
  const [modelPosition, setModelPosition] = useState([0, 1, 0])

  return (
    <Canvas style={{ width, height }} shadows camera={{ position: [0, 2, 8], fov: 25 }}>
      {/* Sala de hospital */}
      <HospitalRoom isHealthy={isHealthy} />

      {/* Controles y modelo */}
      <OrbitControls target={modelPosition} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      <CameraController target={modelPosition} />
      <Model path={modelPath} showInstructions={showHtmlInstructions} position={modelPosition} />
    </Canvas>
  )
}
