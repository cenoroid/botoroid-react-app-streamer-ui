import React from "react";
import { resetGoal } from "./../store/actions";
import { useDispatch } from "react-redux";

const Goal = ({ goal }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="goal"
      onClick={() => dispatch(resetGoal(goal))}
      style={{
        backgroundColor:
          goal.current >= goal.end ? "green" : "rgb(0, 188, 212)",
        border:
          "1px solid" + goal.current >= goal.end ? "green" : "rgb(0, 188, 212)",
      }}
    >
      {goal.goal + " : " + goal.current + " / " + goal.end}
    </button>
  );
};

export default Goal;
