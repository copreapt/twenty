import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createCommentThunk, getCurrentPostCommentsThunk, getLastCommentThunk } from "./commentsThunk";

const initialState = {
  isLoadingComments: false,
  comment: null,
  currentPostComments: null,
  openCurrentPostComments: false,
  currentPostId:null,
  creatingComment: true,
  lastComment: null,
};


export const createComment = createAsyncThunk(
  "/comments/createComment",
  async (commentData, thunkAPI) => {
    return createCommentThunk("/comments", commentData, thunkAPI);
  }
);

export const getCurrentPostComments = createAsyncThunk("/comments/getCurrentPostComments", async ( postId, thunkAPI) => {
  return getCurrentPostCommentsThunk("/comments/getCurrentPostComments", postId, thunkAPI);
})

export const getLastComment = createAsyncThunk("/comments/getLastComment", async (postId, thunkAPI) => {
  return getLastCommentThunk("/comments/getLastComment", postId, thunkAPI);
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    toggleOpenCurrentPostComments: (state) => {
      state.openCurrentPostComments = true;
    },
    toggleCloseCurrentPostComments: (state) => {
      state.openCurrentPostComments = false;
    },
    setCurrentPostId : (state, id) => {
        state.currentPostId = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoadingComments = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.isLoadingComments = false;
        state.creatingComment = false;
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.isLoadingComments = false;
        state.creatingComment = false;
        toast.error(payload);
      })
      .addCase(getCurrentPostComments.pending, (state) => {
        state.isLoadingComments = true;
      })
      .addCase(getCurrentPostComments.fulfilled, (state, { payload }) => {
        const { comments } = payload;
        state.isLoadingComments = false;
        state.creatingComment = true;
        state.currentPostComments = comments;
      })
      .addCase(getCurrentPostComments.rejected, (state, { payload }) => {
        state.isLoadingComments = false;
        toast.error(payload);
      })
      .addCase(getLastComment.pending, (state) => {
        state.isLoadingComments = true;
      })
      .addCase(getLastComment.fulfilled, (state, { payload }) => {
        const { lastComment } = payload;
        state.isLoadingComments = false;
        state.lastComment = lastComment;
      })
      .addCase(getLastComment.rejected, (state, { payload }) => {
        state.isLoadingComments = false;
        toast.error(payload);
      });
  },
});

export const { toggleOpenCurrentPostComments, toggleCloseCurrentPostComments, setCurrentPostId } =
  commentsSlice.actions;
export default commentsSlice.reducer;
