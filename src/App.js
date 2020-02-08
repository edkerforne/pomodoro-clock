import React from "react";
import "./App.scss";

// Timer type can be either session or break,
// these values are compared throughout the application
// to display and control their respective data
const SESSION = { property: "sessionLength", type: "SESSION" };
const BREAK = { property: "breakLength", type: "BREAK" };

const defaultState = {
  [SESSION.property]: 25,
  [BREAK.property]: 5,
  timer: 1500,
  timerType: SESSION.type,
  paused: true
};

class TimerLengthControl extends React.Component {
  render() {
    return (
      <div className="timer-length">
        <div>{this.props.title}:</div>
        <div className="timer-length__controls">
          <button
            value="-"
            className="timer-length__control substract"
            onClick={this.props.onClick}
          >
            -
          </button>
          <p className="timer-length__value">{this.props.timerLength}</p>
          <button
            value="+"
            className="timer-length__control add"
            onClick={this.props.onClick}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <main id="display">
        <h1 id="status">
          {this.props.timerType === SESSION.type
            ? "Work time!"
            : "Take a break!"}
        </h1>
        <div id="counter">{this.props.displayedTimer}</div>
        <div id="timer-controls">
          <button className="timer__control reset">RESET</button>
          <button className="timer__control start">RESUME</button>
        </div>
      </main>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.setSessionLength = this.setSessionLength.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.controlLength = this.controlLength.bind(this);
    this.clockify = this.clockify.bind(this);
  }

  setSessionLength = e => {
    this.controlLength(
      SESSION.property,
      e.target.value,
      this.state.sessionLength,
      SESSION.type
    );
  };

  setBreakLength = e => {
    this.controlLength(
      BREAK.property,
      e.target.value,
      this.state.breakLength,
      BREAK.type
    );
  };

  controlLength = (propertyToChange, buttonValue, currentLength, timerType) => {
    if (!this.state.paused) return;
    if (timerType === this.state.timerType) {
      if (buttonValue === "-" && currentLength !== 1) {
        this.setState({
          [propertyToChange]: currentLength - 1,
          timer: currentLength * 60 - 60
        });
      } else if (buttonValue === "+" && currentLength !== 60) {
        this.setState({
          [propertyToChange]: currentLength + 1,
          timer: currentLength * 60 + 60
        });
      }
    } else {
      if (buttonValue === "-" && currentLength !== 1) {
        this.setState({
          [propertyToChange]: currentLength - 1
        });
      } else if (buttonValue === "+" && currentLength !== 60) {
        this.setState({
          [propertyToChange]: currentLength + 1
        });
      }
    }
  };

  clockify = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = minutes * 60 - this.state.timer;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  };

  render() {
    return (
      <div id="page-wrapper">
        <Display
          timerType={this.state.timerType}
          displayedTimer={this.clockify(
            this.state.timerType === SESSION.type
              ? this.state.sessionLength
              : this.state.breakLength
          )}
        />
        <div id="timer-length-settings">
          <TimerLengthControl
            title="Session length"
            onClick={this.setSessionLength}
            timerLength={this.state.sessionLength}
          />
          <TimerLengthControl
            title="Break length"
            onClick={this.setBreakLength}
            timerLength={this.state.breakLength}
          />
        </div>
        <footer id="author">
          <span>
            by <a href="https://edkerforne.github.io/">Edwin Kerforne</a>
          </span>
        </footer>
      </div>
    );
  }
}

export default App;
