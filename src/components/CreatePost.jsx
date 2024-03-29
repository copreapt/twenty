import React, { useState } from 'react'
import { createPostLinks } from '../utils/utils';
import {useSelector, useDispatch} from "react-redux";
import { uploadImage, createPost } from '../features/posts/postSlice';
import Loading from './Loading';
import { toast } from 'react-toastify';


const initialState = {
  description: '',
}

function CreatePost() {

  const [values, setValues] = useState(initialState);
  const {currentUser} = useSelector((store) => store.user);
  const {postImage, isLoadingPostsImage} = useSelector((store) => store.posts);
  const dispatch = useDispatch()

  const selectAndUploadImage = (e) => {
    const imageFile = e.target.files[0];
    if(imageFile){
      dispatch(uploadImage({image: imageFile}))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {description} = values
    if(!description && !postImage){
      return toast.error('Unable to submit a blank Post');
    }
    dispatch(createPost({description, image:postImage, profilePicture: currentUser.profilePicture,name: currentUser.fullName}));
    window.location.reload(true);
  }

  const handleDescription = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md py-2 px-3 ease-in-out duration-700">
      {/* what's on your mind */}
      <div className="flex flex-col">
        <div className="flex pb-3 gap-6 border-b-2 border-gray-300 mx-4">
          {/* user photo */}
          <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
            <img
              src={currentUser?.profilePicture}
              alt="person image"
              className="flex shrink-0 min-h-full min-w-full"
            />
          </div>
          {/* input */}
          <div className="flex items-center align-center grow">
            <input
              type="text"
              name="description"
              className="w-full py-2 px-4 text-sm placeholder:text-sm rounded-full bg-gray-200 dark:bg-gray-500 dark:placeholder:text-gray-300 dark:text-gray-300 focus:shadow-none focus:outline-none focus:ring-transparent"
              placeholder="What's on your mind..."
              value={values.name}
              onChange={handleDescription}
            />
          </div>
        </div>
      </div>
      {/* load img, clip, attachment */}
      <form
        className="flex justify-between mx-6 mt-2 mb-5"
        action="submit"
        onSubmit={handleSubmit}
      >
        {createPostLinks.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center cursor-pointer ease-in-out duration-500 hover:text-cyan-300 dark:text-gray-300 dark:hover:text-cyan-500"
            >
              <label htmlFor="uploadImage">
                <span className="flex items-center gap-2 cursor-pointer font-semibold">
                  {link.icon}
                  <span>Image</span>
                </span>
              </label>
              <input
                type="file"
                id="uploadImage"
                className="custom-file-input hidden"
                accept="image/*"
                onChange={selectAndUploadImage}
              />
            </div>
          );
        })}
        {/* post button */}
        <div>
          <button
            type="submit"
            className="bg-cyan-300 text-gray-700 rounded-full py-2 px-4 ease-in-out duration-500  hover:bg-cyan-700 hover:text-white"
            disabled={isLoadingPostsImage}
          >
            Post
          </button>
        </div>
      </form>
      {/* post */}
      {isLoadingPostsImage ? (
        <Loading />
      ) : postImage ? (
        <div className="px-10 mb-5 flex justify-center items-center max-h-[500px] overflow-hidden">
          <img
            src={postImage}
            alt="post image"
            className="w-full min-h-full min-w-full cursor-pointer flex shrink-0 mx-auto"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreatePost