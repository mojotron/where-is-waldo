import { useState } from "react";
import "../styles/ImageBoard.css";

const CharactersPopup = ({ top, left }) => {
  return (
    <div
      style={{
        minHeight: "30px",
        minWidth: "100px",
        backgroundColor: "blue",
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
      }}
    ></div>
  );
};

const ImageBoard = () => {
  const [popUpCoords, setPopUpCoords] = useState(null);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const leftPosition = e.clientX + 100 > rect.width;
    console.log(leftPosition);
    setPopUpCoords({
      top: ((e.clientY - rect.top) / rect.height) * 100,
      left: leftPosition
        ? ((e.clientX - 100) / rect.width) * 100
        : (e.clientX / rect.width) * 100,
    });
  };

  return (
    <div className="ImageBoard" onMouseDown={handleClick}>
      {popUpCoords && (
        <CharactersPopup top={popUpCoords.top} left={popUpCoords.left} />
      )}
    </div>
  );
};

export default ImageBoard;
