import React, { Component } from "react";
import "./App.scss";
import Game from "./components/Game/Game.component";

type stateDefinition = {
  numberPassed: number;
};
class App extends Component<{}, stateDefinition> {
  private numberInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.numberInput = React.createRef();

    this.state = {
      numberPassed: 3,
    };
  }

  changeBoardRendering = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("here");
    console.log(event);

    const numberPassedValue = this.numberInput.current!.value;
    console.log(numberPassedValue);
    this.setState(
      {
        numberPassed: parseInt(numberPassedValue),
      },
      () => console.log("this.state.numberPassed" + this.state.numberPassed)
    );
  };
  render() {
    return (
      <div className="App">
        <div className="header">
          <form onSubmit={this.changeBoardRendering}>
            <input type="number" min="3" ref={this.numberInput} max="12" />
            <button type="submit"> Reset Board</button>
          </form>
        </div>
        <Game numberPassed={this.state.numberPassed}></Game>
      </div>
    );
  }
}

export default App;
