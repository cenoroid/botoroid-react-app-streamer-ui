import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import io from "socket.io-client";
import "./App.css";
const socket = io("https://botoroid-express-app.herokuapp.com/");
//const socket = io("http://localhost:4000/");
class App extends Component {
  componentDidMount() {
    this.listenToServer();
  }

  listenToServer = () => {
    socket.emit("getrequests");
    socket.on("getrequests", (data) => {
      this.setState({ requests: data });
    });
    socket.on("getlog", (data) => {
      console.log(new Date(data[0].date));
      let currentDate = new Date();
      let date = [];
      for (let index = 0; index < data.length; index++) {
        data[index].refunded = false;
        date[index] = new Date(data[index].date);
        let hours = Math.ceil(Math.abs(currentDate - date[index]) / 3600000);
        if (hours < 24) {
          data[index].date = hours + "h";
        } else data[index].date = Math.floor(hours / 24) + "d";
      }

      let log = [...data];
      this.setState({ log, showLog: true });
    });
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

  openInNewTab = (request) => {
    const newWindow = window.open(
      request.link,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
    this.handleStart(request);
  };
  handleStart = () => {
    socket.emit("starttimer");
  };
  startingEntry;
  endingEntry;
  highlights = document.querySelectorAll(".notHovering");
  dragStart = (e) => {
    console.log(e.target.attributes);
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
  handleAddCurrency = (username, value) => {
    if (username !== "" && value !== "") {
      socket.emit("updatecurrency", {
        username: username.toLowerCase(),
        value,
      });
    }
  };
  handleExitLog = () => {
    this.setState({ showLog: false });
  };
  handleRefund = (username, value, id) => {
    this.handleAddCurrency(username, value);
    this.setState((prevState) => {
      let oldLogs = prevState.log;
      let oldLog = oldLogs.find(({ _id }) => _id === id);
      console.log(oldLog);
      oldLog.refunded = true;
      return { log: oldLogs };
    });
  };
  state = { requests: [], log: [], showLog: false };
  render() {
    console.log(this.state);
    if (this.state.showLog) {
      return (
        <div>
          <button onClick={this.handleExitLog}>←</button>
          {this.state.log.map((log) => {
            if (log.refunded) {
              return (
                <div key={log._id} style={{ textDecoration: "line-through" }}>
                  {log.date}-{log.user} redeemed {log.event.type} for{" "}
                  {log.event.cost}
                  <button
                    onClick={() =>
                      this.handleRefund(log.user, -log.event.cost, log._id)
                    }
                    style={{ width: 20, height: 20 }}
                  >
                    🗘
                  </button>
                </div>
              );
            }
            return (
              <div key={log._id}>
                {log.date}-{log.user} redeemed {log.event.type} for{" "}
                {log.event.cost}
                <button
                  onClick={() =>
                    this.handleRefund(log.user, -log.event.cost, log._id)
                  }
                  style={{ width: 20, height: 20 }}
                >
                  🗘
                </button>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div>
        <Header
          socket={socket}
          timerStatus={this.state.timerStatus}
          onStart={() => {
            this.handleStart();
          }}
        />
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
          <div key={"keyR" + request.id}>
            <div
              className="button1"
              draggable="true"
              onDragEnd={this.dragEnd}
              onDragStart={(e) => this.dragStart(e)}
            >
              <a
                onAuxClick={this.handleStart}
                onClick={(e) => e.preventDefault()}
                className="link"
                href={request.link || ""}
                id={request.id}
                request={request}
              >
                {request.id}.{" "}
                <div className="requestMessage">{request.message}</div> -{" "}
                {request.name}
              </a>
            </div>
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
        <Footer
          socket={socket}
          onViewLog={() => this.handleViewLog()}
          onCbucksAdd={(username, amount) =>
            this.handleAddCurrency(username, amount)
          }
        />
      </div>
    );
  }
}

export default App;
