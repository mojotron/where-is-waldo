import "./LevelCard.css";

const LevelCard = ({ data }) => {
  return (
    <li className="LevelCard">
      <div className="LevelCard__info">
        <h3>{data.title}</h3>
        <div className="LeverCard__info__targets">
          {data.tags.map((t) => (
            <img
              key={t.targetIcon}
              className="icon"
              src={t.targetIcon}
              alt="target"
            />
          ))}
        </div>
      </div>
      <div className="LevelCard__image">
        <img src={data.image} alt="level thumbnail" />
      </div>
    </li>
  );
};

export default LevelCard;