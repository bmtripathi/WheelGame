import { useBox } from "@react-three/cannon";
import { useMemo } from "react";

const FallingObject = ({ position }) => {
  const [ref] = useBox(() => ({
    mass: Math.random() + 0.1,
    position,
    args: [
      Math.random() * 0.5 + 0.5,
      Math.random() * 0.5 + 0.5,
      Math.random() * 0.5 + 0.5,
    ],
  }));

  const color = useMemo(() => `hsl(${Math.random() * 360}, 100%, 50%)`, []);

  return (
    <mesh ref={ref} castShadow>
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default FallingObject;
