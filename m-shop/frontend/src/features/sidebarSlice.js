import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    value: false,
  },
  reducers: {
    openSlidebar: (state) => {
      state.value = true;
    },
    closeSidebar: (state) => {
      state.value = false;
    },
  },
});

export const { openSlidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
