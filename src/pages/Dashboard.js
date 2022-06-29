import { useState, useEffect } from "react";
import { uploadImageToStorage } from "../firebaseApp";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [uploadImageData, setUploadImageData] = useState({
    directory: "",
    file: null,
  });

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setUploadImageData((state) => {
      return { ...state, [name]: type === "file" ? files[0] : value };
    });
  };

  const handleUploadImage = (event) => {
    event.preventDefault();
    if (setUploadImageData.file === null) return;

    uploadImageToStorage(uploadImageData.directory, uploadImageData.file);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="">
        <h2>Add new image</h2>

        <form onSubmit={handleUploadImage}>
          <label htmlFor="storage-directory">select server directory</label>

          <select
            id="storage-directory"
            name="directory"
            value={uploadImageData.directory}
            onChange={handleChange}
          >
            <option value="">--choose--</option>
            <option value="characterIcons">characters</option>
            <option value="gameImages">game images</option>
            <option value="levelSmallImages">level small</option>
          </select>

          <label htmlFor="storage-image">select image</label>
          <input
            id="storage-image"
            type="file"
            accept="image/png image/jpg"
            name="file"
            onChange={handleChange}
          />

          <button className="btn" type="submit">
            upload image
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
