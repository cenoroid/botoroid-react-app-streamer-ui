import React from "react";

const EventLog = (props) => {
  return (
    <div>
      <button onClick={props.onExitLog}>←</button>
      {props.logs.map((log) => {
        return (
          <div key={log._id}>
            {log.text}

            <button
              onClick={() => props.onhandleRefund(log)}
              style={{ width: 20, height: 20 }}
            >
              🗘
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default EventLog;
