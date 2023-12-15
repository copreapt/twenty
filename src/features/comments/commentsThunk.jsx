import customFetch from "../../utils/axios";

export const createCommentThunk = async (url, commentData, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, commentData);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getCurrentPostCommentsThunk = async (url,thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}