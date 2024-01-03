import customFetch from "../../utils/axios";
import { imageFetch } from "../../utils/axios";

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

export const getSingleUserThunk = async(url, {id}, thunkAPI) => {
    try {
        const resp =  await customFetch.get(`${url}/${id}`);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const updateUserThunk = async(url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const uploadImageThunk = async (url, image, thunkAPI) => {
    try {
        const resp = await imageFetch.post(url, image);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

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

export const addFriendThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

export const persistentLoginThunk = async (url, thunkAPI) => {
    try {
        const resp = await customFetch.get(url);
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const searchUsersThunk = async (url, {search}, thunkAPI) => {
    try {
        const resp = await customFetch.get(`${url}?search=${search}`)
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}
