import React, { useState, useEffect } from "react";
import Timer from "./timer";
import TimerControl from "./timerControl";
const Header = (props) => {
  const [timerStatus, setTimerStatus] = useState("stopped");
  useEffect(() => {
    props.socket.emit("gettimer");
    props.socket.on("starttimer", (timer, timerRunning) => {
      if (timer > 0) {
        if (timerRunning) {
          setTimerStatus("running");
        } else {
          setTimerStatus("paused");
        }
      }
    });
    // eslint-disable-next-line
  }, []);
  function handlePause() {
    if (timerStatus === "running") {
      setTimerStatus("paused");
    } else {
      setTimerStatus("running");
    }
    props.socket.emit("pausetimer");
  }
  function handleStop() {
    setTimerStatus("stopped");
    props.socket.emit("stoptimer");
  }
  function handleTimerOver() {
    setTimerStatus("stopped");
  }
  return (
    <div>
      <div className="timer">
        <Timer
          socket={props.socket}
          onStop={handleStop}
          onTimerOver={handleTimerOver}
        />
      </div>
      <div className="timerControl">
        <TimerControl
          timerStatus={timerStatus}
          onStart={props.onStart}
          onStop={handleStop}
          onPause={handlePause}
        />
      </div>
    </div>
  );
};

export default Header;
