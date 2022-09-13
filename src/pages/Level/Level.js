import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import OverlayGrid from "../../components/OverlayGrid";
import TargetsPopup from "./TargetsPopup";
import WinPopup from "./WinPopup";
import "./styles/Level.css";
import areCoordsInsideRect from "../../utils/areCoordsInsideRect";

const Level = () => {
  const data = useLocation().state.data; // pass date
  const [currentCoord, setCurrentCoord] = useState(null);
  const [targets, setTargets] = useState(
    data.tags.map((tar) => ({
      ...tar,
    }))
  );
  const [showPopup, setShowPopup] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(null);
  const levelRef = useRef();
  // create timestamp
  useEffect(() => {
    setGameStart(Date.now());
  }, []);

  const handleTagCoords = (coordsObject) => {
    setCurrentCoord(coordsObject);
    setShowPopup(true);
  };
  // check if user have found all targets
  useEffect(() => {
    if (!targets) return;
    if (targets.length > 0) return;
    setGameOver(true);
    setShowPopup(false);
  }, [targets]);

  const handleTargetClick = (data) => {
    const targetFound = areCoordsInsideRect(currentCoord, data.coords);
    if (targetFound) {
      setTargets((oldValue) =>
        oldValue.filter((t) => t.targetName !== data.targetName)
      );
    }
    setShowPopup(false);
  };

  return (
    <div className="Level" ref={levelRef}>
      <OverlayGrid image={data.image} handleTagCoords={handleTagCoords} />
      {showPopup && (
        <TargetsPopup
          coords={currentCoord}
          targets={targets}
          handleTargetClick={handleTargetClick}
          parentRef={levelRef}
        />
      )}
      {gameOver && <WinPopup gameStart={gameStart} />}
    </div>
  );
};

export default Level;
