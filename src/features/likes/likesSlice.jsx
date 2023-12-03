import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createLikeThunk, getLikesThunk, getCurrentUserLikesThunk } from "./likesThunk";


const initialState = {
  isLoading: false,
  likes: null,
  currentUserLikes: null,
};

export const createLike = createAsyncThunk(
  "/likes/createLike",
  async (likeData, thunkAPI) => {
    return createLikeThunk("/likes", likeData, thunkAPI);
  }
);

export const getLikes = createAsyncThunk(
  "/likes/getLikes",
  async (thunkAPI) => {
    return getLikesThunk("/likes", thunkAPI);
  }
);

export const getCurrentUserLikes = createAsyncThunk(
  "/likes/getCurrentUserLikes",
  async (thunkAPI) => {
    return getCurrentUserLikesThunk("/likes/currentUserLikes", thunkAPI);
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLike.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success = payload.msg;
      })
      .addCase(createLike.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLikes.fulfilled, (state, { payload }) => {
        const { allLikes } = payload;
        state.isLoading = false;
        state.likes = allLikes;
      })
      .addCase(getLikes.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getCurrentUserLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserLikes.fulfilled, (state, { payload }) => {
        const { currentUserLikes } = payload;
        state.isLoading = false;
        state.currentUserLikes = currentUserLikes;
      })
      .addCase(getCurrentUserLikes.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default likesSlice.reducer;
