const LevelList = ({ images, setCurrentLevel }) => {
  return (
    <ul className="Dashboard__Sidebar__levels">
      {images.map((url) => (
        <img
          key={url}
          src={url}
          alt="level"
          className="Dashboard__Sidebar__thumbnail"
          onClick={() =>
            setCurrentLevel((oldValue) => ({
              ...oldValue,
              image: url,
            }))
          }
        />
      ))}
    </ul>
  );
};

export default LevelList;
