import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "./styles/TargetsPopup.css";

const TargetsPopup = ({ coords, targets, handleTargetClick, parentRef }) => {
  const popupRef = useRef();
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [visibility, setVisibility] = useState("hidden");

  useEffect(() => {
    if (popupRef) setVisibility("visible"); // fix glitch on initial render
    let flagX = false;
    let flagY = false;
    const x = parentRef.current.offsetWidth * (coords.x / 100);
    const y = parentRef.current.offsetHeight * (coords.y / 100);
    if (x + popupRef.current.offsetWidth >= parentRef.current.offsetWidth) {
      setPositionX(x - popupRef.current.offsetWidth);
      flagX = true;
    }
    if (y + popupRef.current.offsetHeight >= parentRef.current.offsetHeight) {
      setPositionY(y - popupRef.current.offsetHeight);
      flagY = true;
    }
    if (!flagX) setPositionX(parentRef.current.offsetWidth * (coords.x / 100));
    if (!flagY) setPositionY(parentRef.current.offsetHeight * (coords.y / 100));
  }, [coords, parentRef]);

  return (
    <div
      data-testid="targets-popup"
      ref={popupRef}
      className="TargetsPopup"
      style={{
        left: `${positionX}px`,
        top: `${positionY}px`,
        visibility: visibility,
      }}
    >
      {targets.map((target) => (
        <div
          data-testid="target-list-item"
          className="TargetsPopup__target"
          key={target.targetName}
          onClick={() => handleTargetClick(target)}
        >
          <h3>{target.targetName}</h3>
          <img className="icon" src={target.targetIcon} alt="target icon" />
        </div>
      ))}
    </div>
  );
};

export default TargetsPopup;
