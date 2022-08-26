import "./styles/OverlayGrid.css";

const OverlayGrid = () => {
  return (
    <div className="OverlayGrid">
      {Array.from({ length: 375 }).map((_, i) => (
        <div
          key={i}
          className="cell"
          data-grid-id={i}
          onClick={(e) => console.log(e.target.dataset.gridId)}
        ></div>
      ))}
    </div>
  );
};

export default OverlayGrid;
