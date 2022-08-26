import { useState } from "react";
import UploadImageForm from "./UploadImageForm";
import OverlayGrid from "../../components/OverlayGrid";
import "./Dashboard.css";

const Sidebar = () => {
  const [showOptions, setShowOptions] = useState({
    image: false,
    tag: false,
    newLevel: false,
  });

  const handleDisplayOption = (option) => {
    setShowOptions((oldValue) => ({
      image: false,
      tag: false,
      newLevel: false,
      [option]: !oldValue[option],
    }));
  };

  return (
    <div className="Dashboard__Sidebar">
      <h1>Dashboard</h1>
      <section>
        <button
          type="button"
          className="btn btn--sidebar"
          onClick={() => handleDisplayOption("image")}
        >
          Add Level Image
        </button>
        {showOptions.image && (
          <UploadImageForm
            directory="images"
            closeOption={() => handleDisplayOption("image")}
          />
        )}
      </section>

      <section>
        <button
          type="button"
          className="btn btn--sidebar"
          onClick={() => handleDisplayOption("tag")}
        >
          Add Tag Image
        </button>
        {showOptions.tag && (
          <UploadImageForm
            directory="tag"
            closeOption={() => handleDisplayOption("tag")}
          />
        )}
      </section>

      <section>
        <button
          type="button"
          className="btn btn--sidebar"
          onClick={() => handleDisplayOption("newLevel")}
        >
          Create New Level
        </button>
        {showOptions.newLevel && <OverlayGrid />}
      </section>
    </div>
  );
};

export default Sidebar;
