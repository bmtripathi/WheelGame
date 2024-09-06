import { useEffect, useState } from "react";

const ScoreBoard = ({ score }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 p-4 bg-gray-800 bg-opacity-50 rounded">
      <div>Time: {time}s</div>
      <div>Score: {score}</div>
    </div>
  );
};

export default ScoreBoard;
