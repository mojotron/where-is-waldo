import { useCollection } from "../../hooks/useCollection";
import LevelList from "./LevelList";
const Home = () => {
  const { isPanding, error, documents } = useCollection("levels");

  return (
    <div>
      {isPanding && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {documents && <LevelList levels={documents} />}
    </div>
  );
};

export default Home;
