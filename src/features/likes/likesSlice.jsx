import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createLikeThunk, getLikesThunk, getCurrentUserLikesThunk } from "./likesThunk";


const initialState = {
  isLoadingLikes: false,
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
        state.isLoadingLikes = true;
      })
      .addCase(createLike.fulfilled, (state, { payload }) => {
        state.isLoadingLikes = false;
        toast.success = payload.msg;
      })
      .addCase(createLike.rejected, (state, { payload }) => {
        state.isLoadingLikes = false;
        toast.error(payload);
      })
      .addCase(getLikes.pending, (state) => {
        state.isLoadingLikes = true;
      })
      .addCase(getLikes.fulfilled, (state, { payload }) => {
        const { allLikes } = payload;
        state.isLoadingLikes = false;
        state.likes = allLikes;
      })
      .addCase(getLikes.rejected, (state, { payload }) => {
        state.isLoadingLikes = false;
        toast.error(payload);
      })
      .addCase(getCurrentUserLikes.pending, (state) => {
        state.isLoadingLikes = true;
      })
      .addCase(getCurrentUserLikes.fulfilled, (state, { payload }) => {
        const { currentUserLikes } = payload;
        state.isLoadingLikes = false;
        state.currentUserLikes = currentUserLikes;
      })
      .addCase(getCurrentUserLikes.rejected, (state, { payload }) => {
        state.isLoadingLikes = false;
        toast.error(payload);
      });
  },
});

export default likesSlice.reducer;
