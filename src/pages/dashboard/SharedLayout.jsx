import {  useEffect, useState } from "react";
import { Navbar, AddsSection, PostsSection, SearchBar, UserInfo, CreatePost, FriendList, LikesModal, CommentsSection, Loading, SearchUserModal } from "../../components"
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features/posts/postSlice";
import { getCurrentUser } from "../../features/user/userSlice";
import { getLikes, getCurrentUserLikes } from "../../features/likes/likesSlice";
import { useNavigate } from "react-router";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';


const SharedLayout = () => {

  const { isLoadingPosts } = useSelector((store) => store.posts);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getCurrentUser());
    dispatch(getLikes());
    dispatch(getCurrentUserLikes());
  }, []);

  useBottomScrollListener(() => {
    if (isLoadingPosts) return;

    setPage(page + 1)

    dispatch(getAllPosts({ page: page + 1 }))
  }, { offset: 200 });

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

  return (
    <main className="bg-gray-200 flex flex-col md:items-center overflow-y-auto">
      <div className="hidden md:flex fixed top-0 left-0 bg-white overflow-hidden w-full">
        <SearchBar />
      </div>
      {/* top div for mobile version */}
      <div className="border-b border-gray-300 p-2 bg-white text-center text-cyan-700 fixed top-0 w-full md:hidden lg:hidden xl:hidden">
        <h1 className="text-xl font-light">Twenty</h1>
      </div>
      {/* container */}
      <div
        className="max-w-screen-xl flex justify-between overflow-auto grow pt-11 md:mb-10 md:grid md:grid-cols-12 gap-10 px-8 mt-[45px] md:mt-[60px]"
      >
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
      <div className="md:hidden flex items-center py-3 bg-white rounded-md shadow-sm shadow-white justify-center border-t border-gray-300 fixed bottom-0 w-full">
        <Navbar />
      </div> 
      {/* search user modal */}
      <SearchUserModal />
      {/* likes modal */}
      <LikesModal />
      {/* comments section modal */}
      <CommentsSection />
      {/* Search Bar for Desktop */}
    </main>
  );
}

export default SharedLayout