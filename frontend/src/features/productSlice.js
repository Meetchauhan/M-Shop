import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const allProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await fetch("http://localhost:8000/api/products");
  const result = await response.json();
  console.log("get all products result", result);

  return result;
});

export const createProducts = createAsyncThunk(
  "products/create",
  async (formData) => {
    const response = await fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: formData,
    });
    try {
      const result = await response.json();
      console.log("created product result", result);
      return result;
    } catch (error) {
      console.error("Error", error);
    }
  }
);
export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  const response = await fetch(
    `http://localhost:8000/api/products/${id && id}`,
    {
      method: "DELETE",
    }
  );
  const result = await response.json();
  console.log("deleted product", result);

  return result;
});

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, productData }) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "PUT",
        body: productData,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error updating product", error);
      throw error;
    }
  }
);

const getProducts = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending, (state) => {
        state.loading = true;
        console.log("state", state.products);
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProducts.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getProducts.reducer;
