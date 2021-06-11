import React from "react";

const TimerControl = (props) => {
  function buttonPause() {
    if (props.timerStatus === "paused") {
      return (
        <button
          onClick={props.onPause}
          onMouseDown={(e) => e.preventDefault()}
          className="buttonPaused"
        >
          II
        </button>
      );
    }
    return (
      <button
        onClick={props.onPause}
        onMouseDown={(e) => e.preventDefault()}
        className="buttonPause"
      >
        II
      </button>
    );
  }
  if (props.timerStatus === "stopped") {
    return (
      <button onClick={props.onStart} className="buttonStart">
        Start
      </button>
    );
  }
  return (
    <div>
      <button onClick={props.onStop} className="buttonStop">
        Stop
      </button>
      {buttonPause()}
    </div>
  );
};

export default TimerControl;
