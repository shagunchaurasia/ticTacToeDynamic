import React from "react";
import "./Square.style.scss";

interface PropsPassed {
  key: number;
  value: number;
  clickFunction: any;
  square: number;
}

//After clicking on a square once i have disabled the button so that it cannot be clicked further
const Square: React.FunctionComponent<PropsPassed> = (props) => {
  return (
    <button
      className="square"
      onClick={() => props.clickFunction(props.value)}
      disabled={props.square ? true : false}
    >
      {props.square}
      {/* {props.value} */}
    </button>
  );
};

export default Square;
