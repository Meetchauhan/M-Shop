import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const createOrder = createAsyncThunk(
  "createOrder",
  async ({ amount, currency, receipt }) => {
    const data = {
      amount: amount,
      currency: currency,
      receipt: receipt,
    };
    const response = await fetch(`${API_BASE_URL}/create-order`, {
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
      console.error("Error in create order", error);
    }
  }
);

const payment = createSlice({
  name: "payment",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default payment.reducer;
