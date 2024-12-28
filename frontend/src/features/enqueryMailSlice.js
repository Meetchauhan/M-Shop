import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const enqueryMail = createAsyncThunk("enqueryMail", async (data) => {
  const response = await fetch(`${API_BASE_URL}/send-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in send enquery mail", error);
  }
});

const enqueryMailSlice = createSlice({
  name: "enqueryMail",
  initialState: {
    enquery: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(enqueryMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(enqueryMail.fulfilled, (state, action) => {
        state.loading = false;
        state.enquery = action.payload;
      })
      .addCase(enqueryMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default enqueryMailSlice.reducer;
