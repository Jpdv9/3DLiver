
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

  export default function LiverModel({ modelPath }) {
    return (
      <Canvas style={{ height: '400px' }}>
        <ambientLight />
        <directionalLight position={[2, 2, 5]} />
        <OrbitControls />
        <Model path={modelPath} />
      </Canvas>
    );
  }
