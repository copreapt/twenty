import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllPostsThunk,
  uploadImageThunk,
  createPostThunk
} from "./postThunk";

const initialState = {
  isLoading:false,
  posts:null,
  postImage:'',
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async (thunkAPI) => {
    return getAllPostsThunk("/posts", thunkAPI);
  }
);

export const uploadImage = createAsyncThunk(
  "posts/uploadImage",
  async (image, thunkAPI) => {
    return uploadImageThunk("/posts/uploadImage", image, thunkAPI);
  }
);

export const createPost = createAsyncThunk("/posts/createPost", async (post, thunkAPI) => {
  return createPostThunk("/posts", post, thunkAPI);
})


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.posts = payload.posts;
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, {payload}) => {
        const {image} = payload
        state.isLoading = false;
        state.postImage = image?.src;
      })
      .addCase(uploadImage.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
        state.postImage = '';
        toast.success('Post Created');
      })
      .addCase(createPost.rejected, (state, {payload}) => {
        state.isLoading = false;
        toast.error(payload);
      })
  },
});

export default postsSlice.reducer;