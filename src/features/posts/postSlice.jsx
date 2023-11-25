import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllPostsThunk,
} from "./postThunk";

const initialState = {
  isLoading:false,
  posts:null,
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async (thunkAPI) => {
    return getAllPostsThunk("/posts", thunkAPI);
  }
);



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
  },
});

export default postsSlice.reducer;