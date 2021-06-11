import React, { useState } from "react";

const Settings = (props) => {
  const [value, setValue] = useState({});

  return (
    <div className="settingsContainer">
      {props.settings.map((item) => (
        <div className="typeContainer" key={item.type}>
          <div className="settingsType">{item.type}</div>
          {Object.entries(item).map((iitem) => {
            return iitem[0] !== "type" && iitem[0] !== "_id" ? (
              <div className="settingContainer" key={iitem[0]}>
                <div
                  className="settingTitle"
                  style={{ display: "inline-block" }}
                >
                  {iitem[0] + ":"}
                </div>
                {typeof iitem[1] === "boolean" ? (
                  <input
                    className="settingValue"
                    type="checkbox"
                    defaultChecked={
                      value[item.type] ? value[item.type][iitem[0]] : iitem[1]
                    }
                    onChange={(e) => {
                      setValue((prev) => {
                        prev = {
                          ...prev,
                          [item.type]: {
                            ...prev[item.type],
                            [iitem[0]]: e.target.checked,
                          },
                        };

                        return prev;
                      });
                    }}
                  ></input>
                ) : typeof iitem[1] === "number" ? (
                  <input
                    className="settingValue"
                    placeholder={iitem[1]}
                    onChange={(e) => {
                      setValue((prev) => {
                        e.target.value !== ""
                          ? (prev = {
                              ...prev,
                              [item.type]: {
                                ...prev[item.type],
                                [iitem[0]]: Number(e.target.value),
                              },
                            })
                          : delete prev[item.type][iitem[0]];
                        console.log(prev);
                        return prev;
                      });
                    }}
                  ></input>
                ) : (
                  <input
                    className="settingValue"
                    placeholder={iitem[1]}
                    onChange={(e) => {
                      setValue((prev) => {
                        e.target.value !== ""
                          ? (prev = {
                              ...prev,
                              [item.type]: {
                                ...prev[item.type],
                                [iitem[0]]: e.target.value,
                              },
                            })
                          : delete prev[item.type][iitem[0]];
                        return prev;
                      });
                    }}
                  ></input>
                )}
              </div>
            ) : null;
          })}
        </div>
      ))}
      <button
        onClick={() => {
          props.onSaveSettings(value);
        }}
      >
        Save Settings
      </button>
      <button onClick={props.onViewMain}>go back it</button>
    </div>
  );
};
export default Settings;
