import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import * as THREE from 'three';
import useGame from './stores/useGame.js';

export function Arcade(props) {
  const isNearArcade = useGame((state) => state.isNearArcade);
  const toggleIsNearArcade = useGame((state) => state.toggleIsNearArcade);

  // Player position
  const positionX = useGame((state) => state.positionX);
  const positionY = useGame((state) => state.positionY);
  const positionZ = useGame((state) => state.positionZ);
  let playerPosition = new THREE.Vector3(positionX, positionY, positionZ);

  const { position } = props;

  // Arcade character position
  const arcadePosition = new THREE.Vector3(...position);

  const { nodes, materials } = useGLTF('/arcade.glb');

  useFrame(() => {
    playerPosition = new THREE.Vector3(positionX, positionY, positionZ);
    if (playerPosition.distanceTo(arcadePosition) < 2.75) {
      if (!isNearArcade) {
        toggleIsNearArcade();
      }
    } else {
      if (isNearArcade) {
        toggleIsNearArcade();
      }
    }
  });

  return (
    <>
      <RigidBody type="fixed" position={position}>
        <CuboidCollider args={[2, 3, 1]} position={[1, 0, 0]} />
        <group scale={1.3} dispose={null}>
          <group
            name="G_Asset_Electronic_GameMachine_01"
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gamemachine_01_1"
              castShadow
              receiveShadow
              geometry={nodes.gamemachine_01_1.geometry}
              material={materials.black}
            />
            <mesh
              name="gamemachine_01_2"
              castShadow
              receiveShadow
              geometry={nodes.gamemachine_01_2.geometry}
              material={materials.blue}
            />
            <mesh
              name="gamemachine_01_3"
              castShadow
              receiveShadow
              geometry={nodes.gamemachine_01_3.geometry}
              material={materials.screen}
            />
            <mesh
              name="gamemachine_01_4"
              castShadow
              receiveShadow
              geometry={nodes.gamemachine_01_4.geometry}
              material={materials.red}
            />
            <mesh
              name="gamemachine_01_5"
              castShadow
              receiveShadow
              geometry={nodes.gamemachine_01_5.geometry}
              material={materials.orange}
            />
            <mesh
              name="Text001"
              castShadow
              receiveShadow
              geometry={nodes.Text001.geometry}
              material={materials.orange}
              position={[0.39, -0.38, 1.03]}
              rotation={[1.3, 0, 0]}
            />
          </group>
        </group>
      </RigidBody>
    </>
  );
}

useGLTF.preload('/arcade.glb');
