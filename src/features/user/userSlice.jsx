import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { registerUserThunk, loginUserThunk, updateUserPasswordThunk } from './userThunk';


const initialState = {
    isLoading: false,
    user: null,
}


export const registerUser = createAsyncThunk('user/registerUser', async(user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
});

export const loginUser = createAsyncThunk(
    "user/loginUser", async (user, thunkAPI) => {
        return loginUserThunk('/auth/login', user, thunkAPI)
    }
);

export const updateUserPassword = createAsyncThunk("user/updateUserPassword", async(user, thunkAPI) => {
    return updateUserPasswordThunk('/users/updateUserPassword', user, thunkAPI)
});



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, {payload}) => {
            const user = {payload};
            state.isLoading = false;
            state.user = user;
            toast.success(`Hello there ${user.fullName}`);
        })
        .addCase(registerUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            toast.success(`Hello ${user.fullName}`)
        })
        .addCase(loginUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(updateUserPassword.fulfilled, (state, {payload}) => {
            const { msg } = payload;
            toast.success(msg);
        })
    },
})



export default userSlice.reducer;