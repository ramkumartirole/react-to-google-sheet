import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Center,
  Html,
  Environment,
  ContactShadows,
} from '@react-three/drei';


const Model = ({ path }) => {
  const { scene } = useGLTF(path);
  const scale = path.includes('carrier-with-bike') ? 1.1 : 1.3;

  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  );
};


const ModelCanvas = ({ modelPath }) => (
  <Canvas
    key={modelPath}
    camera={{ position: [0, 1.5, 4], fov: 45 }}
    style={{ width: '100%', height: '100vh', background: '#f4f4f4' }}
  >
    
    <ambientLight intensity={0.8} />


    <directionalLight
      position={[5, 10, 5]}
      intensity={1.3}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />

  
    <hemisphereLight
      skyColor="#ffffff"
      groundColor="#888888"
      intensity={1.1}
    />

    
    <pointLight
      position={[0, -2, 0]}
      intensity={0.9}
      color="#ffffff"
    />

    <Environment preset="city" />


    <Suspense
      fallback={
        <Html center>
          <div style={{ fontSize: '1.1rem', color: '#666' }}>
            Loading Model...
          </div>
        </Html>
      }
    >
      <Model path={modelPath} />
    </Suspense>

    <ContactShadows
      position={[0, -0.8, 0]}
      opacity={0.4}
      scale={10}
      blur={2}
      far={4}
    />

    <OrbitControls />
  </Canvas>
);

const ModelViewer = ({ activeModel }) => {
  const modelPath =
    activeModel === 'Model A'
      ? '/models/carrier-with-bike.glb'
      : '/models/rear-storage-box_1.glb';

  return <ModelCanvas modelPath={modelPath} />;
};

export default ModelViewer;
