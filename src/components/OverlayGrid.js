import { useRef } from "react";
import "./styles/OverlayGrid.css";

const OverlayGrid = ({ image, handleTagCoords, styles }) => {
  const parentElement = useRef();

  const getCoordsOnClick = (e) => {
    const rect = parentElement.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    handleTagCoords({ x, y });
  };

  return (
    <div
      data-testid="overlay-grid"
      ref={parentElement}
      className="OverlayGrid"
      style={{
        ...styles,
        backgroundImage: `url("${image}")`,
      }}
      onClick={(e) => getCoordsOnClick(e)}
    ></div>
  );
};

export default OverlayGrid;
