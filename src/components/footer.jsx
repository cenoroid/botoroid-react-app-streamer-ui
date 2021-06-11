import React from "react";

import AddCurrency from "./addCurrency";
import Goals from "./goals";
const Footer = (props) => {
  return (
    <div>
      <Goals goals={props.goals} socket={props.socket} />
      <AddCurrency
        onCbucksAdd={(username, amount) => props.onCbucksAdd(username, amount)}
      />
      <div className="footerButtons">
        <button onClick={props.onViewLog}>View Log</button>
        <button onClick={props.onViewSettings}>Settings</button>
        <button onClick={props.onViewEditGoals}>Edit Goals</button>
        <button onClick={props.onViewEditStore}>Edit Store</button>
      </div>
    </div>
  );
};

export default Footer;
