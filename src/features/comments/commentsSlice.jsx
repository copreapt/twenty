import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createCommentThunk, getCurrentPostCommentsThunk } from "./commentsThunk";

const initialState = {
  isLoadingComments: false,
  comment: null,
  currentPostComments: null,
  openCurrentPostComments: false,
  currentPostId:null,
};


export const createComment = createAsyncThunk(
  "/comments/createComment",
  async (commentData, thunkAPI) => {
    return createCommentThunk("/comments", commentData, thunkAPI);
  }
);

export const getCurrentPostComments = createAsyncThunk("/comments/getCurrentPostComments", async ( postId, thunkAPI) => {
  return getCurrentPostCommentsThunk("/comments", postId, thunkAPI);
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
      .addCase(createComment.fulfilled, (state) => {
        state.isLoadingComments = false;
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.isLoadingComments = false;
        toast.error(payload);
      })
      .addCase(getCurrentPostComments.pending, (state) => {
        state.isLoadingComments = true;
      })
      .addCase(getCurrentPostComments.fulfilled, (state, {payload}) => {
        const {comments} = payload;
        state.isLoadingComments = false;
        state.currentPostComments = comments;
      })
      .addCase(getCurrentPostComments.rejected, (state, {payload}) => {
        state.isLoadingComments = false;
        toast.error(payload);
      })
  },
});

export const { toggleOpenCurrentPostComments, toggleCloseCurrentPostComments, setCurrentPostId } =
  commentsSlice.actions;
export default commentsSlice.reducer;
