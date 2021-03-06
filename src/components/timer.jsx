import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimer } from "../store/actions";
import { setTimerRunning, setTimer } from "../store/appConfig";

const Timer = () => {
  const dispatch = useDispatch();
  const { remaining, running: timerRunning } = useSelector(
    (state) => state.appConfig.timer
  );
  const [timer, setCurrentTimer] = useState();
  const timeout = useRef();
  const currentTimer = useRef();

  useEffect(() => {
    dispatch(getTimer());
    return () => {
      currentTimer.current && dispatch(setTimer(currentTimer.current));
    };
  }, [dispatch]);

  useEffect(() => {
    setCurrentTimer(remaining);
  }, [remaining]);

  useEffect(() => {
    if (!timerRunning || timer <= 0) return;

    let lastUpdate = Date.now();
    timeout.current = setTimeout(() => {
      const now = Date.now();
      const deltaTime = now - lastUpdate;
      const newTime = timer - deltaTime / 1000;
      if (newTime <= 0) {
        return dispatch(setTimerRunning(false));
      }
      setCurrentTimer(newTime);
      currentTimer.current = timer;
    }, 200);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [timer, timerRunning, dispatch]);

  function timerConvert() {
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
