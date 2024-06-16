import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import postsSlice from "./features/posts/postSlice";
import likesSlice from "./features/likes/likesSlice";
import commentsSlice from "./features/comments/commentsSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        posts: postsSlice,
        likes: likesSlice,
        comments: commentsSlice,
    }
});

