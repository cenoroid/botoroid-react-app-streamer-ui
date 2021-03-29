import React, { Component } from "react";
import io from "socket.io-client";

import "./App.css";
const socket = io("https://botoroid-express-app.herokuapp.com");

class App extends Component {
  componentDidMount() {
    this.connectToServer();
    this.listenToServer();
    this.getRequests();
  }
  connectToServer = () => {
    socket.on("connected");
  };
  listenToServer = () => {
    socket.on("getrequests", (data) => {
      this.setState({ requests: data });
    });
  };
  getRequests = () => {
    socket.emit("getrequests");
  };
  handleRemove = (request) => {
    let requests = [...this.state.requests];
    requests.splice(request.id - 1, 1);
    for (let index = 0; index < requests.length; index++) {
      requests[index].id = index + 1;
    }
    this.setState({ requests });
    socket.emit("deleterequest", { requests, request });
  };
  timerInterval = 0;
  openInNewTab = (request) => {
    const newWindow = window.open(
      request.link,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
    this.handleStart(request);
  };

  timer = () => {
    if (this.state.timer > 0) {
      this.setState((prevState) => {
        return { timer: prevState.timer - 1 };
      });
    } else {
      this.setState({ timerStatus: "stopped" });
      clearInterval(this.timerInterval);
    }
  };
  timerConvert = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = Math.floor(this.state.timer % 60);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + "m" + seconds + "s";
  };
  handleStart = (request) => {
    let timer;
    if (request.type === "short video request") {
      timer = 600;
    } else timer = 15;
    this.setState({ timerStatus: "running", timer: timer });
    socket.emit("starttimer", { timer: timer, request });
    this.timerInterval = setInterval(this.timer, 1000);
  };
  handlePause = () => {
    if (this.state.timerStatus === "running") {
      this.setState({ timerStatus: "paused" });
      clearInterval(this.timerInterval);
    } else {
      this.setState({ timerStatus: "running" });
      this.timerInterval = setInterval(this.timer, 1000);
    }
    socket.emit("pausetimer");
  };
  handleStop = () => {
    this.setState({ timer: 0 });
    socket.emit("stoptimer");
  };
  startingEntry;
  endingEntry;
  highlights = document.querySelectorAll(".notHovering");
  dragStart = (e) => {
    this.startingEntry = e.target.attributes.id.value;
    let empties = document.querySelectorAll(".empty");
    for (let empty of empties) {
      empty.className = "emptyInteract";
    }
    document.querySelector(".firstempty").className = "firstemptyInteract";
  };
  dragEnd = () => {
    console.log("drag end");
    let empties = document.querySelectorAll(".emptyInteract");
    for (let empty of empties) {
      empty.className = "empty";
    }
    document.querySelector(".firstemptyInteract").className = "firstempty";
    let highlights = document.querySelectorAll(".hovering");
    for (let highlight of highlights) {
      highlight.className = "notHovering";
      // lastempty.className="lastempty"
    }
  };
  dragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  dragEnter = (e) => {
    console.log(e.target.id);
    let highlights = document.querySelector("#h" + e.target.id[1]);
    console.log(highlights);
    highlights.className = "hovering";
    e.preventDefault();
    e.stopPropagation();
  };
  dragLeave = (e) => {
    console.log(e.target.id);
    let nohighlight = document.querySelector(".hovering");
    nohighlight.className = "notHovering";
  };
  dragDrop = (e) => {
    this.endingEntry = e.target.id[1];
    socket.emit("swaprequests", {
      start: this.startingEntry,
      end: this.endingEntry,
    });
    console.log(this.startingEntry, this.endingEntry);
  };
  state = { requests: [], timerStatus: "stopped", timer: null };
  render() {
    console.log(this.state);
    const renderHeaderButton = () => {
      let bgColor;
      if (this.state.timerStatus === "stopped") {
        return (
          <div className="header">
            <button
              onClick={() => this.handleStart(this.state.requests[0])}
              className="buttonStart"
            >
              Start
            </button>
          </div>
        );
      } else if (this.state.timerStatus === "running") {
        bgColor = "rgb(0, 188, 212)";
      } else bgColor = "rgb(240, 98, 146, 0.5)";
      return (
        <div className="header">
          <button onClick={this.handleStop} className="buttonStop">
            Stop
          </button>
          <button
            onClick={this.handlePause}
            style={{ backgroundColor: bgColor }}
            className="buttonPause"
          >
            II
          </button>
        </div>
      );
    };
    return (
      <div>
        <div>{this.timerConvert()}</div>
        <div>{renderHeaderButton()}</div>
        <div
          className="firstempty"
          id="e0"
          onDragOver={(e) => this.dragOver(e)}
          onDragEnter={(e) => this.dragEnter(e)}
          onDragLeave={(e) => this.dragLeave(e)}
          onDrop={(e) => this.dragDrop(e)}
        ></div>
        <div className="notHovering" id="h0"></div>
        {this.state.requests.map((request) => (
          <div>
            <button
              draggable="true"
              onDragEnd={this.dragEnd}
              onDragStart={(e) => this.dragStart(e)}
              onClick={() => {
                this.openInNewTab(request);
              }}
              id={request.id}
              className="button1"
              key={request.id}
              request={request}
            >
              {request.id}. {request.message} - {request.name}
            </button>
            <button
              className="button2"
              onClick={() => this.handleRemove(request)}
            >
              X
            </button>
            <div
              onDragOver={(e) => this.dragOver(e)}
              onDragEnter={(e) => this.dragEnter(e)}
              onDragLeave={(e) => this.dragLeave(e)}
              onDrop={(e) => this.dragDrop(e)}
              className="empty"
              id={"e" + request.id}
            ></div>
            <div className="notHovering" id={"h" + request.id}></div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
