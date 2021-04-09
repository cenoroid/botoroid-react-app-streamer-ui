import React, { Component } from "react";
import EventLog from "./eventLog";
import AddCurrency from "./addCurrency";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div>
        <AddCurrency
          onCbucksAdd={(username, amount) =>
            this.props.onCbucksAdd(username, amount)
          }
        />
        <EventLog
          socket={this.props.socket}
          onViewLog={() => this.props.onViewLog()}
        />
      </div>
    );
  }
}

export default Footer;
