import React, {useEffect} from 'react'
import { CommentsSection, SearchBar } from '../components';
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleOpenCurrentPostComments,
  setCurrentPostId,
  getCurrentPostComments,
  getCurrentUserComments,
} from "../features/comments/commentsSlice";
import { getCurrentPost } from "../features/posts/postSlice";
import { addFriend } from '../features/user/userSlice';
import { useNavigate } from 'react-router';

const SingleUser = () => {

  const {singleUser, singleUserPosts, currentUser} = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openCommentsModal = (id) => {
    dispatch(setCurrentPostId(id));
    dispatch(getCurrentPost({ id: id }));
    dispatch(getCurrentPostComments({ post: id }));
    dispatch(getCurrentUserComments({ post: id }));
    dispatch(toggleOpenCurrentPostComments());
  };

  useEffect(() => {
    async function autoLogin() {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/autoLogin",
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
    <div className="md:w-full md:mx-auto h-screen bg-gray-200 flex flex-col absolute items-center overflow-y-auto">
      {/* comments section */}
      <CommentsSection />
      {/* navbar div */}
      <div className="hidden md:flex bg-white overflow-hidden fixed top-0 z-0 w-full">
        <SearchBar />
      </div>
      {/* container */}
      <div className="flex flex-col py-12 md:max-w-3xl md:mx-auto lg:max-w-screen-lg lg:gap-20 xl:max-w-screen-lg md:mt-10">
        {/* top div container - image and details about user and friends */}
        <div className="flex flex-col mx-auto items-center">
          {/* image and details */}
          <div className="flex gap-40 mb-20">
            {/* image */}
            <div className="flex justify-center items-center h-[200px] w-[200px] rounded-full overflow-hidden border-4 border-white cursor-pointer shadow-lg shadow-gray-500">
              <img
                src={singleUser?.profilePicture}
                alt="person image"
                className="flex shrink-0 min-h-full min-w-full"
              />
            </div>
            {/* details */}
            <div className="space-y-10 overflow-hidden max-w-[300px] break-words">
              {/* name and add friend button */}
              <div className="flex items-center gap-20 text-cyan-800 text-lg justify-between">
                <span>{singleUser?.fullName}</span>
                {singleUser?._id === currentUser?._id ? (
                  ""
                ) : currentUser?.friends?.some(
                    (item) => item.friendId === singleUser?._id
                  ) ? (
                  ""
                ) : (
                  <HiOutlineUserAdd
                    className="cursor-pointer text-xl text-cyan-800"
                    onClick={(e) =>
                      dispatch(
                        addFriend({
                          fullName: singleUser?.fullName,
                          profilePicture: singleUser?.profilePicture,
                          friendId: singleUser?._id,
                        })
                      )
                    }
                  />
                )}
              </div>
              {/* job */}
              {singleUser?.job ? (
                <div className="text-cyan-800 text-lg">
                  <span>{singleUser.job}</span>
                </div>
              ) : (
                ""
              )}
              {/* links */}
              {singleUser?.facebook ||
              singleUser?.instagram ||
              singleUser?.twitter ? (
                <div className="text-black space-y-3">
                  <span className="font-semibold">Socials bellow</span>
                  <div className="flex items-center gap-5 text-xl">
                    {singleUser?.facebook && (
                      <a
                        href={singleUser?.facebook}
                        target="_blank"
                        no-referrer="true"
                      >
                        <FaFacebookF className="cursor-pointer" />
                      </a>
                    )}
                    {singleUser?.instagram && (
                      <a
                        href={singleUser?.instagram}
                        target="_blank"
                        no-referrer="true"
                      >
                        <AiFillInstagram className="cursor-pointer" />
                      </a>
                    )}
                    {singleUser?.twitter && (
                      <a
                        href={singleUser?.twitter}
                        target="_blank"
                        no-referrer="true"
                      >
                        <FaXTwitter className="cursor-pointer" />
                      </a>
                    )}
                    {!currentUser?.facebook &&
                      !currentUser?.instagram &&
                      !currentUser?.twitter &&
                      ""}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* bottom div - user posts */}
        <div className="grid grid-cols-3 gap-4 pt-20 border-t-4 border-white">
          {singleUserPosts?.map((post) => {
            const { _id, image } = post;
            return (
              <div
                key={_id}
                className="flex justify-center items-center h-[50] w-[50] cursor-pointer shadow-md shadow-gray-500 hover:scale-105 ease-in-out duration-700 hover:shadow-lg"
                onClick={(e) => openCommentsModal(_id)}
              >
                <img src={image} alt="person image" className="grow" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SingleUser