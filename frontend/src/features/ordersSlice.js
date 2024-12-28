import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const orders = createAsyncThunk(
  "orders",
  async ({
    orderId,
    paymentId,
    signature,
    totalAmount,
    address,
    city,
    state,
    phone,
    pincode,
  }) => {
    const requestBody = {
      paymentId: paymentId,
      orderId: orderId,
      signature: signature,
      totalAmount: totalAmount,
      address: address,
      city: city,
      state: state,
      phone: phone,
      pincode: pincode,
    };
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      credentials: "include",
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error in orders", error);
    }
  }
);

export const allOrders = createAsyncThunk("allOrders", async () => {
  const response = await fetch(`${API_BASE_URL}/all-orders`, {
    credentials: "include",
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in all orders", error);
  }
});

export const adminAllOrders = createAsyncThunk("adminAllOrders", async () => {
  const response = await fetch(`${API_BASE_URL}/admin-orders`, {});
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in admin all orders", error);
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    adminAllOrders: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(orders.pending, (state) => {
        state.loading = true;
      })
      .addCase(orders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(orders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(allOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(adminAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminAllOrders = action.payload;
      })
      .addCase(adminAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
