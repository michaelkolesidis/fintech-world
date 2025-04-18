import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useGraph, useThree } from '@react-three/fiber';
import { Capsule, useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';
import {
  CapsuleCollider,
  RigidBody,
  useAfterPhysicsStep,
  useBeforePhysicsStep,
  useRapier,
  vec3,
} from '@react-three/rapier';
import useGame from './stores/useGame.js';

//==========================
// Keyboard input handling
//==========================
export const useKeyboard = () => {
  const keysDown = useRef({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysDown.current[event.code] = true;
    };
    const handleKeyUp = (event) => {
      keysDown.current[event.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keysDown;
};

//==========================
// Character State
//==========================
export const useCharacterState = () =>
  useRef({
    grounded: false,
    velocity: vec3(),
    moving: false,
    jumping: false,
  }).current;

//==========================
// Character Controller
//==========================
export const useCharacterController = (bodyRef, { maxSpeed = 0.05 }) => {
  const setPosition = useGame((state) => state.setPosition);

  const rapier = useRapier();
  const { camera } = useThree();

  const keysdown = useKeyboard();

  const characterState = useCharacterState();

  useEffect(() => {
    camera.near = 0.01;
    camera.far = 100;
  }, []);

  const lastTick = useRef(0);

  useBeforePhysicsStep(() => {
    const body = bodyRef.current;
    const now = performance.now();
    const delta = (now - lastTick.current) / 1000;
    lastTick.current = now;

    if (body) {
      const linvel = vec3(body.linvel());
      const movement = vec3();
      const translation = vec3(body.translation());

      // Move UP
      if (
        (keysdown.current.ArrowUp || keysdown.current.KeyW) &&
        linvel.z > -maxSpeed
      ) {
        movement.z = Math.max(-maxSpeed - linvel.z, -maxSpeed);
        setPosition(
          body.translation().x,
          body.translation().y,
          body.translation().z
        );
      }
      // Move DOWN
      if (
        (keysdown.current.ArrowDown || keysdown.current.KeyS) &&
        linvel.z < maxSpeed
      ) {
        movement.z = Math.min(maxSpeed - linvel.z, maxSpeed);
        setPosition(
          body.translation().x,
          body.translation().y,
          body.translation().z
        );
      }
      // Move LEFT
      if (
        (keysdown.current.ArrowLeft || keysdown.current.KeyA) &&
        linvel.x > -maxSpeed
      ) {
        movement.x = Math.max(-maxSpeed - linvel.x, -maxSpeed);
        setPosition(
          body.translation().x,
          body.translation().y,
          body.translation().z
        );
      }
      // Move RIGHT
      if (
        (keysdown.current.ArrowRight || keysdown.current.KeyD) &&
        linvel.x < maxSpeed
      ) {
        movement.x = Math.min(maxSpeed - linvel.x, maxSpeed);
        setPosition(
          body.translation().x,
          body.translation().y,
          body.translation().z
        );
      }

      const mult = delta / (1 / 60);
      movement.multiply({ x: mult, y: mult, z: mult });

      const finalTranslation = translation.add(movement);

      body.setTranslation(finalTranslation, true);

      characterState.velocity = movement;
      characterState.moving = characterState.velocity.length() > 0.01;
    }
  });

  return characterState;
};

//==========================
// Character Model Component
//==========================
export const CharacterModel = ({ characterState, ...props }) => {
  const group = useRef();
  const { materials, animations, scene } = useGLTF('/character.glb');
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);
  const animState = useRef({
    currentAnimation: '',
    direction: null,
  });

  useFrame((state, delta) => {
    const { currentAnimation } = animState.current;
    let animation = characterState.moving ? 'run' : 'idle';

    if (currentAnimation !== animation) {
      actions[currentAnimation]?.fadeOut(0.1);
      actions[animation]?.reset().play().fadeIn(0.1);
      animState.current.currentAnimation = animation;
    }

    if (characterState.velocity && characterState.moving) {
      let oldQuat = group.current.quaternion.clone();
      group.current.lookAt(
        group.current.getWorldPosition(vec3()).add(characterState.velocity)
      );
      let newQuat = group.current.quaternion.clone();

      animState.current.direction = oldQuat.clone().slerp(newQuat, 0.1);
      group.current.quaternion.copy(animState.current.direction);
    }
  });

  const facialMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          name="body"
          geometry={nodes.body.geometry}
          material={materials['Material.001']}
          skeleton={nodes.body.skeleton}
          castShadow
        />
        <skinnedMesh
          name="eyel"
          geometry={nodes.eyel.geometry}
          material={facialMaterial}
          skeleton={nodes.eyel.skeleton}
        />
        <skinnedMesh
          name="eyer"
          geometry={nodes.eyer.geometry}
          material={facialMaterial}
          skeleton={nodes.eyer.skeleton}
        />
        <skinnedMesh
          name="mouth"
          geometry={nodes.mouth.geometry}
          material={facialMaterial}
          skeleton={nodes.mouth.skeleton}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/character.glb');

//==========================
// Character Component
//==========================
export const Character = () => {
  const body = useRef(null);
  const state = useCharacterController(body, {
    acceleration: 0.1,
  });

  const capsule = useRef();

  const { camera } = useThree();
  const cameraTarget = useRef();

  const resetCharacter = () => {
    body.current?.setLinvel(vec3());
    body.current.setTranslation(map.nodes.x_player_spawn.position);
  };

  useEffect(() => {
    camera.near = 0.01;
    camera.far = 1000;
  }, []);

  const light = useRef(null);
  const shadowTarget = useRef();

  useAfterPhysicsStep(() => {
    try {
      // Player position
      const pos = vec3(capsule.current.getWorldPosition(vec3()));

      // Camera
      camera.position.lerp(vec3(pos).add({ x: 0, y: 3, z: 4 }), 0.03);
      cameraTarget.current.position.lerp(pos.add({ x: 0, y: 1, z: -1 }), 0.1);
      camera.lookAt(cameraTarget.current.position);

      // Shadows
      shadowTarget.current.position.copy(pos);
      light.current.position.copy(vec3(pos).add({ x: -5, y: 20, z: 20 }));
      light.current.target = shadowTarget.current;

      if (body.current.translation().y < -5) {
        resetCharacter();
      }
    } catch (err) {}
  });

  return (
    <>
      <object3D ref={cameraTarget} />
      <object3D ref={shadowTarget} />
      <directionalLight
        ref={light}
        castShadow
        intensity={0.5}
        shadow-camera-top={50}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-bottom={-50}
        shadow-camera-size={[40, 4096]}
        shadow-bias={-0.001}
      />
      <RigidBody
        enabledRotations={[false, false, false]}
        colliders={false}
        ref={body}
        position={[0, 3, 0]}
        userData={{
          character: true,
        }}
      >
        <CharacterModel characterState={state} />
        <Capsule ref={capsule} visible={false} args={[0.5, 2]} />
        <CapsuleCollider args={[0.5, 0.5]} position={[0, 1, 0]} />
      </RigidBody>
    </>
  );
};
