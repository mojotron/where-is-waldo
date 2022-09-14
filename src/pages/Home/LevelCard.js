import { Link } from "react-router-dom";
import "./styles/LevelCard.css";

const LevelCard = ({ data }) => {
  return (
    <li className="LevelCard">
      <Link to={`/level/${data.id}`} state={{ data }}>
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
      </Link>
    </li>
  );
};

export default LevelCard;
