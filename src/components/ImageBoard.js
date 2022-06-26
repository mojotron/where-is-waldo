import { useState } from "react";
import "../styles/ImageBoard.css";

const CharactersPopup = ({ top, left }) => {
  return (
    <div
      style={{
        height: "30px",
        width: "30px",
        backgroundColor: "blue",
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
      }}
    ></div>
  );
};

const Square = ({ index, handleClick }) => {
  return (
    <div className="Square" data-index={index} onClick={handleClick}></div>
  );
};

const ImageBoard = () => {
  const [x, setX] = useState(null);

  const handleClick = (e) => {
    console.log(e.target.dataset.index);
    const rect = e.target.getBoundingClientRect();
    setX({ top: rect.top, left: rect.left });
  };

  return (
    <div className="ImageBoard">
      {Array.from({ length: 220 }, (_, i) => (
        <Square key={i} index={i} handleClick={handleClick} />
      ))}
      {x && <CharactersPopup top={x.top} left={x.left} />}
    </div>
  );
};

export default ImageBoard;
