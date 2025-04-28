import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';

function Model({ path }) {
  const { scene } = useGLTF(path);
  const modelRef = useRef();

  useFrame (() => {
    if(modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  });

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={scene}
        scale={5}
        position={[0, 0, 0]}
      />
    </Center>
  );
}

  export default function LiverModelHome({ modelPath }) {
    return (
      <Canvas style={{ width: '800px', height: '400px' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={25}/>
        <ambientLight intensity={0.7}/>
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
        <OrbitControls/>
        <Model path={modelPath} />
      </Canvas>
    );
  }
