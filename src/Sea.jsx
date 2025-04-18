import * as THREE from 'three';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
// import seaVertexShader from './shaders/vertex.glsl';
// import seaFragmentShader from './shaders/fragment.glsl';

THREE.ColorManagement.enabled = true;

let seaDimensions = {
  width: 400, // x
  length: 400, // z
};

const boxGeometry = new THREE.BoxGeometry(
  seaDimensions.width / 2,
  1,
  seaDimensions.length / 2
);

const seaMaterial = new THREE.MeshStandardMaterial({ color: '#23EDD7' });

export function SeaLevel({ position = [0, 0, 0] }) {
  const seaLevel = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    seaLevel.current.position.y += Math.sin(time) * 0.002;
  });

  return (
    <group position={position}>
      <mesh
        ref={seaLevel}
        geometry={boxGeometry}
        material={seaMaterial}
        // position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        // receiveShadow
      />
      {/* <shaderMaterial
          vertexShader={seaVertexShader}
          fragmentShader={seaFragmentShader}
          uniforms={{
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(100, 100)},
          }}
        /> 
      </mesh> */}
    </group>
  );
}

export function Bounds() {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <CuboidCollider
        args={[seaDimensions.width, 0.1, seaDimensions.length]}
        position={[0, -3.8, 0]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}

export function Sea() {
  return (
    <>
      <SeaLevel position={[0, -3.38, 0]} />
      <Bounds />
    </>
  );
}
