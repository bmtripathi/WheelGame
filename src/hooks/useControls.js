import { useEffect, useState } from "react";

const useControls = () => {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "w":
        setControls((prev) => ({ ...prev, forward: true }));
        break;
      case "s":
        setControls((prev) => ({ ...prev, backward: true }));
        break;
      case "a":
        setControls((prev) => ({ ...prev, left: true }));
        break;
      case "d":
        setControls((prev) => ({ ...prev, right: true }));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    switch (e.key) {
      case "w":
        setControls((prev) => ({ ...prev, forward: false }));
        break;
      case "s":
        setControls((prev) => ({ ...prev, backward: false }));
        break;
      case "a":
        setControls((prev) => ({ ...prev, left: false }));
        break;
      case "d":
        setControls((prev) => ({ ...prev, right: false }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return controls;
};

export default useControls;
