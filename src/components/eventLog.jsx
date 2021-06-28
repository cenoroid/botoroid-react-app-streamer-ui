import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refund } from "../store/actions";
const EventLog = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.entities.logs);
  return (
    <div>
      <Link className="button" to="/">
        ←
      </Link>
      {logs.map((log) => {
        console.log(logs);
        return (
          <div key={log._id}>
            {log.text}

            <button
              onClick={() => dispatch(refund(log))}
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
