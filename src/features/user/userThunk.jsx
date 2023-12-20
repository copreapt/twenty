import customFetch from "../../utils/axios";
import { toggleLogout } from "./userSlice";

export const registerUserThunk = async(url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}


export const loginUserThunk = async (url,user,thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const updateUserPasswordThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const verifyUserEmailThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user );
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const logoutUserThunk = async (url, thunkAPI) => {
    try {
        const resp = await customFetch.delete(url);
        thunkAPI.dispatch(toggleLogout());
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}


export const forgotUserPasswordThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url,user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);        
    }
}

export const resetUserPasswordThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const getCurrentUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
