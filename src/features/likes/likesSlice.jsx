import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createLikeThunk, getLikesThunk, getCurrentUserLikesThunk, getCurrentPostLikesThunk } from "./likesThunk";


const initialState = {
  isLoadingLikes: false,
  likes: null,
  currentUserLikes: null,
  currentPostLikes: null,
  openCurrentPostLikes: false,
};

export const createLike = createAsyncThunk("/likes/createLike", async (likeData, thunkAPI) => {
  return createLikeThunk("/likes", likeData, thunkAPI);
});

export const getLikes = createAsyncThunk("/likes/getLikes", async (thunkAPI) => {
  return getLikesThunk("/likes", thunkAPI);
});

export const getCurrentUserLikes = createAsyncThunk("/likes/getCurrentUserLikes", async (thunkAPI) => {
  return getCurrentUserLikesThunk("/likes/currentUserLikes", thunkAPI);
});

export const getCurrentPostLikes = createAsyncThunk("/likes/getCurrentPostLikes", async (postId, thunkAPI) => {
  return getCurrentPostLikesThunk("/likes/currentPostLikes", postId, thunkAPI);
});

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleOpenCurrentPostLikes: (state) => {
      state.openCurrentPostLikes = true;
    },
    toggleCloseCurrentPostLikes: (state) => {
      state.openCurrentPostLikes = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLike.pending, (state) => {
        state.isLoadingLikes = true;
      })
      .addCase(createLike.fulfilled, (state, { payload }) => {
        const {allLikes} = payload;
        state.isLoadingLikes = false;
        state.likes = allLikes;
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
      })
      .addCase(getCurrentPostLikes.pending, (state) => {
        state.isLoadingLikes = true;
      })
      .addCase(getCurrentPostLikes.fulfilled, (state, { payload }) => {
        const { currentPostLikes } = payload;
        state.isLoadingLikes = false;
        state.currentPostLikes = currentPostLikes;
      })
      .addCase(getCurrentPostLikes.rejected, (state, { payload }) => {
        state.isLoadingLikes = false;
        toast.error(payload);
      });
  },
});

export const { toggleOpenCurrentPostLikes, toggleCloseCurrentPostLikes } = likesSlice.actions;
export default likesSlice.reducer;
