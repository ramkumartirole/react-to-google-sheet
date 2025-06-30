// components/SimpleLoader.jsx
import { Html } from '@react-three/drei';

export default function SimpleLoader() {
  return (
    <Html center>
      <div style={{
        color: 'white',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px 20px',
        borderRadius: '5px'
      }}>
        Loading model...
      </div>
    </Html>
  );
}