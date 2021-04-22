import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";
const API = "http://localhost:4000/";
//const API = "https://botoroid-express-app.herokuapp.com/";
const socket = io(API);
const App = () => {
  const [requests, setRequests] = useState([]);
  const [logs, setLogs] = useState([]);
  const [showLog, setShowLog] = useState(false);
  useEffect(() => {
    socket.emit("getrequests");
    socket.on("getrequests", (data) => {
      console.log("clock");
      setRequests(data);
    });
    return () => {
      socket.off("getrequests");
    };
  }, []);
  useEffect(() => {}, [requests]);
  function handleRemove(request) {
    console.log(request);
    socket.emit("deleterequest", request);
  }
  function handleStart() {
    socket.emit("starttimer");
  }
  let startingEntry;
  let endingEntry;
  //let highlights = document.querySelectorAll(".notHovering");
  function dragStart(e) {
    startingEntry = e.target.attributes.id.value;
    let empties = document.querySelectorAll(".empty");
    for (let empty of empties) {
      empty.className = "emptyInteract";
    }
    document.querySelector(".firstempty").className = "firstemptyInteract";
  }
  function dragEnd() {
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
  }
  function dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function dragEnter(e) {
    console.log(e.target.id);
    let highlights = document.querySelector("#h" + e.target.id[1]);
    console.log(highlights);
    highlights.className = "hovering";
    e.preventDefault();
    e.stopPropagation();
  }
  function dragLeave(e) {
    console.log(e.target.id);
    let nohighlight = document.querySelector(".hovering");
    nohighlight.className = "notHovering";
  }
  function dragDrop(e) {
    endingEntry = e.target.id[1];
    socket.emit("swaprequests", {
      start: startingEntry,
      end: endingEntry,
    });
  }
  function handleAddCurrency(username, value) {
    if (username !== "" && value !== "") {
      socket.emit("updatecurrency", { username, value });
    }
  }
  function handleExitLog() {
    setShowLog(false);
  }
  async function handleViewLog() {
    await axios.get(API + "getlogs").then((res) => {
      console.log(res.data);

      setLogs(res.data);
      setShowLog(true);
    });
  }
  function handleRefund(log) {
    socket.emit("refund", log);
    let oldLogs = [...logs];

    oldLogs.splice(log.id, 1);

    setLogs(oldLogs);
  }
  if (showLog) {
    return (
      <div>
        <button onClick={handleExitLog}>←</button>
        {logs.map((log) => {
          return (
            <div key={log._id}>
              {log.text}

              <button
                onClick={() => handleRefund(log)}
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
        API={API}
        onStart={() => {
          handleStart();
        }}
      />
      <div
        className="firstempty"
        id="e0"
        onDragOver={(e) => dragOver(e)}
        onDragEnter={(e) => dragEnter(e)}
        onDragLeave={(e) => dragLeave(e)}
        onDrop={(e) => dragDrop(e)}
      ></div>
      <div className="notHovering" id="h0"></div>
      {requests.map((request) => (
        <div key={"keyR" + request.id}>
          <div
            className="button1"
            draggable="true"
            onDragEnd={dragEnd}
            onDragStart={(e) => dragStart(e)}
          >
            <a
              onAuxClick={handleStart}
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
          <button className="button2" onClick={() => handleRemove(request)}>
            X
          </button>
          <div
            onDragOver={(e) => dragOver(e)}
            onDragEnter={(e) => dragEnter(e)}
            onDragLeave={(e) => dragLeave(e)}
            onDrop={(e) => dragDrop(e)}
            className="empty"
            id={"e" + request.id}
          ></div>
          <div className="notHovering" id={"h" + request.id}></div>
        </div>
      ))}
      <Footer
        socket={socket}
        onViewLog={() => handleViewLog()}
        onCbucksAdd={(username, amount) => handleAddCurrency(username, amount)}
      />
    </div>
  );
};

export default App;
