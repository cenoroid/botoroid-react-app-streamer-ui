import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pauseTimer, stopTimer, startTimer } from "./../store/actions";

const TimerControl = () => {
  const dispatch = useDispatch();
  const { remaining, running } = useSelector((state) => state.appConfig.timer);

  return remaining > 0 ? (
    <div>
      <button onClick={() => dispatch(stopTimer())} className="buttonStop">
        Stop
      </button>
      <button
        onClick={() => dispatch(pauseTimer())}
        className={running ? "buttonPause" : "buttonPaused"}
      >
        II
      </button>
    </div>
  ) : (
    <button onClick={() => dispatch(startTimer())} className="buttonStart">
      Start
    </button>
  );
};

export default TimerControl;
