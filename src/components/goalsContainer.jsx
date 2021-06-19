import React from "react";
import Goal from "./goal";
import { useSelector } from "react-redux";

const GoalsContainer = () => {
  const goals = useSelector((state) => state.entities.goals);
  const greenbar = useSelector((state) => state.entities.greenbar);

  return (
    <div className="goals">
      {goals.concat(greenbar).map((goal) => (
        <Goal goal={goal} key={goal.goal} />
      ))}
    </div>
  );
};

export default GoalsContainer;
