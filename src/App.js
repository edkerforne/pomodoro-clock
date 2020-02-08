import React from "react";
import "./App.scss";

const App = () => {
  return (
    <div id="page-wrapper">
      <main id="display">
        <h1 id="status">Work time!</h1>
        <div id="counter">25:00</div>
        <div id="timer-controls">
          <button class="timer__control reset">RESET</button>
          <button class="timer__control start">RESUME</button>
        </div>
      </main>

      <div id="options">
        <div>Session length:</div>
        <div class="option-controls">
          <button class="option__control left">-</button>
          <input type="text" class="option__count" defaultValue="25"></input>
          <button class="option__control right">+</button>
        </div>

        <div>Break length:</div>
        <div class="option-controls">
          <button class="option__control left">-</button>
          <input type="text" class="option__count" defaultValue="5"></input>
          <button class="option__control right">+</button>
        </div>
      </div>

      <footer id="author">
        <span>
          by <a href="https://edkerforne.github.io/">Edwin Kerforne</a>
        </span>
      </footer>
    </div>
  );
};

export default App;
