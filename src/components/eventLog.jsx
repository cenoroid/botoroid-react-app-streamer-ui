import React, { Component } from "react";

class EventLog extends Component {
  handleClick = () => {
    this.props.socket.emit("getlog");
  };
  state = {};
  render() {
    return <button onClick={this.handleClick}>View Log</button>;
  }
}

export default EventLog;
