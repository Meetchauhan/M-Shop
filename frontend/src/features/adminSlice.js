import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerAdmin = createAsyncThunk("adminRegister", async (data) => {
  const response = await fetch("http://localhost:8000/api/admin/register", {
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

export const loginAdmin = createAsyncThunk("adminLogin", async (data) => {
  const response = await fetch("http://localhost:8000/api/admin/login", {
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

export const logoutAdmin = createAsyncThunk("adminLogout", async () => {
  const response = await fetch("http://localhost:8000/api/admin/logout", {
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

export const getAdminProfile = createAsyncThunk("adminProfile", async () => {
  const response = await fetch("http://localhost:8000/api/admin/profile", {
    credentials: "include",
  });

  try {
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error", error.message);
  }
});

const authAdmin = createSlice({
  name: "admin",
  initialState: {
    register: [],
    login: [],
    profile:[],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        localStorage.setItem("adminInfo", JSON.stringify(action.payload));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        localStorage.removeItem("adminInfo");
        localStorage.removeItem("adminProfile");
        state.profile = [];
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem("adminProfile", JSON.stringify(action.payload));
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authAdmin.reducer;
