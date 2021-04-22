import React, { useState } from "react";
import { useLetterInput } from "./useLetterInput";
import { useNumberInput } from "./useNumberInput";
const AddCurrency = (props) => {
  const [clicked, setClicked] = useState(false);
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername,
  } = useLetterInput("");
  const {
    value: amount,
    bind: bindAmount,
    reset: resetAmount,
  } = useNumberInput("");

  function handleClick() {
    setClicked(true);
  }
  function handleAdd() {
    setClicked(false);
    resetUsername();
    resetAmount();
    props.onCbucksAdd(username, amount);
  }

  if (!clicked) {
    return (
      <button className="buttonStart" onClick={handleClick}>
        Add Currency
      </button>
    );
  }
  return (
    <div>
      <input
        autoComplete="off"
        placeholder="username"
        {...bindUsername}
      ></input>
      <input
        type="number"
        autoComplete="off"
        name="amountInput"
        placeholder="amount"
        {...bindAmount}
      ></input>
      <button onClick={handleAdd}>+</button>
    </div>
  );
};

export default AddCurrency;
