import customFetch from "../../utils/axios";

export const likePostThunk = async (url, data, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
