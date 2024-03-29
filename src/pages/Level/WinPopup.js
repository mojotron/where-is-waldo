import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/WinPopup.css";
import formatTime from "../../utils/formatTime";

const WinPopup = ({ gameStart }) => {
  const navigate = useNavigate();

  const [gameEnd, setGameEnd] = useState(null);

  useEffect(() => {
    setGameEnd(Date.now());
  }, []);

  if (!gameEnd) return <p>Loading...</p>;

  return (
    <div className="WinPopup">
      <div className="WinPopup__body">
        <h1>CONGRATULATION!</h1>
        <h3>Level time - {formatTime(gameEnd - gameStart)}</h3>
        <button className="btn" type="button" onClick={() => navigate("/")}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default WinPopup;
