import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const orderMail = createAsyncThunk("orderMail", async (data) => {
  const response = await fetch(`${API_BASE_URL}/order-mail`, {
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

const orderMailSlice = createSlice({
  name: "orderMail",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderMail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderMailSlice.reducer;
