import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const appSlice = createSlice({
  name: "app",
  initialState: {
    data: data,
  },
  reducers: {
    resetScore: (state) => {
      state.data = data;
    },
    resetAllTests: (state, action) => {
      const { id } = action.payload;
      const item = state.data.find((item) => item.id === id);
      if (item) {
        item.tests.forEach((test) => {
          test.score = 0;
          test.taken = false;
        });
      }
    },
    resetSingleTest: (state, action) => {
      const { id, testId } = action.payload;
      const item = state.data.find((item) => item.id === id);
      if (item) {
        const test = item.tests.find((test) => test.id === testId);
        if (test) {
          test.score = 0;
          test.taken = false;
        }
      }
    },
    updateScore: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload.id);
      const test = item.tests.find(item => item.id === action.payload.testId);
      test.score = 0;
      test.score += action.payload.score;
      test.taken = true;
    },
  },
});

export const { resetScore, updateScore, resetAllTests, resetSingleTest } = appSlice.actions;

export default appSlice.reducer;
