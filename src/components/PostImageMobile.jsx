import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoClose } from 'react-icons/io5';
import { closePostImage } from '../features/posts/postSlice';

const PostImageMobile = () => {

    const { openPostImage, currentPost } = useSelector((store) => store.posts);
    const dispatch = useDispatch();

    const closePost = () => {
        dispatch(closePostImage());
    };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex-col  bg-black/80  items-center justify-center z-20 md:hidden ${
        openPostImage ? "flex" : "hidden"
      } `}
    >
      <div
        className="border-b border-black mt-10 pb-5 flex items-center gap-3
      flex-none"
      >
        <IoClose
          className="text-4xl text-white absolute right-5 top-5 cursor-pointer"
          onClick={closePost}
        />
      </div>
      <div className="flex flex-col items-center justify-center mx-5 bg-black h-[500px] overflow-hidden mb-10">
        {/* image div */}
        <div className="flex items-center justify-center">
          <img
            src={currentPost?.image}
            alt="user image"
            className="flex shrink-0 min-h-full min-w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default PostImageMobile