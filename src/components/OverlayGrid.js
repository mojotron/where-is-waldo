import "./styles/OverlayGrid.css";

const OverlayGrid = ({ image, handelChangeCellId }) => {
  return (
    <div className="OverlayGrid" style={{ backgroundImage: `url("${image}")` }}>
      {Array.from({ length: 375 }).map((_, i) => (
        <div
          key={i}
          className="cell"
          data-grid-id={i}
          onClick={(e) => handelChangeCellId(e.target.dataset.gridId)}
        ></div>
      ))}
    </div>
  );
};

export default OverlayGrid;
