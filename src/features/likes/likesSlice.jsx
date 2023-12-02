import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { likePostThunk } from "./likesThunk";


const initialState = {
  isLoading: false,
  likes: null,
};

export const likePost = createAsyncThunk(
  "/likes/likePost",
  async (data, thunkAPI) => {
    return likePostThunk("/likes", data, thunkAPI);
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(likePost.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default likesSlice.reducer;
