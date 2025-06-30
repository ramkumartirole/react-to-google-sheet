
import React,{useEffect} from 'react';
import { useGLTF } from '@react-three/drei';
import { useSelector,useDispatch } from 'react-redux';
import { setModalValue } from '../../redux/slice/modalSlice'


export default function Fx() {

  const modalValue = useSelector((state) => state.modal.modalVal);
  const dispatch = useDispatch();
  const image =[
    {
      name: 'fx',
      image: '/model/car.glb'
    },
    {
      name: 'nissan',
      image: '/model/nissan.glb'
    }
  ]
  const modal1 = useGLTF(image[0].image);
  const modal2 = useGLTF(image[1].image);


const gltf = modalValue === 'nissanCar' ? modal1 : modal2;

useEffect(() => {
  dispatch(setModalValue(modalValue))

}, [gltf])

  return (

  <primitive object={gltf.scene} scale={150}  />

);
}
