import { useCollection } from "../../hooks/useCollection";
import LevelCard from "./LevelCard";
import "./styles/Home.css";

const Home = () => {
  const { isPending, error, documents } = useCollection("levels");

  return (
    <div className="Home" data-testid="home-page-container">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="Home__levels-list">
        {documents &&
          documents.map((doc) => <LevelCard key={doc.id} data={doc} />)}
      </ul>
    </div>
  );
};

export default Home;
