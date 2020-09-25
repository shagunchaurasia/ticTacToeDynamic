import React from "react";
import Square from "../Square/Square.component";

const Board: React.FunctionComponent<{ squares: any }> = (props) => {
  //To have more control over the rendered style square

  const renderStyledSquare = (index: number) => {
    //The matrix should be moved to new line for element number 0 and the element for which modulus returned will be 0
    if (index === 0 || index % Math.sqrt(props.squares.length) === 0) {
      return (
        <div style={{ display: "block", float: "left", clear: "both" }}>
          <Square key={index} value={index}></Square>
        </div>
      );
    } else {
      return (
        <div style={{ display: "inline-block", float: "left" }}>
          <Square key={index} value={index}>
            {index}
          </Square>
        </div>
      );
    }
  };
  return (
    <div>
      {props.squares.map((individualSquare: any, index: number) => {
        return renderStyledSquare(index);
      })}
    </div>
  );
};

export default Board;
