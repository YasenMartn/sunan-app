import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    themeColor: {
      background: "#8b5cf6",
      list: "bg-violet-400", // Default color for the list background
    },
    fav: [],
  },
  reducers: {
    changeThemeColor: (state, action) => {
      const { background, list } = action.payload;
      state.themeColor.background = background;
      state.themeColor.list = list;
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
