import React, { useState } from 'react'
import { createPostLinks } from '../utils/utils';
import {useSelector, useDispatch} from "react-redux";
import { uploadImage, createPost } from '../features/posts/postSlice';
import { getCurrentUser } from '../features/user/userSlice';


const initialState = {
  description: '',
}

function CreatePost() {

  const [values, setValues] = useState(initialState);
  const {currentUser} = useSelector((store) => store.user);
  const {postImage, isLoading} = useSelector((store) => store.posts);
  const dispatch = useDispatch()

  const selectAndUploadImage = (e) => {
    const imageFile = e.target.files[0];
    if(imageFile){
      dispatch(uploadImage({image: imageFile}))
    }
    // fetch currentUser to set image, name and location on the post
    dispatch(getCurrentUser());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {description} = values
    dispatch(createPost({description, image:postImage, profilePicture: currentUser.profilePicture,name: currentUser.fullName}));
    window.location.reload(true);
  }

  const handleDescription = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className='bg-white rounded-md py-2 shadow-sm shadow-white px-3"'>
      {/* what's on your mind */}
      <div className="flex flex-col">
        <div className="flex pb-3 gap-6 border-b-2 border-gray-300 mx-4">
          {/* user photo */}
          <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
            <img
              src="/assets/me2 (1).jpeg"
              alt="person image"
              className="grow"
            />
          </div>
          {/* input */}
          <div className="flex items-center align-center w-full">
            <input
              type="text"
              name="description"
              className="w-full py-2 px-4 text-sm placeholder:text-sm rounded-full bg-gray-200 focus:shadow-none focus:outline-none focus:ring-transparent"
              placeholder="What's on your mind..."
              value={values.name}
              onChange={handleDescription}
            />
          </div>
        </div>
      </div>
      {/* load img, clip, attachment */}
      <form
        className="flex justify-between mx-6 mt-2"
        action="submit"
        onSubmit={handleSubmit}
      >
        {createPostLinks.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center gap-3 cursor-pointer ease-in-out duration-500 hover:text-cyan-300"
            >
              <label htmlFor="uploadImage">
                <span className="">{link.icon}</span>
              </label>
              <input
                type="file"
                id="uploadImage"
                className="custom-file-input"
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
            disabled={isLoading}
          >
            Post
          </button>
        </div>
      </form>
      {/* post */}
      {postImage ? (
        <div className="px-5 py-5">
          <img src={postImage} alt="post image" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreatePost