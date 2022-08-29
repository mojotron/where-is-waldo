import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useStorage } from "../../hooks/useStorage";

const CreateTag = ({ imageId }) => {
  // load current tag images as state for option value
  const { loadImages, response } = useStorage();

  console.log(response);

  const ld = useRef(loadImages).current;

  const [formData, setFormData] = useState({
    imageId: imageId,
    name: "",
    iconUrl: "",
  });

  useEffect(() => {
    ld("tag");
  }, [ld]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="CreateTag" onSubmit={handleSubmit}>
      <h2>Create tag</h2>
      <label htmlFor="name">Target name</label>
      <input type="text" name="" id="name" />

      <label htmlFor="">Target Icon</label>
      <div>
        <div value="none">none</div>
        {response.imageUrls &&
          response.imageUrls.map((url) => (
            <div
              style={{
                backgroundImage: `url("${url}")`,
                backgroundSize: "contain",
                height: "5rem",
                width: "5rem",
              }}
            ></div>
          ))}
      </div>
      <button className="btn" type="submit">
        Create Tag
      </button>
    </form>
  );
};

export default CreateTag;
