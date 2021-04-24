import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  useEffect(() => {
    props.socket.on("starttimer", (resTimer, resTimerRunning) => {
      if (resTimer > 0) {
        setTimer(resTimer);
        setTimerRunning(resTimerRunning);
      }
    });
    props.socket.on("pausetimer", () => {
      setTimerRunning((prev) => !prev);
    });
    props.socket.on("stoptimer", () => {
      setTimer(0);
    });
    return () => {
      props.socket.off("stoptimer");
      props.socket.off("pausetimer");
      props.socket.off("starttimer");
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (timer > 0) {
      if (timerRunning) {
        setTimeout(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }
    } else {
      setTimerRunning(false);
      props.onTimerOver();
    }
    // eslint-disable-next-line
  }, [timer, timerRunning]);

  function timerConvert() {
    if (timer < 0) {
      setTimer(0);
    }
    let minutes = Math.floor(timer / 60);
    let seconds = Math.floor(timer % 60);

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + "m" + seconds + "s";
  }

  return <div>{timerConvert()}</div>;
};

export default Timer;
