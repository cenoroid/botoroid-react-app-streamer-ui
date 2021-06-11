import React, { useState, useEffect } from "react";
import _ from "lodash";
const EditRedemptions = (props) => {
  const [redemptions, setRedemptions] = useState([]);
  const [value, setValue] = useState({});
  useEffect(() => {
    props.socket.emit("getredemptions");
    props.socket.on("getredemptions", (data) => {
      setRedemptions(data);
    });
    return () => {
      props.socket.off("getredemptions");
    };
  }, []);

  return (
    <div className="editRedemptionsContainer ">
      {redemptions.map((redemption, index) => (
        <div key={redemption + index}>
          <div className="redemptionContainer">
            <div className="redemptionTitle">{redemption.type}</div>
            <button
              onClick={() => {
                setRedemptions((prev) => {
                  prev[index] = {
                    ...redemption,
                    expanded: redemption.expanded ? false : true,
                  };
                  return [...prev];
                });
              }}
            >
              {redemption.expanded ? "▲" : "▼"}
            </button>
          </div>
          {redemption.expanded ? (
            <div>
              {Object.keys(redemption).map((item, index) =>
                item !== "_id" && item !== "id" && item !== "expanded" ? (
                  <div className="fieldContainer" key={item + index}>
                    <div className="fieldTitle">{item}: </div>
                    <input
                      placeholder={Object.values(redemption)[index]}
                      onChange={(e) => {
                        let input =
                          typeof Object.values(redemption)[index] ===
                            "number" && Object.values(redemption)[index] !== ""
                            ? Number(e.target.value)
                            : e.target.value;
                        if (
                          !isNaN(Object.values(redemption)[index]) &&
                          Object.values(redemption)[index] !== "" &&
                          isNaN(input)
                        ) {
                          console.log("yes it does");
                          return;
                        } else {
                          setValue((prev) => {
                            prev[redemption.type]
                              ? input !== ""
                                ? (prev[redemption.type][item] = input)
                                : delete prev[redemption.type][item]
                              : (prev[redemption.type] = { [item]: input });
                            if (_.isEmpty(prev[redemption.type])) {
                              delete prev[redemption.type];
                            }
                            return prev;
                          });
                        }
                      }}
                    ></input>
                  </div>
                ) : null
              )}
              <button onClick={() => props.onDeleteRedemption(redemption)}>
                Delete Redemption
              </button>
            </div>
          ) : null}
        </div>
      ))}
      <button
        onClick={() => {
          setRedemptions((prev) => {
            return [
              ...prev,
              {
                type: "new redemption",
                cost: 0,
                info: "info",
                label: "",
                expanded: true,
              },
            ];
          });
        }}
      >
        New Redemption
      </button>
      <button
        onClick={() => {
          props.onSaveRedemptions(value);
          setValue({});
        }}
      >
        Save
      </button>
      <button onClick={props.onViewMain}>go back it</button>
    </div>
  );
};
export default EditRedemptions;
