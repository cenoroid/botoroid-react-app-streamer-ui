import React from "react";

const Goals = (props) => {
  return (
    <div className="goals">
      {props.goals.map((goal, index) => (
        <button
          className="goal"
          onClick={() => props.socket.emit("reset", goal)}
          style={{
            backgroundColor:
              goal.current >= goal.end ? "green" : "rgb(0, 188, 212)",
            border:
              "1px solid" + goal.current >= goal.end
                ? "green"
                : "rgb(0, 188, 212)",
          }}
        >
          {goal.goal + " : " + goal.current + " / " + goal.end}
        </button>
      ))}
    </div>
  );
};

export default Goals;
