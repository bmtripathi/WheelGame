import dynamic from "next/dynamic";
import UI from "../components/UI";

const GameScene = dynamic(() => import("../components/GameScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <UI>
      <GameScene />
    </UI>
  );
}
