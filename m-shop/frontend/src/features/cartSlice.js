import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const addToCart = createAsyncThunk("addToCart", async (data) => {
  const response = await fetch(`${API_BASE_URL}/cart/addToCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in adding cart", error);
  }
});

export const fetchProduct = createAsyncThunk("fetchProducts", async () => {
  const response = await fetch(
    `${API_BASE_URL}/cart/cart-products`,
    {
      credentials: "include",
    }
  );
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error to get products from cart", error);
  }
});

export const reduceProduct = createAsyncThunk("reduceProduct", async (data) => {
  const response = await fetch(
    `${API_BASE_URL}/cart/decreaseProduct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );
  try {
    const result = await response.json();
    console.log("reduce product", result);
    return result;
  } catch (error) {
    console.error("Error in reduce product from cart", error);
  }
});

export const increaseProduct = createAsyncThunk(
  "increaseProduct",
  async (data) => {
    const response = await fetch(
      `${API_BASE_URL}/cart/increaseProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    try {
      const result = await response.json();
      console.log("reduce product", result);
      return result;
    } catch (error) {
      console.error("Error in reduce product from cart", error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async (data) => {
    const response = await fetch(
      `${API_BASE_URL}/cart/removeCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in remove cart", error);
    }
  }
);

export const totalAmount = createAsyncThunk("totalAmount", async () => {
  const response = await fetch(
    `${API_BASE_URL}/totalAmount`,
    {
      credentials: "include",
    }
  );
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error in total amount", error);
  }
});

// export const emptyCart = createAsyncThunk("logout", async () => {
//   const response = await fetch(`${API_BASE_URL}/user/logout", {
//     method: "POST",
//     headers: {
//       "Content-Type": "Application/json",
//     },
//     credentials: "include",
//   });
//   try {
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error", error.message);
//   }
// });

const cartProduct = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(reduceProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(reduceProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(reduceProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(increaseProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(increaseProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(totalAmount.pending, (state) => {
        state.loading = true;
      })
      .addCase(totalAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload;
      })
      .addCase(totalAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // .addCase(emptyCart.fulfilled, (state) => {
    //   state.cart = [];
    // });
  },
});

export default cartProduct.reducer;
