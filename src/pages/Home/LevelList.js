import "./LevelList.css";

const LevelList = ({ levels }) => {
  return (
    <ul className="LevelList">
      {levels &&
        levels.map((level) => (
          <li key={level.id} className="LevelList__card">
            <div>
              <h3>{level.title}</h3>
              {level.tags.map((target) => (
                <img
                  className="icon"
                  key={target.targetIcon}
                  src={target.targetIcon}
                  alt="target"
                  title={target.targetName}
                />
              ))}
            </div>
            <img
              className="LevelList__card__img"
              src={level.image}
              alt="level"
            />
          </li>
        ))}
    </ul>
  );
};

export default LevelList;
