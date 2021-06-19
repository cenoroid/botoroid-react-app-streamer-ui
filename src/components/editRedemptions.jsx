import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRedemption, updateRedemptions } from "./../store/actions";

const EditRedemptions = () => {
  const dispatch = useDispatch();
  const initRedemptions = useSelector((state) => state.entities.redemptions);
  const [redemptions, setRedemptions] = useState([...initRedemptions]);
  const [value, setValue] = useState({});

  useEffect(() => {
    setRedemptions([...initRedemptions]);
  }, [initRedemptions]);

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
              <button onClick={() => dispatch(deleteRedemption(redemption))}>
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
          dispatch(updateRedemptions(value));
          setValue({});
        }}
      >
        Save
      </button>
      <Link className="button" to="/">
        go back it
      </Link>
    </div>
  );
};
export default EditRedemptions;
