import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OverlayGrid from "../../components/OverlayGrid";
import TargetsPopup from "./TargetsPopup";
import WinPopup from "./WinPopup";
import "./Level.css";
import areCoordsInsideRect from "../../utils/areCoordsInsideRect";

const Level = () => {
  const data = useLocation().state.data; // pass date, leater get data from server
  const [currentCoord, setCurrentCoord] = useState(null);
  const [targets, setTargets] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setTargets(
      data.tags.map((tar) => ({
        ...tar,
      }))
    );
  }, [data.tags]);

  const handleTagCoords = (coordsObject) => {
    setCurrentCoord(coordsObject);
    setShowPopup(true);
  };

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
    <div className="Level">
      <OverlayGrid image={data.image} handleTagCoords={handleTagCoords} />
      {showPopup && (
        <TargetsPopup
          coords={currentCoord}
          targets={targets}
          handleTargetClick={handleTargetClick}
        />
      )}
      {gameOver && <WinPopup />}
    </div>
  );
};

export default Level;
