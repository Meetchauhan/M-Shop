import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const orderStatus = createAsyncThunk(
  "orderStatus",
  async ({orderId, status}) => {
    const data = {
      orderId: orderId,
      status: status,
    };
    const response = await fetch(`${API_BASE_URL}/change-status`, {
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
      console.error("Error in order status", error);
    }
  }
);

const orderStatusSlice = createSlice({
  name: "orderStatus",
  initialState: {
    status: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(orderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderStatusSlice.reducer;
