import { useEffect } from "react";
import { Navbar, AddsSection, PostsSection, SearchBar, UserInfo, CreatePost, FriendList } from "../../components"
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../features/posts/postSlice";
import { getCurrentUser } from "../../features/user/userSlice";



const SharedLayout = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getCurrentUser());
  }, []);

  return (
    <main className="md:w-full md:mx-auto  bg-gray-200 flex flex-col">
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