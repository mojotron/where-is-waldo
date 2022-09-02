import { useCollection } from "../../hooks/useCollection";

const Home = () => {
  const { isPanding, error, documents } = useCollection("levels");

  return (
    <div>
      {isPanding && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {documents &&
        documents.map((doc) => (
          <img key={doc.id} src={doc.image} alt="level" />
        ))}
    </div>
  );
};

export default Home;
