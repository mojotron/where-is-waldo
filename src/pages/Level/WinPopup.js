import { useNavigate } from "react-router-dom";
import "./WinPopup.css";

const WinPopup = () => {
  const navigate = useNavigate();

  return (
    <div className="WinPopup">
      <div className="WinPopup__body">
        <h1>CONGRATULAZION!</h1>
        <h3>01:00</h3>
        <button className="btn" type="button" onClick={() => navigate("/")}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default WinPopup;
