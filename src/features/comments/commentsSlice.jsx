import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createCommentThunk, deleteCommentThunk, getCurrentPostCommentsThunk, getCurrentUserCommentsThunk } from "./commentsThunk";

const initialState = {
  isLoadingComments: false,
  comment: null,
  currentPostComments: null,
  openCurrentPostComments: false,
  currentPostId:null,
  currentUserComments: null,
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

export const getCurrentUserComments = createAsyncThunk("/comments/getCurrentUserComments", async(postId, thunkAPI) => {
  return getCurrentUserCommentsThunk("/comments/getCurrentUserComments", postId, thunkAPI);
})

export const deleteComment = createAsyncThunk("/comments/deleteComment", async (thunkAPI) => {
  return deleteCommentThunk("/comments", thunkAPI);
})

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
      .addCase(createComment.fulfilled, (state, {payload}) => {
        const {allComments, currentUserCommentsToCurrentPost} = payload;
        state.isLoadingComments = false;
        state.currentPostComments = allComments;
        state.currentUserComments = currentUserCommentsToCurrentPost;
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.isLoadingComments = false;
        toast.error(payload);
      })
      .addCase(getCurrentPostComments.pending, (state) => {
        state.isLoadingComments = true;
      })
      .addCase(getCurrentPostComments.fulfilled, (state, { payload }) => {
        const { comments } = payload;
        state.isLoadingComments = false;
        state.currentPostComments = comments;
      })
      .addCase(getCurrentPostComments.rejected, (state, { payload }) => {
        state.isLoadingComments = false;
        toast.error(payload);
      })
      .addCase(getCurrentUserComments.pending, (state) => {
        state.isLoadingComments = true;
      })
      .addCase(getCurrentUserComments.fulfilled, (state, {payload}) => {
        const {currentUserComments} = payload;
        state.isLoadingComments = false;
        state.currentUserComments = currentUserComments;
      })
      .addCase(getCurrentUserComments.rejected, (state, {payload}) => {
        state.isLoadingComments = false;
        toast.error(payload);
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoadingComments = true;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.isLoadingComments = false;
      })
      .addCase(deleteComment.rejected, (state, {payload}) => {
        state.isLoadingComments = false;
        toast.error(payload);
      });
  },
});

export const { toggleOpenCurrentPostComments, toggleCloseCurrentPostComments, setCurrentPostId } =
  commentsSlice.actions;
export default commentsSlice.reducer;
