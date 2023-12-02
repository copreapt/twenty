import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createLikeThunk } from "./likesThunk";


const initialState = {
  isLoading: false,
  likes: null,
};

export const createLike = createAsyncThunk(
  "/likes/createLike",
  async (likeData, thunkAPI) => {
    return createLikeThunk("/likes", likeData, thunkAPI);
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
      .addCase(createLike.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createLike.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default likesSlice.reducer;
