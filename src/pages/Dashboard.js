import { useState, useEffect } from "react";
import { uploadImageToStorage } from "../firebaseApp";
import "../styles/Dashboard.css";
import uploadImgIcon from "../images/image-svgrepo-com.svg";

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
      <div className="">
        <h2>Add new image</h2>
        <label className="input-type-file" htmlFor="upload-image">
          {uploadImage ? uploadImage : "Select Image"}
          <img src={uploadImgIcon} className="icon" />
          <input
            id="upload-image"
            type="file"
            accept="image/png image/jpg"
            onChange={(e) => setUploadImage(e.target.files[0])}
          />
        </label>
        <button className="btn" type="button" onClick={handleUploadImage}>
          upload image
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
