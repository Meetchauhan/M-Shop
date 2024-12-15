import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUser = createAsyncThunk("allUsers", async () => {
  const response = await fetch("http://localhost:8000/api/user/getUser");
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error in get all user", error);
  }
});

export const updateUserByAdmin = createAsyncThunk(
  "updateUserByAdmin",
  async ({ id, userData }) => {
    const response = await fetch(
      `http://localhost:8000/api/user/updateUser/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in update user by admin", error);
    }
  }
);

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const response = await fetch(
    `http://localhost:8000/api/user/deleteUser/${id}`,
    {
      method: "DELETE",
      // headers:{
      //   "Content-Type": "application/json"
      // }
    }
  );
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in delete user", error);
  }
});

const userSlice = createSlice({
  name: "allUser",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserByAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default userSlice.reducer;
