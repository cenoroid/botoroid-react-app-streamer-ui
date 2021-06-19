import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "config",
  initialState: {
    timer: { remaining: 0, running: false, initialized: false, paused: 0 },
  },
  reducers: {
    initTimer: (state, action) => {
      if (!state.timer.initialized) {
        state.timer.initialized = true;
      }
      const { timer, timerRunning } = action.payload;
      state.timer.remaining = timer;
      state.timer.running = timerRunning;
    },
    setTimer: (state, action) => {
      if (action.payload.resumed) {
        if (!state.timer.running) return;
        const { resumed } = action.payload;
        let deltaTime = (resumed - state.timer.paused) / 1000;
        state.timer.remaining = state.timer.remaining - deltaTime;
      } else {
        state.timer.remaining = action.payload;
        state.timer.paused = Date.now();
      }
      if (state.timer.remaining < 0) state.timer.remaining = 0;
    },

    setTimerRunning: (state, action) => {
      if (action.payload === "toggle") {
        state.timer.running = !state.timer.running;
      } else state.timer.running = action.payload;
    },
  },
});

export const { setTimer, initTimer, setTimerRunning } = slice.actions;
export default slice.reducer;
