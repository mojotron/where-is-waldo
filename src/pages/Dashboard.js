import { useState, useEffect } from "react";
import { uploadImageToStorage } from "../firebaseApp";

const Dashboard = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [imageList, setImagesLit] = useState([]);

  const handleUploadImage = () => {
    if (uploadImage === null) return;
    uploadImageToStorage(uploadImage);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="file"
        accept="image/png image/jpg"
        onChange={(e) => setUploadImage(e.target.files[0])}
      />
      <button type="button" onClick={handleUploadImage}>
        upload image
      </button>
    </div>
  );
};

export default Dashboard;
