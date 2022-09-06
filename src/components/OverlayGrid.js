import { useRef } from "react";
import "./styles/OverlayGrid.css";

const OverlayGrid = ({ image, handleTagCoords }) => {
  const parentElement = useRef();

  const getCoordsOnClick = (e) => {
    const rect = parentElement.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    handleTagCoords({ x, y });
  };

  return (
    <div
      ref={parentElement}
      className="OverlayGrid"
      style={{
        backgroundImage: `url("${image}")`,
        // height: "900px",
        // width: "1400px",
      }}
      onClick={(e) => getCoordsOnClick(e)}
    ></div>
  );
};

export default OverlayGrid;
