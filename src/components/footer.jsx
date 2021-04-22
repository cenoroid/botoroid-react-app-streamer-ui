import React from "react";
import EventLog from "./eventLog";
import AddCurrency from "./addCurrency";
const Footer = (props) => {
  return (
    <div>
      <AddCurrency
        onCbucksAdd={(username, amount) => props.onCbucksAdd(username, amount)}
      />
      <EventLog onViewLog={() => props.onViewLog()} />
    </div>
  );
};

export default Footer;
