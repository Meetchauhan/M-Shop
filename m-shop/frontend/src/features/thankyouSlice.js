import { createSlice } from "@reduxjs/toolkit";

const thankyouSlice = createSlice({
  name: "thankyou",
  initialState: {
    order: [],
  },
  reducers: {
    recentOrders: (state, action) => {
      state.order = action.payload;
    },
  },
});
export const { recentOrders } = thankyouSlice.actions;
export default thankyouSlice.reducer;
