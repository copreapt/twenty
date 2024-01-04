import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllPostsThunk,
  uploadImageThunk,
  createPostThunk,
  getCurrentPostThunk,
} from "./postThunk";

const initialState = {
  isLoadingPosts:false,
  isLoadingPostsImage:false,
  posts:[],
  currentUser:null,
  currentPost: null,
  postImage: "",
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async (params, thunkAPI) => {
  return getAllPostsThunk("/posts/getAllPosts", params, thunkAPI);
});

export const uploadImage = createAsyncThunk("/posts/uploadImage", async (image, thunkAPI) => {
  return uploadImageThunk("/posts/uploadImage", image, thunkAPI);
});

export const createPost = createAsyncThunk("/posts/createPost", async (post, thunkAPI) => {
  return createPostThunk("/posts", post, thunkAPI);
});

export const getCurrentPost = createAsyncThunk("/posts/getCurrentPost", async (thunkAPI) => {
  return getCurrentPostThunk("/posts", thunkAPI);
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removeCurrentPostFromState: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoadingPosts = true;
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        const { posts } = payload;
        state.isLoadingPosts = false;
        if(!posts){
          return;
        }
        state.posts = [...state.posts, ...posts];
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
        state.isLoadingPosts = false;
        toast.error(payload);
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoadingPostsImage = true;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        const { image } = payload;
        state.isLoadingPostsImage = false;
        state.postImage = image?.src;
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.isLoadingPosts = false;
        toast.error(payload);
      })
      .addCase(createPost.pending, (state) => {
        state.isLoadingPosts = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoadingPosts = false;
        state.postImage = "";
        toast.success("Post Created");
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.isLoadingPosts = false;
        toast.error(payload);
      })
      .addCase(getCurrentPost.pending, (state) => {
        state.isLoadingPosts = true;
      })
      .addCase(getCurrentPost.fulfilled, (state, { payload }) => {
        const { post } = payload;
        state.isLoadingPosts = false;
        state.currentPost = post;
      })
      .addCase(getCurrentPost.rejected, (state, { payload }) => {
        state.isLoadingPosts = false;
        toast.error(payload);
      });
  },
});

export const { removeCurrentPostFromState } =
  postsSlice.actions;
export default postsSlice.reducer;