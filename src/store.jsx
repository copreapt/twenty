import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import postsSlice from "./features/posts/postSlice";
import likesSlice from "./features/likes/likesSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        posts: postsSlice,
        likes: likesSlice,
    }
})