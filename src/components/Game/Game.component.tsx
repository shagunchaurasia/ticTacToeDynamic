import React, { Component } from "react";
import Board from "../Board/Board.component";
import History from "../History/History.component";
import "./Game.styles.scss";

type squareProps = {
  numberPassed: number;
};
type squareState = {
  numberPassed: number;
  history: any;
  willXComeNext: boolean;
  currentStep: number;
};
class Game extends Component<squareProps, squareState> {
  constructor(props: squareProps) {
    super(props);

    console.log("props received");
    console.log(props);
    this.state = {
      numberPassed: props.numberPassed,
      history: [
        {
          squaresToRender: Array(props.numberPassed * props.numberPassed).fill(
            ""
          ),
        },
      ],
      currentStep: 0,
      willXComeNext: true,
    };
  }

  clickHandler = (i: number) => {
    console.log("Click handler in Game Component" + i);
    const history = this.state.history.slice(0, this.state.currentStep + 1);
    const currentBoardValues = history[history.length - 1];
    const squares = currentBoardValues.squaresToRender.slice();

    if (winnerLogic(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.willXComeNext === true ? "X" : "O";

    this.setState(
      {
        history: history.concat({
          squaresToRender: squares,
        }),
        currentStep: history.length,
        willXComeNext: !this.state.willXComeNext,
      },
      () => {
        console.log(this.state.history);
      }
    );
  };

  goBackInHistory = (historyStep: number) => {
    console.log("You wish to return to " + historyStep);

    //Alter the state back to this step number
    //Since we always start with X we know willXComeNext is false in even cases
    this.setState({
      currentStep: historyStep,
      willXComeNext: historyStep % 2 === 0 ? true : false,
    });
    //We need to make sure the moves button also get removed once we go back in history
  };

  componentDidUpdate(prevProps: any) {
    if (this.props.numberPassed !== prevProps.numberPassed) {
      this.setState({
        numberPassed: this.props.numberPassed,
        history: [
          {
            squaresToRender: Array(
              this.props.numberPassed * this.props.numberPassed
            ).fill(""),
          },
        ],
        currentStep: 0,
        willXComeNext: true,
      });
    }
  }

  render() {
    console.log("Rendering again");

    console.log(this.state.history);
    const squaresTillNow = this.state.history;
    const currentMove = squaresTillNow[this.state.currentStep];
    const winner = winnerLogic(currentMove.squaresToRender);
    const nextTurn = this.state.willXComeNext ? "X" : "O";

    let contentToRender: string;

    if (winner) {
      contentToRender = "Winner : ";
    } else {
      contentToRender = "Next Turn : ";
    }

    console.log("squaresTillNow");
    console.log(squaresTillNow);
    const renderHistory = squaresTillNow.map((value: any, index: number) => {
      return (
        //To be styled
        //On click of this button we should be able to go back in history which we are already saving

        <div>
          <button onClick={() => this.goBackInHistory(index)}>
            {index == 0 ? (
              <span>Go Back to Start</span>
            ) : (
              <span>
                Go Back To Move
                <span className="indexValue">{index}</span>
              </span>
            )}
          </button>
        </div>
      );
    });

    return (
      <div className="gameBoard">
        <div className="boardWrapper">
          <h1>Tic Tac Toe Game</h1>
          <h2>
            {contentToRender} <span>{!winner ? nextTurn : winner}</span>
          </h2>
          <Board
            squares={currentMove.squaresToRender}
            clickFunction={(i: number) => this.clickHandler}
          ></Board>
        </div>
        <div className="historyWrapper">
          <History>{renderHistory}</History>
        </div>
      </div>
    );
  }
}

function winnerLogic(squares: any) {
  let allRowCombinations: any = [];
  let squareRoot = Math.sqrt(squares.length);

  function getRowCombinations() {
    for (let i = 0; i < squareRoot; i++) {
      let myArray = [];
      for (let j = 0; j < squareRoot; j++) {
        myArray.push(i * squareRoot + j);
      }
      allRowCombinations.push(myArray);
    }
  }
  let allColumnCombinations: any = [];

  function getColumnCombinations() {
    //For all column combinations

    for (let i = 0; i < squareRoot; i++) {
      let myArray = [];
      for (let j = 0; j < squareRoot; j++) {
        myArray.push(squareRoot * j + i);
      }
      allColumnCombinations.push(myArray);
    }
  }

  let diagonalCombinations: any = [];
  function getDiagonalCombinations() {
    let myArray = [];
    for (let j = 0; j < squareRoot; j++) {
      myArray.push(squareRoot * j + j);
    }
    diagonalCombinations.push(myArray);
  }
  let invertedDiagonalCombinations: any = [];

  function getInvertedDiagonalCombinations() {
    let myArray = [];
    for (let j = 1; j <= squareRoot; j++) {
      myArray.push(squareRoot * j - j);
    }
    invertedDiagonalCombinations.push(myArray);
  }

  getColumnCombinations();
  getRowCombinations();
  getDiagonalCombinations();
  getInvertedDiagonalCombinations();

  let finalWinningCombinations = allRowCombinations
    .concat(allColumnCombinations)
    .concat(diagonalCombinations)
    .concat(invertedDiagonalCombinations);

  console.log(finalWinningCombinations);

  for (let i = 0; i < finalWinningCombinations.length; i++) {
    console.log(finalWinningCombinations[i]);
    let [...a] = finalWinningCombinations[i];

    const result = (a: any) =>
      a.every((v: number) => squares[v] === squares[a[0]]);

    if (result(a) === true) {
      return squares[a[0]];
    }
  }
  return null;
}

export default Game;
