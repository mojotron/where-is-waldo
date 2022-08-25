import { useState } from "react";
import UploadImageForm from "../../components/UploadImageForm";
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
          className="btn"
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
          className="btn"
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
          className="btn"
          onClick={() => handleDisplayOption("newLevel")}
        >
          Create New Level
        </button>
        {showOptions.newLevel && <p>create level here</p>}
      </section>
    </div>
  );
};

export default Sidebar;
