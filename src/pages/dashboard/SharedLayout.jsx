import {  useEffect, useState } from "react";
import { Navbar, AddsSection, PostsSection, SearchBar, UserInfo, CreatePost, FriendList, LikesModal, CommentsSection, Loading, SearchUserModal, FriendsModal, SearchUserModalMobile, CommentsSectionMobile, PostImageMobile } from "../../components"
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features/posts/postSlice";
import { getCurrentUser } from "../../features/user/userSlice";
import { getLikes, getCurrentUserLikes } from "../../features/likes/likesSlice";
import { useNavigate } from "react-router";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useLocation } from 'react-router-dom';


const SharedLayout = () => {

  const themeLocalStorage = localStorage.getItem("theme");
  const [theme, setTheme] = useState(themeLocalStorage);
  const { isLoadingPosts } = useSelector((store) => store.posts);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getCurrentUser());
    dispatch(getLikes());
    dispatch(getCurrentUserLikes());
  }, []);

  useBottomScrollListener(
    () => {
      if (isLoadingPosts) return;
      setPage(page + 1);
      dispatch(getAllPosts({ page: page + 1 }));
    },
    { offset: 200 }
  );

  useEffect(() => {
    async function autoLogin() {
      const response = await fetch(
        "/api/v1/auth/autoLogin",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        navigate("/login");
      }
    }
    autoLogin();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.getElementById("darkMode").classList.add("dark");
    } else if (theme === "white") {
      document.getElementById("darkMode").classList.remove("dark");
    }
  }, []);

  // useEffect for when the user leaves the page
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setTheme(theme);
  }, [location]);

  return (
    <main className="bg-gray-200 dark:bg-gray-900 flex flex-col md:items-center overflow-y-auto ease-in-out duration-700">
      <div className="hidden md:flex fixed top-0 left-0 bg-white dark:bg-gray-800 overflow-hidden w-full ease-in-out duration-700">
        <SearchBar />
      </div>
      {/* top div for mobile version */}
      <div className="border-b border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-center text-cyan-700 dark:text-cyan-500 fixed top-0 w-full md:hidden lg:hidden xl:hidden">
        <h1 className="text-xl font-light">Twenty</h1>
      </div>
      {/* container */}
      <div className="max-w-screen-xl flex justify-between overflow-auto grow pt-11 md:mb-10 md:grid md:grid-cols-12 gap-10 px-8 mt-[45px] md:mt-[60px] mb-20">
        {/* user info panel */}
        <div className="hidden md:grid md:col-span-3 h-fit">
          <UserInfo />
        </div>
        {/* Posts section visible for both desktop and mobile */}
        <div className="w-full grow md:col-span-6 space-y-10">
          <CreatePost className="hidden md:grid" />
          <PostsSection />
        </div>
        {/* Adds Section visible only for desktop version */}
        <div className="hidden md:grid col-span-3 h-fit space-y-10">
          <AddsSection />
          <FriendList />
        </div>
      </div>
      {/* Navbar for mobile version */}
      <div className="md:hidden flex items-center py-3 bg-white dark:bg-gray-800 rounded-md justify-center border-t border-gray-300 dark:border-gray-600 fixed bottom-0 w-full">
        <Navbar />
      </div>
      {/* Comment Section */}
      <CommentsSection />
      {/* Search User Modal */}
      <SearchUserModal />
      {/* Likes Modal */}
      <LikesModal />
      {/* Comments Section Modal */}
      <CommentsSectionMobile />
      {/* Friends Modal for Mobile Version */}
      <FriendsModal />
      {/* Search User Modal */}
      <SearchUserModalMobile />
      {/* Post Image Mobile */}
      <PostImageMobile />
    </main>
  );
}

export default SharedLayout