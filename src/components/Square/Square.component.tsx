import React from "react";
import "./Square.style.scss";

const Square: React.FunctionComponent<{ value: number }> = (props) => {
  return (
    <button
      className="square"
      onClick={() => {
        alert(props.value);
      }}
    >
      {props.value}
    </button>
  );
};

export default Square;
