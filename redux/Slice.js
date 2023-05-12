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
    updateScore: (state, action) => {
      const item = state.data.find((item) => item.id === action.payload.id);
      const test = item.tests.find(item => item.id === action.payload.testId);
      test.score = 0;
      test.score += action.payload.score;
      test.taken = true;
    },
  },
});

export const { resetScore, updateScore } = appSlice.actions;

export default appSlice.reducer;
