import { useState } from "react";
import { useStorage } from "../../hooks/useStorage";

const UploadImageForm = ({ directory, closeOption }) => {
  const { uploadImage } = useStorage();

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage(directory, image);
    setImage("");
    closeOption();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button className="btn" type="submit">
        Upload
      </button>
    </form>
  );
};

export default UploadImageForm;
