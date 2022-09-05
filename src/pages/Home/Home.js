import { useCollection } from "../../hooks/useCollection";
import LevelCard from "./LevelCard";
const Home = () => {
  const { isPanding, error, documents } = useCollection("levels");

  return (
    <div>
      {isPanding && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {documents &&
          documents.map((doc) => <LevelCard key={doc.id} data={doc} />)}
      </ul>
    </div>
  );
};

export default Home;
