import React, { useState, useEffect } from "react";
import _ from "lodash";
const EditGoals = (props) => {
  let { propGoals } = props;
  const [value, setValue] = useState({});
  const [goals, setGoals] = useState(propGoals);

  useEffect(() => {
    setGoals(propGoals);
  }, [propGoals]);
  return (
    <div className="editGoalsContainer ">
      {goals.map((goal, index) => (
        <div key={goal + index}>
          <div className="goalContainer">
            <div className="goalTitle">{goal.goal}</div>
            <button
              onClick={() => {
                setGoals((prev) => {
                  prev[index] = {
                    ...goal,
                    expanded: goal.expanded ? !goal.expanded : true,
                  };
                  return [...prev];
                });
              }}
            >
              {goal.expanded ? "▲" : "▼"}
            </button>
          </div>
          {goal.expanded ? (
            <div>
              {Object.keys(goal).map((item, index) =>
                item !== "_id" && item !== "id" && item !== "expanded" ? (
                  <div className="fieldContainer" key={item + index}>
                    <div className="fieldTitle">{item}: </div>
                    <input
                      placeholder={Object.values(goal)[index]}
                      onChange={(e) => {
                        let input =
                          typeof Object.values(goal)[index] === "number"
                            ? Number(e.target.value)
                            : e.target.value;
                        if (
                          !isNaN(Object.values(goal)[index]) &&
                          isNaN(input)
                        ) {
                          return;
                        } else {
                          setValue((prev) => {
                            prev[goal.goal]
                              ? input !== ""
                                ? (prev[goal.goal][item] = input)
                                : delete prev[goal.goal][item]
                              : (prev[goal.goal] = { [item]: input });
                            if (_.isEmpty(prev[goal.goal])) {
                              delete prev[goal.goal];
                            }
                            return prev;
                          });
                        }
                      }}
                    ></input>
                  </div>
                ) : null
              )}
              <button onClick={() => props.onDeleteGoal(goal)}>
                Delete Goal
              </button>
            </div>
          ) : null}
        </div>
      ))}
      <button
        onClick={() => {
          setGoals((prev) => {
            return [
              ...prev,
              { goal: "new goal", current: 0, end: 0, expanded: true },
            ];
          });
        }}
      >
        New goal
      </button>
      <button
        onClick={() => {
          props.onSaveGoals(value);
          setValue({});
        }}
      >
        Save
      </button>
      <button onClick={props.onViewMain}>go back it</button>
    </div>
  );
};
export default EditGoals;
