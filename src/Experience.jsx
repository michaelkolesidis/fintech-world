// import { Perf } from "r3f-perf";
import { Environment, Text } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Character } from "./Character";
import { Sea } from "./Sea";
import { World } from "./World";
import { Npc } from "./Npc";
import { Arcade } from "./Arcade";

export default function Experience() {
  return (
    <>
      <color args={["#40dbf7"]} attach="background" />
      {/* <Perf position="bottom-left" /> */}
      <Environment preset="apartment" />
      <Physics timeStep={"vary"} debug={false}>
        <Character />
        <RigidBody
          colliders="trimesh"
          type="fixed"
          restitution={0.2}
          friction={1}
        >
          <World />
        </RigidBody>
        <Sea />
        <Npc
          position={[-32.5, -1, -45]}
          color={{
            r: 0.354987370967865,
            g: 0.06662587076425552,
            b: 0.006995435804128647,
          }}
        />
        <Arcade position={[-7.1, -2.4, -85.6]} />
      </Physics>
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        position={[-2.75, 1.3, -13.5]}
        rotation-y={0.28}
        fontSize={0.6}
        font="./fonts/nickname.otf"
      >
        WELCOME!
      </Text>
    </>
  );
}
