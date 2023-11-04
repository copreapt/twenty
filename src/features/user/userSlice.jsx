import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { registerUserThunk } from './userThunk';


const initialState = {
    isLoading: false,
    user: null,
}


export const registerUser = createAsyncThunk('user/registerUser', async(user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
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
    }
})



export default userSlice.reducer;