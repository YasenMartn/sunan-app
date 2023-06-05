import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    themeColor: "#8b5cf6",
    fav: [],
  },
  reducers: {
    changeThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    addToFav: (state, action) => {
      state.fav.push(action.payload);
    },
    removeFromFav: (state, action) => {
      const itemId = action.payload;
      state.fav = state.fav.filter(item => item.id !== itemId);
    },
  },
});

export const { changeThemeColor, addToFav, removeFromFav } = appSlice.actions;


export default appSlice.reducer;
