import { useState, useEffect } from "react";
import UploadImage from "../components/dashboard/UploadImage";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [characterList, setCharacterList] = useState([]);
  const [levelList, setLevelList] = useState([]);

  useEffect(() => {
    console.log("run effect");
  }, [characterList.length]);

  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      <div className="">
        <h2>Upload new image</h2>
        <UploadImage />
        <div>
          <h2>Create new Character</h2>
          <form>
            <label htmlFor="">Select Character Image</label>
            <select id=""></select>
            <label htmlFor="">Character Name</label>
            <input id="" type="text" />
            <button className="btn">Create</button>
          </form>
        </div>

        <div>
          <h2>Create new Level</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
