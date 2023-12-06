import { useEffect } from "react";
import { Navbar, AddsSection, PostsSection, SearchBar, UserInfo, CreatePost, FriendList } from "../../components"
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features/posts/postSlice";
import { getCurrentUser } from "../../features/user/userSlice";
import { getLikes, getCurrentUserLikes, toggleCloseCurrentPostLikes } from "../../features/likes/likesSlice";



const SharedLayout = () => {
  const { currentPostLikes, openCurrentPostLikes } = useSelector(
    (store) => store.likes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getCurrentUser());
    dispatch(getLikes());
    dispatch(getCurrentUserLikes());
  }, []);

  return (
    <main
      className="md:w-full md:mx-auto  bg-gray-200 flex flex-col md:absolute md:items-center"
      onClick={() => toggleCloseCurrentPostLikes()}
    >
      {/* likes container */}
      <div className={`"fixed  flex top-[20%]" ${openCurrentPostLikes? "" : "hidden"}`}>
        <div className="bg-cyan-700 text-white max-h-[30rem] overflow-y-auto">
          {/* likes and close button */}
          <div className="flex flex-col items-center border-b border-white px-40 mb-5 pb-2">
            <div className="pt-2 flex items-center justify-between w-full">
              <h1>Likes</h1>
            </div>
          </div>
          {/* userInfo */}
          {currentPostLikes?.map((like) => {
            return (
              <div className="flex justify-between px-5 mb-5" key={like._id}>
                {/* image and name */}
                <div className="flex gap-4 items-center">
                  <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
                    <img
                      src={like.profilePicture}
                      alt="profile picture"
                      className="grow"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <h1>{like.name}</h1>
                  </div>
                </div>
                {/* add friend button */}
                <div className="flex items-center">
                  <button className="rounded-md bg-cyan-400 px-2 py-1">
                    Add Friend
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Search Bar for Desktop */}
      <div className="hidden md:flex bg-white overflow-hidden fixed top-0 w-full">
        <SearchBar />
      </div>
      {/* top div for mobile version */}
      <div className="border-b border-gray-300 p-2 bg-white text-center text-cyan-700 fixed top-0 w-full md:hidden lg:hidden">
        <h1 className="text-xl font-light">Twenty</h1>
      </div>
      {/* container */}
      <div className="flex justify-between overflow-auto grow py-11 md:grid md:grid-cols-12 md:gap-10 md:max-w-3xl md:mx-auto lg:max-w-screen-lg lg:gap-20 xl:max-w-screen-xl md:mt-10">
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
    </main>
  );
}

export default SharedLayout