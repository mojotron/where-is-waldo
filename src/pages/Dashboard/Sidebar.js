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

  console.log(currentLevel);

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
    setCurrentLevel((oldValue) => {
      console.log(oldValue);
      const target = oldValue.tags.find((tag) => tag.targetName === targetName);
      if (target === undefined)
        return {
          ...oldValue,
          tags: [
            ...oldValue.tags,
            { targetName, targetIcon, cellIds: [cellId] },
          ],
        };

      if (target.cellIds.includes(cellId)) return oldValue;

      return {
        ...oldValue,
        tags: oldValue.tags.map((tag) =>
          tag.targetName === targetName
            ? { ...tag, cellIds: [...tag.cellIds, cellId] }
            : tag
        ),
      };
    });
    setMakeTag(false);
  };

  const handleCreateLevelDocument = async () => {
    console.log(currentLevel);
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
            <button className="btn" onClick={handleCreateLevelDocument}>
              Create
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Sidebar;
