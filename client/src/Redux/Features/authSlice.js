import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../Services/axiosinstances.js";
import axios from "axios";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (newuser) => {
    try {
      const response = await axiosinstance.post("/api/signup", newuser);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post("/api/login", userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post(
        "/api/logout",

        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,

    authenticate: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.data;
        state.authenticate = true;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.authenticate = false;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
