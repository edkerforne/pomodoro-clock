import React from "react";
import "./App.scss";

const classNames = require("classnames");

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
  isRunning: false,
  hasStarted: false,
  hasChanged: false
};

const TimerControl = props => {
  return (
    <button
      value={props.value}
      className={"timer__control " + props.className}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

const TimerLengthControl = props => {
  return (
    <div className="timer-length">
      <div>{props.title}:</div>
      <div className="timer-length__controls">
        <button
          value="-"
          className="timer-length__control substract"
          onClick={props.onClick}
        >
          -
        </button>
        <p className="timer-length__value">{props.timerLength}</p>
        <button
          value="+"
          className="timer-length__control add"
          onClick={props.onClick}
        >
          +
        </button>
      </div>
    </div>
  );
};

const Display = props => {
  const resetClasses = classNames({
    reset: true,
    hide: !props.hasChanged
  });

  const pauseClasses = classNames({
    pause: true,
    hide: !props.hasStarted && !props.isRunning
  });

  const startClasses = classNames({
    start: true,
    hide: props.hasStarted && props.isRunning
  });

  return (
    <main id="display">
      <h1 id="status">
        {props.timerType === SESSION.type ? "Work time!" : "Take a break!"}
      </h1>
      <div id="counter">{props.displayedTimer}</div>
      <div id="timer-controls">
        <TimerControl
          title="RESET"
          value="reset"
          className={resetClasses}
          onClick={props.resetCountdown}
        />
        <TimerControl
          title="PAUSE"
          value="pause"
          className={pauseClasses}
          onClick={props.pauseCountdown}
        />
        <TimerControl
          title={props.hasStarted ? "RESUME" : "START"}
          value="start"
          className={startClasses}
          onClick={props.beginCountdown}
        />
      </div>
    </main>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.resetCountdown = this.resetCountdown.bind(this);
    this.pauseCountdown = this.pauseCountdown.bind(this);
    this.beginCountdown = this.beginCountdown.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.controlLength = this.controlLength.bind(this);
    this.clockify = this.clockify.bind(this);
  }

  resetCountdown = () => {
    this.setState(defaultState);
  };

  pauseCountdown = () => {
    /* TODO */
  };

  beginCountdown = () => {
    /* TODO */
  };

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
    if (this.state.isRunning) return;
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
    this.setState({ hasChanged: true });
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
          resetCountdown={this.resetCountdown}
          pauseCountdown={this.pauseCountdown}
          beginCountdown={this.beginCountdown}
          hasChanged={this.state.hasChanged}
          isRunning={this.state.isRunning}
          hasStarted={this.state.hasStarted}
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
