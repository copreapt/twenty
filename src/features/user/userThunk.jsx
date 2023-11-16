import customFetch from "../../utils/axios";

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

export const logoutUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.delete(url, user);
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
