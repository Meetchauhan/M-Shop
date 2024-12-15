import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk("register", async (data) => {
  const response = await fetch("http://localhost:8000/api/user/register", {
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
    console.error("Error", error.message);
  }
});

export const loginUser = createAsyncThunk("login", async (data) => {
  const response = await fetch("http://localhost:8000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  try {
    const result = await response.json();
    console.log("login", result);
    return result;
  } catch (error) {
    console.error("Error", error.message);
  }
});

export const logoutUser = createAsyncThunk("logout", async () => {
  const response = await fetch("http://localhost:8000/api/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    credentials: "include",
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error", error.message);
  }
});

export const getProfile = createAsyncThunk("getProfile", async () => {
  const response = await fetch("http://localhost:8000/api/user/profile", {
    credentials: "include",
  });

  try {
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error", error.message);
  }
});

export const updateProfile = createAsyncThunk("updateProfile", async (data) => {
  const response = await fetch("http://localhost:8000/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  try {
    const result = await response.json();
    console.log("update profile", result);

    return result;
  } catch (error) {
    console.error("Error", error.message);
  }
});

const authUser = createSlice({
  name: "auth",
  initialState: {
    data: [],
    register: [],
    profile: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.action = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("userInfo", JSON.stringify({status : true}));
        localStorage.setItem("cart", JSON.stringify("Cart123*#Item#*"))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        localStorage.removeItem("userInfo");
        localStorage.removeItem("profile");
        localStorage.removeItem("cart")
        state.profile = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.action = action.error.message;
      });
  },
});

export default authUser.reducer;
