import {  useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Navbar, AddsSection, PostsSection, SearchBar, UserInfo, CreatePost, FriendList } from "../../components"
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, removeCurrentPostFromState } from "../../features/posts/postSlice";
import { getCurrentUser } from "../../features/user/userSlice";
import { getLikes, getCurrentUserLikes, toggleCloseCurrentPostLikes } from "../../features/likes/likesSlice";
import { createComment, toggleCloseCurrentPostComments, deleteComment } from "../../features/comments/commentsSlice";


const SharedLayout = () => {

  const [values, setValues] = useState({
    comment: "",
  });
  const { currentUser } = useSelector((store) => store.user);
  const { currentPostId, currentPostComments, currentUserComments } = useSelector((store) => store.comments);
  const {currentPost, isLoading} = useSelector((store) => store.posts);
  const { currentPostLikes, openCurrentPostLikes } = useSelector(
    (store) => store.likes
  );
  const {openCurrentPostComments} = useSelector((store) => store.comments);
  const dispatch = useDispatch();

  const storeMessageInState = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
        dispatch(
          createComment({
            name: currentUser?.fullName,
            profilePicture: currentUser?.profilePicture,
            comment: values?.comment,
            post: currentPostId?.payload,
          })
        );
        setValues({comment: ""});
  }
  
  const toggle = () => {
    dispatch(toggleCloseCurrentPostLikes())
  }

  const toggleComments = () => {
    dispatch(toggleCloseCurrentPostComments());
    dispatch(removeCurrentPostFromState());
  }



  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getCurrentUser());
    dispatch(getLikes());
    dispatch(getCurrentUserLikes());
  }, []);

  return (
    <main className="md:w-full md:mx-auto  bg-gray-200 flex flex-col md:absolute md:items-center">
      {/* likes container */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/80 justify-center items-center z-20 ease-in-out duration-700 ${
          openCurrentPostLikes ? "flex" : "hidden"
        }`}
      >
        <div className="bg-cyan-700 text-white max-h-[30rem] overflow-y-auto rounded-md">
          {/* likes and close button */}
          <div className="text-center border-b border-white mb-5 pb-2 relative p-2 pt-4">
            <IoClose
              className="text-2xl absolute right-2 top-2 hover:cursor-pointer"
              onClick={toggle}
            />
            <h1>Likes</h1>
          </div>
          {/* userInfo */}
          {currentPostLikes?.map((like) => {
            return (
              <div
                className="flex justify-between gap-20 px-2 mb-5"
                key={like._id}
              >
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
      {/* comments section modal */}
      <div
        className={`fixed top-0 left-0 w-full h-full  bg-black/80  items-center z-20 ${
          openCurrentPostComments ? "flex" : "hidden"
        } `}
      >
        {/* container */}
        <div className="grid grid-cols-12 p-20 max-w-screen-xl mx-auto">
          {/* image div */}
          <div className="col-span-7 flex items-center justify-center bg-black">
            <img
              src={currentPost?.image}
              alt="user image"
              className="w-full"
            />
          </div>
          {/* comments section div */}
          <div className="col-span-5 p-5 bg-gray-200 ">
            {/* container */}
            <div className="flex flex-col relative">
              {/* current user profile picture and name */}
              <div className="border-b border-black mt-10 pb-5 flex items-center gap-3 flex-none">
                <IoClose
                  className="text-2xl absolute right-2 top-2 cursor-pointer"
                  onClick={toggleComments}
                />
                <div className="rounded-full justify-center overflow-hidden w-[40px] h-[40px] flex items-center">
                  <img
                    src={currentUser?.profilePicture}
                    alt="image"
                    className="grow"
                  />
                </div>
                <div>
                  <h1 className="text-md font-extra-light">{currentUser?.fullName}</h1>
                </div>
              </div>
              {/* comments section */}
              <div className="grow my-5 overflow-y-auto p-2 space-y-3 h-[400px] max-h-[400px]">
                {/* container */}
                <div className="flex gap-5 items-baseline flex-col-reverse">
                  {/* user div */}
                  {currentPostComments?.map((comment) => {
                    return (
                      <div
                        className="flex items-center justify-between relative w-full"
                        key={comment._id}
                      >
                        {/* image and comment */}
                        <div className="flex items-center gap-2">
                          {/* img */}
                          <div className="flex items-center justify-center overflow-hidden rounded-full w-[40px] h-[40px] flex-none">
                            <img
                              src={comment.profilePicture}
                              alt="image"
                              className="grow"
                            />
                          </div>
                          {/* name and comment */}
                          <div className="text-sm">
                            <span className="font-extra-light text-cyan-700 mr-2">
                              {comment.name}
                            </span>
                            <span className="text-[0.90rem] text-gray-700 break-all">
                              {comment.comment}
                            </span>
                          </div>
                        </div>
                        {/* delete button */}
                        {currentUserComments?.map((item) => {
                          if (item._id === comment._id) {
                            return (
                              <div
                                className="flex items-center text-md text-black absolute right-2 cursor-pointer"
                                onClick={(e) =>
                                  dispatch(deleteComment({ id: comment._id, post: currentPostId?.payload }))
                                }
                              >
                                <span>
                                  <MdDelete />
                                </span>
                              </div>
                            );
                          }
                          return;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* input div */}
              <form className="mb-5 flex-none border-t border-black pt-3 flex gap-2 items-center" action="submit" onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  name="comment"
                  value={values.comment}
                  onChange={storeMessageInState}
                  className="flex grow p-2 focus:shadow-none focus:border-black focus:outline-none focus:ring-transparent placeholder:text-black bg-gray-200"
                  placeholder="Add a comment..."
                />
                <button type="submit" className="flex text-cyan-700">Post</button>
              </form>
            </div>
          </div>
          {/* end of comments section div */}
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