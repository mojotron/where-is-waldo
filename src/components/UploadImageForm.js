import { useState } from "react";

const UploadImageForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, image);
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
