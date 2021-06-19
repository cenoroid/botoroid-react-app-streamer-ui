import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "entities",
  initialState: {
    requests: [],
    redemptions: [],
    goals: [],
    logs: [],
    settings: [],
    greenbar: {},
  },
  reducers: {
    requestsUpdated: (state, action) => {
      state.requests = action.payload;
    },
    redemptionsUpdated: (state, action) => {
      state.redemptions = action.payload;
    },
    goalsUpdated: (state, action) => {
      state.goals = action.payload;
    },
    logsUpdated: (state, action) => {
      state.logs = action.payload;
    },
    settingsUpdated: (state, action) => {
      state.settings = Object.values(action.payload);
    },
    greenbarUpdated: (state, action) => {
      state.greenbar = {
        goal: "pinata",
        current: Number(Math.round(action.payload.current)),
        end: action.payload.end,
      };
    },
  },
});

export const {
  requestsUpdated,
  redemptionsUpdated,
  goalsUpdated,
  logsUpdated,
  settingsUpdated,
  greenbarUpdated,
} = slice.actions;

export default slice.reducer;
