import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoadingLikes: false,
  comment: null,
  currentPostComments: null,
  openCurrentPostComments: false,
};



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
  },
});

export const { toggleOpenCurrentPostComments, toggleCloseCurrentPostComments } =
  commentsSlice.actions;
export default commentsSlice.reducer;
