import React, { Component } from "react";
import Timer from "./timer";
import TimerControl from "./timerControl";
class Header extends Component {
  componentDidMount() {
    this.listenToServer();
  }
  listenToServer = () => {
    this.props.socket.emit("gettimer");
    this.props.socket.on("starttimer", (timer, timerRunning) => {
      if (timer > 0) {
        if (timerRunning) {
          this.setState({ timerStatus: "running" });
        } else {
          this.setState({ timerStatus: "paused" });
        }
      }
    });
  };
  handleStart = () => {
    this.props.socket.emit("starttimer");
  };
  handlePause = () => {
    if (this.state.timerStatus === "running") {
      this.setState({ timerStatus: "paused" });
    } else {
      this.setState({ timerStatus: "running" });
    }
    this.props.socket.emit("pausetimer");
  };
  handleStop = () => {
    this.setState({ timerStatus: "stopped" });
    this.props.socket.emit("stoptimer");
  };

  state = { timer: 0, timerStatus: "stopped" };
  render() {
    console.log(this.state);
    return (
      <div>
        <div className="timer">
          <Timer socket={this.props.socket} />
        </div>
        <div className="header">
          <TimerControl
            timerStatus={this.state.timerStatus}
            onStart={this.handleStart}
            onStop={this.handleStop}
            onPause={this.handlePause}
          />
        </div>
      </div>
    );
  }
}

export default Header;
