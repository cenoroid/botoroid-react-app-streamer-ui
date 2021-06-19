import React, { useState } from "react";
import { useLetterInput } from "./useLetterInput";
import { useNumberInput } from "./useNumberInput";
import { useDispatch } from "react-redux";
import { updateCurrency } from "../store/actions";

const AddCurrency = () => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername,
  } = useLetterInput("");
  const { value, bind: bindAmount, reset: resetAmount } = useNumberInput("");

  function handleClick() {
    setClicked(true);
  }
  function handleAdd() {
    setClicked(false);
    dispatch(updateCurrency({ username, value }));
    resetUsername();
    resetAmount();
  }

  return clicked ? (
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
  ) : (
    <button className="buttonStart" onClick={handleClick}>
      Add Currency
    </button>
  );
};

export default AddCurrency;
