// import { useState, useMemo, useEffect } from 'react';
// import { useGLTF } from '@react-three/drei';
// import * as THREE from 'three';
// import { useDispatch } from 'react-redux';
// import { setNodesVal } from '../../redux/slice/nodes';

// function CarModel() {
//   const dispatch = useDispatch();
//   const { nodes } = useGLTF('/model/fx.glb');
//   const [nodeVisibility, setNodeVisibility] = useState({});
//   const [hoveredNode, setHoveredNode] = useState(null);
//   const [activeCategory, setActiveCategory] = useState('main');
//   const [initialized, setInitialized] = useState(false);

//   // Smart categorization based on multiple factors
// console.log(nodeVisibility,"acnodeVisibilitytiveCategory")
//   const { mainNodes, otherNodes } = useMemo(() => {
//     const mainNodes = [];
//     const otherNodes = [];
//     const volumeThreshold = 0.1; // Minimum volume to consider as main part
//     const nameKeywords = ['main', 'body', 'part', 'base', 'primary'];

//     Object.entries(nodes).forEach(([name, node]) => {
//       if (!node.isMesh) return;

//       // Calculate approximate volume
//       let volume = 0;
//       if (node.geometry && node.geometry.attributes && node.geometry.attributes.position) {
//         const positions = node.geometry.attributes.position.array;
//         if (positions.length > 0) {
//           const box = new THREE.Box3().setFromBufferAttribute(node.geometry.attributes.position);
//           volume = box.getSize(new THREE.Vector3()).length();
//         }
//       }

//       // Determine if node is main part
//       const isMain = (
//         volume > volumeThreshold || // Large enough
//         nameKeywords.some(kw => name.toLowerCase().includes(kw)) || // Important name
//         node.material?.isMaterial // Has dedicated material
//       );

//       if (isMain) {
//         mainNodes.push({ name, node, volume });
//       } else {
//         otherNodes.push({ name, node, volume });
//       }
//     });

//     // Sort by volume (largest first)
//     mainNodes.sort((a, b) => b.volume - a.volume);
//     otherNodes.sort((a, b) => b.volume - a.volume);

//     return { mainNodes, otherNodes };
//   }, [nodes]);


//   // Initialize visibility
//   useEffect(() => {
//     if (!initialized && mainNodes.length > 0) {
//       const initialVisibility = {};
//       mainNodes.forEach(({ name }) => {
//         initialVisibility[name] = false; // Start with all main nodes visible
//       });
//       setNodeVisibility(initialVisibility);
//       setInitialized(true);
//     }
//     dispatch(setNodesVal(mainNodes));
//   }, [mainNodes, initialized]);

//   // Toggle functions remain the same
//   const toggleNode = (nodeName) => {
//     setNodeVisibility(prev => ({
//       ...prev,
//       [nodeName]: !prev[nodeName]
//     }));
//   };

//   const currentNodes = activeCategory === 'main' ? mainNodes : otherNodes;

//   return (
//     <group>
//       {/* Render nodes with visibility control */}
//       {currentNodes.map(({ name, node }) => (
//         <mesh
//           key={name}
//           geometry={node.geometry}
//           material={node.material}
//           visible={!nodeVisibility[name]}
//           onPointerOver={() => setHoveredNode(name)}
//           onPointerOut={() => setHoveredNode(null)}
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleNode(name);
//           }}
//         >
//           {hoveredNode === name && (
//             <meshStandardMaterial
//               color="yellow"
//               emissive="yellow"
//               emissiveIntensity={0.5}
//               transparent
//               opacity={0.5}
//             />
//           )}
//         </mesh>
//       ))}

//       {/* Control Panel
//       <group position={[0, 2, 0]}>
//         <group position={[0, 0.3, 0]}>
//           <mesh onClick={() => setActiveCategory('main')}>
//             <boxGeometry args={[0.5, 0.15, 0.1]} />
//             <meshStandardMaterial color={activeCategory === 'main' ? 'blue' : 'gray'} />
//             <Text position={[0, 0, 0.06]} fontSize={0.08} color="white" anchorX="center">
//               Main Parts ({mainNodes.length})
//             </Text>
//           </mesh>
//           <mesh onClick={() => setActiveCategory('other')} position={[0.6, 0, 0]}>
//             <boxGeometry args={[0.5, 0.15, 0.1]} />
//             <meshStandardMaterial color={activeCategory === 'other' ? 'blue' : 'gray'} />
//             <Text position={[0, 0, 0.06]} fontSize={0.08} color="white" anchorX="center">
//               Details ({otherNodes.length})
//             </Text>
//           </mesh>
//         </group>


//       </group> */}
//     </group>
//   );
// }

// export default CarModel;