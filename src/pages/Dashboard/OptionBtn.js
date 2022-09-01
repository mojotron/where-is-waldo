import React from "react";

const OptionBtn = ({ btnText, handler }) => {
  return (
    <button type="button" className="btn btn--sidebar" onClick={handler}>
      {btnText}
    </button>
  );
};

export default OptionBtn;
