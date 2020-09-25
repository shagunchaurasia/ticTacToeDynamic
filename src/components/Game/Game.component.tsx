import React, { Component } from "react";
import Board from "../Board/Board.component";
import "./Game.styles.scss";

type squareState = {
  squaresToRender: any;
};
class Game extends Component<{}, squareState> {
  constructor(props: any) {
    super(props);

    this.state = {
      squaresToRender: Array(9).fill(""),
    };
  }

  clickHandler = (squarePressedValue: number) => {
    console.log("Click handler in Game Component" + squarePressedValue);
  };

  render() {
    return (
      <div>
        <Board squares={this.state.squaresToRender}></Board>
      </div>
    );
  }
}

export default Game;
