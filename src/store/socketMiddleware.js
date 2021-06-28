import io from "socket.io-client";
import {
  requestsUpdated,
  redemptionsUpdated,
  goalsUpdated,
  logsUpdated,
  settingsUpdated,
  greenbarUpdated,
} from "./entities";

import { initTimer, setTimerRunning, setTimer } from "./appConfig";

const api = process.env.REACT_APP_API;
const socket = io(api);
const version = process.env.REACT_APP_VERSION;

const listener = {};

const websocket =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type === "initApp") {
      socket.emit("join", { name: "streamer", version });
      if (!listener.getsettings) {
        listener.getsettings = true;
        socket.on("getsettings", (data) => dispatch(settingsUpdated(data)));
      }
      if (!listener.getrequests) {
        listener.getrequests = true;
        socket.on("getrequests", (data) => dispatch(requestsUpdated(data)));
      }
      if (!listener.getgoals) {
        listener.getgoals = true;
        socket.on("getgoals", (data) => dispatch(goalsUpdated(data)));
      }
      if (!listener.getredemptions) {
        listener.getredemptions = true;
        socket.on("getredemptions", (data) =>
          dispatch(redemptionsUpdated(data))
        );
      }
      if (!listener.geteventlog) {
        listener.geteventlog = true;
        socket.on("geteventlog", (data) => dispatch(logsUpdated(data)));
      }
      if (!listener.getgreenbar) {
        listener.getgreenbar = true;
        socket.on("greenbardata", (data) => dispatch(greenbarUpdated(data)));
      }
    }
    if (action.type === "updateCurrency") {
      const { username, value } = action.payload;
      socket.emit("updatecurrency", { username, value });
    }
    if (action.type === "updateSettings")
      socket.emit("updatesettings", action.payload);

    if (action.type === "refund") socket.emit("refund", action.payload);

    if (action.type === "updateGoals") socket.emit("savegoals", action.payload);

    if (action.type === "deleteGoal") socket.emit("deletegoal", action.payload);

    if (action.type === "updateRedemptions")
      socket.emit("saveredemptions", action.payload);

    if (action.type === "deleteRedemption")
      socket.emit("deleteredemption", action.payload);

    if (action.type === "resetGoal") socket.emit("reset", action.payload);

    if (action.type === "deleteRequest")
      socket.emit("deleterequest", action.payload);

    if (action.type === "swapRequests")
      socket.emit("swaprequests", action.payload);

    if (action.type === "appConfig/getTimer") {
      if (!getState().appConfig.timer.initialized) socket.emit("gettimer");
      else dispatch(setTimer({ resumed: Date.now() }));
      if (!listener.gettimer) {
        listener.gettimer = true;
        socket.on("starttimer", (timer, timerRunning) => {
          if (timer > 0) {
            dispatch(initTimer({ timer, timerRunning }));
          }
        });
        socket.on("pausetimer", () => dispatch(setTimerRunning("toggle")));
        socket.on("stoptimer", () =>
          dispatch(initTimer({ timer: 0, timerRunning: false }))
        );
      }
    }
    if (action.type === "startTimer") socket.emit("starttimer");

    if (action.type === "stopTimer") socket.emit("stoptimer");

    if (action.type === "pauseTimer") socket.emit("pausetimer");

    return next(action);
  };
export default websocket;
