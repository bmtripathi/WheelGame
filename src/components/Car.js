import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCylinder, useSphere } from "@react-three/cannon";

const Car = ({ position, controls }) => {
  const carRef = useRef();

  const [body, api] = useCylinder(() => ({
    mass: 1,
    position,
    args: [1, 1, 4, 8], // Cylinder args [Top Radius, Bottom Radius, Height, Segments]
  }));

  const [frontWheel] = useSphere(() => ({
    mass: 0.5,
    position: [position[0], position[1], position[2] + 2],
    args: [0.5], // Sphere radius
  }));

  const [backWheelLeft] = useCylinder(() => ({
    mass: 0.5,
    position: [position[0] - 1.5, position[1], position[2] - 2],
    args: [0.5, 0.5, 0.5, 8], // Small Cylinder for wheel
  }));

  const [backWheelRight] = useCylinder(() => ({
    mass: 0.5,
    position: [position[0] + 1.5, position[1], position[2] - 2],
    args: [0.5, 0.5, 0.5, 8],
  }));

  useFrame(() => {
    // Forward/Backward motion
    if (controls.forward) api.velocity.set(0, 0, -5);
    if (controls.backward) api.velocity.set(0, 0, 5);

    // Steering with cursor
    if (controls.left) api.angularVelocity.set(0, 5, 0);
    if (controls.right) api.angularVelocity.set(0, -5, 0);
  });

  return (
    <group ref={carRef}>
      <mesh ref={body} castShadow>
        <cylinderBufferGeometry args={[1, 1, 4, 8]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={frontWheel} castShadow>
        <sphereBufferGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh ref={backWheelLeft} castShadow>
        <cylinderBufferGeometry args={[0.5, 0.5, 0.5, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh ref={backWheelRight} castShadow>
        <cylinderBufferGeometry args={[0.5, 0.5, 0.5, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
};

export default Car;
