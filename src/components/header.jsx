import React from "react";
import Timer from "./timer";
import TimerControl from "./timerControl";
const Header = () => {
  return (
    <div className="header">
      <div className="timer">
        <Timer />
      </div>
      <div className="timerControl">
        <TimerControl />
      </div>
    </div>
  );
};

export default Header;
