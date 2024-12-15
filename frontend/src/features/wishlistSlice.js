import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addToWishlist = createAsyncThunk("addToWishlist", async (data) => {
  const response = await fetch(
    "http://localhost:8000/api/wishlist/addToWishlist",
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
    console.log("wishlist result", result);
    
    return result;
  } catch (error) {
    console.log("Error in add to wishlist", error);
  }
});

export const removeWishlist = createAsyncThunk(
  "removeWishlist",
  async (data) => {
    const response = await fetch(
      "http://localhost:8000/api/wishlist/removeWishlist",
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
      console.log("Error in remove from wishlist", error);
    }
  }
);

export const getWishlistItem = createAsyncThunk("getWishlist", async () => {
  const response = await fetch(
    "http://localhost:8000/api/wishlist/wishlistProducts",
    {
        credentials: "include",
    }
  );
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error in get wishlist items", error);
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getWishlistItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(getWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default wishlistSlice.reducer;
