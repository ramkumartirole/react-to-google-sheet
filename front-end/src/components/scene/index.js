import { Canvas } from '@react-three/fiber'
import CarModel from '../model/toogleCars'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import SimpleLoader from '../loader';


export default function Scene() {
  const modalValue = useSelector((state) => state.modal.modalVal);


  return (
    <Canvas style={{width: '100%', height: '90vh'}} camera={{ position: [0, 2, 5], }}>
    <Suspense fallback={<SimpleLoader/>}>
      <OrbitControls/>
      <ambientLight intensity={1} />
<directionalLight
  position={[10, 10, 10]}
  intensity={1}
  castShadow
/>
<pointLight position={[-5, 5, -5]} intensity={0.5} />
      <group key={modalValue}>
      <CarModel  position={[1, 0, -50]} />        </group>

    </Suspense>
  </Canvas>
  )
}


