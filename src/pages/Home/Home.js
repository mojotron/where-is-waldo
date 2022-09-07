import { useCollection } from "../../hooks/useCollection";
import LevelCard from "./LevelCard";
import "./Home.css";

const Home = () => {
  const { isPanding, error, documents } = useCollection("levels");

  return (
    <div className="Home">
      {isPanding && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="Home__levels-list">
        {documents &&
          documents.map((doc) => <LevelCard key={doc.id} data={doc} />)}
      </ul>
    </div>
  );
};

export default Home;
