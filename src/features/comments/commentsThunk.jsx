import customFetch from "../../utils/axios";
import { getCurrentPostComments, getCurrentUserComments } from "./commentsSlice";

export const createCommentThunk = async (url, commentData, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, commentData);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getCurrentPostCommentsThunk = async (url, postId, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, postId);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}

export const getCurrentUserCommentsThunk = async (url, postId, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, postId);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteCommentThunk = async (url, { id, postId }, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`${url}/${id}`, postId);
    thunkAPI.dispatch(getCurrentUserComments({post: postId}))
    thunkAPI.dispatch(getCurrentPostComments({post: postId}))
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};