import "./TargetsPopup.css";

const TargetsPopup = ({ coords, targets, handleTargetClick }) => {
  return (
    <div
      className="TargetsPopup"
      style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
    >
      {targets.map((target) => (
        <div
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
