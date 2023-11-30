import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { registerUserThunk, loginUserThunk, updateUserPasswordThunk, verifyUserEmailThunk, logoutUserThunk, forgotUserPasswordThunk, resetUserPasswordThunk} from './userThunk';


const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  userFromLocalStorage:null,
  user: null,
  error: "",
  formSubmitted: false,
  openModal:false,
};


export const registerUser = createAsyncThunk('user/registerUser', async(user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
});

export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
        return loginUserThunk('/auth/login', user, thunkAPI)
    }
);

export const updateUserPassword = createAsyncThunk("user/updateUserPassword", async(user, thunkAPI) => {
    return updateUserPasswordThunk('/users/updateUserPassword', user, thunkAPI)
});

export const verifyEmail = createAsyncThunk('/user/verify-email', async(user, thunkAPI) => {
    return verifyUserEmailThunk('/auth/verify-email', user, thunkAPI)
});

export const logoutUser = createAsyncThunk('/user/logout', async(thunkAPI) => {
    return logoutUserThunk('/auth/logout', thunkAPI)
});

export const forgotPassword = createAsyncThunk('/user/forgotPassword', async (user, thunkAPI) => {
    return forgotUserPasswordThunk('/auth/forgot-password', user, thunkAPI)
});

export const resetPassword = createAsyncThunk('/user/resetPassword', async (user, thunkAPI) => {
    return resetUserPasswordThunk('auth/reset-password', user, thunkAPI)
});


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleSidebar: (state)  => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        toggleOpenModal: (state) => {
            state.openModal = !state.openModal;
        },
        setUserLocalStorage: (user) => {
            const previousData = localStorage.getItem("userData");
            if (previousData) {
                localStorage.removeItem("userData");
            }
            localStorage.setItem("userData", JSON.stringify(user));
        },
        getUserLocalStorage: (state) => {
            state.userFromLocalStorage = localStorage.getItem("userData");
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.formSubmitted = true;
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
            toast.success(`Hello ${user?.fullName}`);
        })
        .addCase(loginUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(updateUserPassword.fulfilled, (state, {payload}) => {
            const { msg } = payload;
            toast.success(msg);
        })
        .addCase(verifyEmail.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(verifyEmail.fulfilled, (state, {payload}) => {
            const {msg} = payload;
            state.isLoading = false;
            toast.success(msg);
        })
        .addCase(verifyEmail.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
            toast.error(payload);
        })
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state, {payload}) => {
            const {msg} = payload;
            state.isLoading = false;
            state.user = null;
            toast.success(msg)
        })
        .addCase(logoutUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(forgotPassword.fulfilled , (state) => {
            state.isLoading = false;
            state.formSubmitted = true;
        })
        .addCase(forgotPassword.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
        })
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.formSubmitted = true;
            toast.success(payload.msg);
        })
        .addCase(resetPassword.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload.msg);
        })
    },
})


export const { toggleSidebar, toggleOpenModal, setUserLocalStorage, getUserLocalStorage } = userSlice.actions;
export default userSlice.reducer;