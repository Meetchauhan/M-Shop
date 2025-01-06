import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const registrationMail = createAsyncThunk("orderMail", async (data) => {
  const response = await fetch(`${API_BASE_URL}/registration-mail`, {
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
    console.error("Error in send Ordermail", error);
  }
});

const registrationMailSlice = createSlice({
  name: "orderMail",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(registrationMail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registrationMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registrationMailSlice.reducer;
