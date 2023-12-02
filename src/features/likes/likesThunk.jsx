import customFetch from "../../utils/axios";

export const likePostThunk = async (url, likeData, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, likeData);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
