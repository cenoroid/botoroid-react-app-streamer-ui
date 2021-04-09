import React, { Component } from "react";

class AddCurrency extends Component {
  constructor(props) {
    super(props);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangeAmount(event) {
    if (isNaN(event.target.value)) {
      return;
    }
    this.setState({ amount: Number(event.target.value) });
  }
  handleType(event) {
    event.preventDefault();
  }
  handleClick = () => {
    this.setState({ clicked: true });
  };
  handleAdd = () => {
    this.setState({ clicked: false, username: "", amount: "" });
    this.props.onCbucksAdd(this.state.username, this.state.amount);
  };
  state = { clicked: false, username: "", amount: "" };
  render() {
    if (!this.state.clicked) {
      return (
        <button className="buttonStart" onClick={this.handleClick}>
          Add Currency
        </button>
      );
    }
    return (
      <div>
        <input
          placeholder="username"
          value={this.state.username}
          onChange={this.handleChangeUsername}
        ></input>
        <input
          placeholder="amount"
          value={this.state.amount}
          onChange={this.handleChangeAmount}
        ></input>
        <button onClick={this.handleAdd}>+</button>
      </div>
    );
  }
}

export default AddCurrency;
