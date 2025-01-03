import { createSlice } from "@reduxjs/toolkit";

const CategoryFilterSlice = createSlice({
  name: "categoryFilter",
  initialState: {
    value: "",
  },
  reducers: {
    handleCategoryFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { handleCategoryFilter } = CategoryFilterSlice.actions;
export default CategoryFilterSlice.reducer;
