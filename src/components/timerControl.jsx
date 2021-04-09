import React, { Component } from "react";

class TimerControl extends Component {
  buttonPause = () => {
    if (this.props.timerStatus === "paused") {
      return (
        <button
          onClick={this.props.onPause}
          onMouseDown={(e) => e.preventDefault()}
          className="buttonPaused"
        >
          II
        </button>
      );
    }
    return (
      <button
        onClick={this.props.onPause}
        onMouseDown={(e) => e.preventDefault()}
        className="buttonPause"
      >
        II
      </button>
    );
  };

  render() {
    if (this.props.timerStatus === "stopped") {
      return (
        <div className="header">
          <button onClick={this.props.onStart} className="buttonStart">
            Start
          </button>
        </div>
      );
    }
    return (
      <div>
        <button onClick={this.props.onStop} className="buttonStop">
          Stop
        </button>
        {this.buttonPause()}
      </div>
    );
  }
}

export default TimerControl;
