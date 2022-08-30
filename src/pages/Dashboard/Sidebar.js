import { useState } from "react";
import { useStorage } from "../../hooks/useStorage";
import UploadImageForm from "./UploadImageForm";
import OverlayGrid from "../../components/OverlayGrid";
import CreateTag from "./CreateTag";
import "./Dashboard.css";

const Sidebar = () => {
  const { loadImages, response } = useStorage();
  const [showOptions, setShowOptions] = useState({
    image: false,
    tag: false,
    newLevel: false,
  });
  const [makeTag, setMakeTag] = useState(false);
  const [cellId, setCellId] = useState(null);
  const [currentLevel, setCurrentLevel] = useState({
    image: "",
    tags: [],
  });

  const handleDisplayOption = async (option) => {
    setShowOptions((oldValue) => ({
      image: false,
      tag: false,
      newLevel: false,
      [option]: !oldValue[option],
    }));
    if (option === "newLevel") await loadImages("images");
  };

  const handelChangeCellId = (cellId) => {
    setCellId(cellId);
    setMakeTag(true);
  };

  const handleCreateTag = (targetName, targetIcon, cellId) => {
    console.log(targetName, targetIcon, cellId);
    setMakeTag(false);
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
        {showOptions.newLevel && (
          <div>
            <ul className="Dashboard__Sidebar__levels">
              {response.imageUrls &&
                response.imageUrls.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="level"
                    className="Dashboard__Sidebar__thumbnail"
                    onClick={() =>
                      setCurrentLevel((oldValue) => ({
                        ...oldValue,
                        image: url,
                      }))
                    }
                  />
                ))}
            </ul>
            <OverlayGrid
              image={currentLevel.image}
              handelChangeCellId={handelChangeCellId}
            />
            {makeTag && (
              <CreateTag cellId={cellId} handleCreateTag={handleCreateTag} />
            )}
            <button className="btn">Create</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Sidebar;
