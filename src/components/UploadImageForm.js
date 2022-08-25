import { useState } from "react";
import { useStorage } from "../hooks/useStorage";

const UploadImageForm = ({ directory, closeOption }) => {
  const { uploadImage } = useStorage();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage(directory, image);
    setTitle("");
    setImage("");
    closeOption();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="image">Image</label>
      <input
        id="image"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="btn" type="submit">
        Upload
      </button>
    </form>
  );
};

export default UploadImageForm;
