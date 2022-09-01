import { useState } from "react";
import { useStorage } from "../../hooks/useStorage";
import UploadImageForm from "./UploadImageForm";
import OverlayGrid from "../../components/OverlayGrid";
import CreateTag from "./CreateTag";
import LevelList from "./LevelList";
import OptionBtn from "./OptionBtn";
import "./Dashboard.css";
import { useFirestore } from "../../hooks/useFirestore";

const OptionBar = () => {
  const { loadImages, response } = useStorage();
  // state to toggle selected dashboard option
  const [showOptions, setShowOptions] = useState({
    image: false,
    tag: false,
    newLevel: false,
  });
  // display create tag form when clicking on Overlay grid
  const [makeTag, setMakeTag] = useState(false);
  // keep track off selected cellId
  const [cellId, setCellId] = useState(null);
  // new level document data
  const [currentLevel, setCurrentLevel] = useState({
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

  const handelChangeCellId = (cellId) => {
    setCellId(cellId);
    setMakeTag(true);
  };
  // algorithm for updatting setCurrentLevel state
  const handleCreateTag = (targetName, targetIcon, cellId) => {
    setCurrentLevel((oldValue) => {
      // check if target already exists
      const target = oldValue.tags.find((tag) => tag.targetName === targetName);
      // if there is no target add new tag to tags
      if (target === undefined)
        return {
          ...oldValue,
          tags: [
            ...oldValue.tags,
            { targetName, targetIcon, cellIds: [cellId] },
          ],
        };
      // tag exists and cellId exists return old value
      if (target.cellIds.includes(cellId)) return oldValue;
      // target exist add new cellId to tags cellsId array
      return {
        ...oldValue,
        tags: oldValue.tags.map((tag) =>
          tag.targetName === targetName
            ? { ...tag, cellIds: [...tag.cellIds, cellId] }
            : tag
        ),
      };
    });
    // close create tag form
    setMakeTag(false);
  };

  const handleCreateLevelDocument = async () => {
    await addDocument(currentLevel);
    console.log(firestoreRes.success);
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
            directory="tag"
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
          <div>
            {response.imageUrls && (
              <LevelList
                images={response.imageUrls}
                setCurrentLevel={setCurrentLevel}
              />
            )}
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

export default OptionBar;
