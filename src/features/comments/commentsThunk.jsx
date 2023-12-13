import customFetch from "../../utils/axios";

export const createCommentThunk = async (url, commentData, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, commentData);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};