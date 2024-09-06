import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Suspense, useState } from "react";
import Car from "./Car";
import FallingObject from "./FallingObject";
import useControls from "../hooks/useControls";
import ScoreBoard from "./ScoreBoard";

const GameScene = () => {
  const controls = useControls();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleCollision = () => {
    setGameOver(true);
    // Save score to Supabase
    fetch("/api/saveScore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score }),
    });
  };

  return (
    <div className="relative">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          castShadow
        />
        <Physics>
          <Suspense fallback={null}>
            <Car position={[0, 0, 0]} controls={controls} />
            {!gameOver && (
              <FallingObject
                position={[Math.random() * 10 - 5, 5, Math.random() * 10 - 5]}
              />
            )}
          </Suspense>
        </Physics>
      </Canvas>
      <ScoreBoard score={score} />
      {gameOver && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75">
          Game Over
        </div>
      )}
    </div>
  );
};

export default GameScene;
