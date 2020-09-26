import React from "react";
import Square from "../Square/Square.component";

interface PropsPassed {
  squares: any;
  clickFunction: any;
}

const Board: React.FunctionComponent<PropsPassed> = (props) => {
  const renderStyledSquare = (index: number) => {
    if (index === 0 || index % Math.sqrt(props.squares.length) === 0) {
      return (
        <div style={{ display: "block", float: "left", clear: "both" }}>
          <Square
            key={index}
            value={index}
            square={props.squares[index]}
            clickFunction={props.clickFunction(index)}
          ></Square>
        </div>
      );
    } else {
      return (
        <div style={{ display: "inline-block", float: "left" }}>
          <Square
            key={index}
            value={index}
            square={props.squares[index]}
            clickFunction={props.clickFunction(index)}
          >
            {index}
          </Square>
        </div>
      );
    }
  };
  return (
    <div>
      {props.squares.map((individualSquare: any, index: number) => {
        return <span key={index}>{renderStyledSquare(index)}</span>;
      })}
    </div>
  );
};

export default Board;
