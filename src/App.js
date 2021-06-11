import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Settings from "./components/settings";
import EditGoals from "./components/editGoals";
import EditRedemptions from "./components/editRedemptions";
import Requests from "./components/requests";
import EventLog from "./components/eventLog";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";
//const API = "http://localhost:5000/";
const API = "https://second.botoroid.xyz/";
const socket = io(API);
const version = "v0.0.2";
const App = () => {
  const [requests, setRequests] = useState([]);
  const [logs, setLogs] = useState([]);
  const [show, setShow] = useState("main");
  const [settings, setSettings] = useState();
  const [goals, setGoals] = useState([]);
  const [greenbar, setGreenbar] = useState({});

  useEffect(() => {
    socket.emit("join", { name: "streamer", version });
    socket.on("getrequests", (data) => {
      setRequests(data);
    });
    socket.on("getsettings", (data) => {
      setSettings(Object.values(data));
    });
    socket.on("getgoals", (data) => {
      setGoals(data);
    });
    socket.on("greenbardata", (data) => {
      setGreenbar({
        goal: "pinata",
        current: Number(Math.round(data.current)),
        end: data.end,
      });
      let array = goals.push(greenbar);
      console.log(goals);
    });
    return () => {
      socket.off("getrequests");
      socket.off("getgoals");
      socket.off("greenbardata");
      socket.off("getsettings");
    };
  }, []);
  function handleStart() {
    socket.emit("starttimer");
  }

  function handleAddCurrency(username, value) {
    if (username !== "" && value !== "") {
      socket.emit("updatecurrency", { username, value });
    }
  }
  function handleExitLog() {
    setShow("main");
  }
  async function handleViewLog() {
    await axios.get(API + "getlogs").then((res) => {
      console.log(res.data);
      setLogs(res.data);
      setShow("log");
    });
  }
  function handleViewSettings() {
    setShow("settings");
  }
  function handleSaveSettings(data) {
    socket.emit("updatesettings", data);
  }
  function handleRefund(log) {
    socket.emit("refund", log);
    let oldLogs = [...logs];
    oldLogs.splice(log.id, 1);
    setLogs(oldLogs);
  }
  function handleViewEditGoals() {
    setShow("editGoals");
  }
  function handleUpdateGoals(data) {
    console.log(data);
    socket.emit("savegoals", data);
  }
  function handleDeleteGoal(data) {
    socket.emit("deletegoal", data);
  }
  function handleViewEditRedemptions() {
    setShow("editRedemptions");
  }
  function handleUpdateRedemptions(data) {
    console.log(data);
    socket.emit("saveredemptions", data);
  }
  function handleDeleteRedemption(data) {
    socket.emit("deleteredemption", data);
  }

  if (show === "log") {
    return (
      <div>
        <EventLog
          logs={logs}
          onExitLog={handleExitLog}
          onRefund={handleRefund}
        />
      </div>
    );
  }
  if (show === "settings") {
    return (
      <div>
        <Settings
          settings={settings}
          onSaveSettings={handleSaveSettings}
          onViewMain={() => setShow("main")}
        />
      </div>
    );
  }
  if (show === "editGoals") {
    return (
      <EditGoals
        socket={socket}
        onViewMain={() => setShow("main")}
        onSaveGoals={handleUpdateGoals}
        onDeleteGoal={handleDeleteGoal}
        propGoals={goals}
      />
    );
  }
  if (show === "editRedemptions") {
    return (
      <EditRedemptions
        socket={socket}
        onViewMain={() => setShow("main")}
        onSaveRedemptions={handleUpdateRedemptions}
        onDeleteRedemption={handleDeleteRedemption}
      />
    );
  }
  return (
    <div className="mainContainer">
      <header className="header">
        <Header
          socket={socket}
          API={API}
          onStart={() => {
            handleStart();
          }}
        />
      </header>
      <main className="requestsContainer">
        <Requests requests={requests} socket={socket} />
      </main>
      <footer className="footer">
        <Footer
          goals={goals.concat(greenbar)}
          socket={socket}
          onViewLog={handleViewLog}
          onCbucksAdd={(username, amount) =>
            handleAddCurrency(username, amount)
          }
          onViewSettings={handleViewSettings}
          onViewEditGoals={handleViewEditGoals}
          onViewEditStore={handleViewEditRedemptions}
        />
      </footer>
    </div>
  );
};

export default App;
