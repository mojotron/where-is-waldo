import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useStorage } from "../../hooks/useStorage";
import "./CreateTag.css";

const CreateTag = ({ cellId, handleCreateTag }) => {
  // load current tag images as state for option value
  const { loadImages, response } = useStorage();
  const [targetName, setTargetName] = useState("");
  const [targetIcon, setTargetIcon] = useState("none");

  const _loadImage = useRef(loadImages).current;

  useEffect(() => {
    _loadImage("tags");
  }, [_loadImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO handle name or icon required
    handleCreateTag(targetName, targetIcon, cellId);
    setTargetName("");
    setTargetIcon("none");
  };

  return (
    <form className="CreateTag" onSubmit={handleSubmit}>
      <h2>Create tag at cell {cellId}</h2>
      <label htmlFor="target-name">Target name</label>
      <input
        type="text"
        id="target-name"
        value={targetName}
        onChange={(e) => setTargetName(e.target.value)}
      />

      <label htmlFor="target-icon">Target Icon</label>
      <div id="target-icon" className="CreateTag__icon-container">
        <div
          className={`CreateTag__icon ${
            targetIcon === "none" ? "icon-active" : ""
          }`}
          value="none"
          onClick={() => setTargetIcon("none")}
        >
          none
        </div>
        {response.imageUrls &&
          response.imageUrls.map((url) => (
            <div
              key={url}
              className={`CreateTag__icon ${
                targetIcon === url ? "icon-active" : ""
              }`}
              onClick={() => setTargetIcon(url)}
            >
              <img src={url} alt="target icon" />
            </div>
          ))}
      </div>
      <button className="btn" type="submit">
        Create Tag
      </button>
    </form>
  );
};

export default CreateTag;
