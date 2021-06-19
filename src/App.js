import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch } from "react-redux";
import { initApp } from "./store/actions";
import Settings from "./components/settings";
import EditGoals from "./components/editGoals";
import EditRedemptions from "./components/editRedemptions";
import EventLog from "./components/eventLog";
import Dashboard from "./components/dashboard";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route path="/eventlog">
          <EventLog />
        </Route>
        <Route path="/editSettings">
          <Settings />
        </Route>
        <Route path="/editGoals">
          <EditGoals />
        </Route>
        <Route path="/editRedemptions">
          <EditRedemptions />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
