import { useState, useEffect } from "react";
import { useStorage } from "../../hooks/useStorage";
import { useFirestore } from "../../hooks/useFirestore";
import UploadImageForm from "./UploadImageForm";
import OverlayGrid from "../../components/OverlayGrid";
import CreateTag from "./CreateTag";
import LevelList from "./LevelList";
import OptionBtn from "./OptionBtn";
import "./Dashboard.css";

const OptionBar = () => {
  const { loadImages, response } = useStorage();
  const [showOptions, setShowOptions] = useState({
    image: false,
    tag: false,
    newLevel: false,
  });
  const [makeTag, setMakeTag] = useState(false);
  const [firstCoords, setFirstCoords] = useState(null);
  const [secondCoords, setSecondCoords] = useState(null);
  const [currentLevel, setCurrentLevel] = useState({
    title: "",
    image: "",
    tags: [],
  });

  const { response: firestoreRes, addDocument } = useFirestore("levels");

  const toggleOption = async (option) => {
    setShowOptions((oldValue) => ({
      image: false,
      tag: false,
      newLevel: false,
      [option]: !oldValue[option],
    }));
    if (option === "newLevel") await loadImages("images");
  };

  useEffect(() => {
    if (!firstCoords || !secondCoords) return;
    if (firstCoords.x > secondCoords.x || firstCoords.y > secondCoords.y) {
      setSecondCoords(null);
      return;
    }
    setMakeTag(true);
  }, [firstCoords, secondCoords]);

  const handleTagCoords = (coordObject) => {
    if (secondCoords) return;
    firstCoords ? setSecondCoords(coordObject) : setFirstCoords(coordObject);
  };
  // algorithm for updatting setCurrentLevel state
  const handleCreateTag = (targetName, targetIcon) => {
    setCurrentLevel((oldValue) => {
      const target = oldValue.tags.find(
        (tag) => tag.targetName === targetName || tag.targetIcon === targetIcon
      );
      if (target) return; // exit if target exist
      return {
        ...oldValue,
        tags: [
          ...oldValue.tags,
          {
            targetName,
            targetIcon,
            coords: {
              topLeft: { ...firstCoords },
              bottomRight: { ...secondCoords },
            },
          },
        ],
      };
    });
    setMakeTag(false);
    setFirstCoords(null);
    setSecondCoords(null);
  };

  const handleCreateLevelDocument = async () => {
    await addDocument(currentLevel);
    toggleOption("newLevel");
  };

  return (
    <div className="Dashboard__Sidebar">
      <h1>Dashboard</h1>
      {/* upload level image option */}
      <section>
        <OptionBtn
          btnText="Add Level Image"
          handler={() => toggleOption("image")}
        />
        {showOptions.image && (
          <UploadImageForm
            directory="images"
            closeOption={() => toggleOption("image")}
          />
        )}
      </section>
      {/* upload tag icon image option */}
      <section>
        <OptionBtn
          btnText="Add Tag Image"
          handler={() => toggleOption("tag")}
        />
        {showOptions.tag && (
          <UploadImageForm
            directory="tags"
            closeOption={() => toggleOption("tag")}
          />
        )}
      </section>
      {/* create level document option */}
      <section>
        <OptionBtn
          btnText="Create New Level"
          handler={() => toggleOption("newLevel")}
        />
        {showOptions.newLevel && (
          <div className="Dashboard__Sidebar__new-level">
            <input
              placeholder="level name"
              type="text"
              value={currentLevel.title}
              onChange={(e) =>
                setCurrentLevel((oldValue) => ({
                  ...oldValue,
                  title: e.target.value,
                }))
              }
            />
            {response.imageUrls && (
              <LevelList
                images={response.imageUrls}
                setCurrentLevel={setCurrentLevel}
              />
            )}

            <OverlayGrid
              image={currentLevel.image}
              handleTagCoords={handleTagCoords}
              styles={{ height: "562.5px", width: "1000px" }}
            />
            {makeTag && <CreateTag handleCreateTag={handleCreateTag} />}

            <button className="btn" onClick={handleCreateLevelDocument}>
              Create
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default OptionBar;
