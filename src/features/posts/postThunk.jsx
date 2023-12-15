import customFetch from "../../utils/axios";
import { imageFetch } from "../../utils/axios";


export const getAllPostsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const uploadImageThunk = async (url, image, thunkAPI) => {
  try {
    const resp = await imageFetch.post(url, image);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const createPostThunk = async (url, post, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, post);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getCurrentPostThunk = async (url, {id}, thunkAPI) => {
  try {
    const resp = await customFetch.get(`${url}/${id}`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}