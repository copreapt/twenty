import React, { useEffect, useState } from "react";
import { SearchBar, FormRow } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, updateUser, getCurrentUser } from "../features/user/userSlice";


const initialState = {
  email: "",
  fullName: "",
  username: "",
  profilePicture: "",
};


const UpdateProfile = () => {
  const {currentUser, profilePictureImage} = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);

  const dispatch = useDispatch();

  const selectAndUploadImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      dispatch(uploadImage({ image: imageFile }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, username, profilePicture } = values;
    dispatch(updateUser({ fullName, email, username, profilePicture }));
    window.location.reload(true);
  };

  useEffect(() => {
    dispatch(getCurrentUser());
    if(currentUser){
      setValues({email: currentUser?.email, fullName: currentUser?.fullName, username: currentUser?.username, profilePicture: currentUser?.profilePicture})
    }
  },[currentUser])

  useEffect(() => {
    if(profilePictureImage){
      setValues({...values, profilePicture: profilePictureImage})
    }
  },[profilePictureImage])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <form
      className="md:w-full md:mx-auto h-screen bg-gray-200 flex flex-col absolute items-center"
      action="submit"
      onSubmit={onSubmit}
    >
      {/* navbar div */}
      <div className="hidden md:flex bg-white overflow-hidden fixed top-0 z-0 w-full">
        <SearchBar />
      </div>
      {/* container */}
      <div className="grid grid-cols-12 py-14 md:max-w-3xl md:mx-auto lg:max-w-screen-lg lg:gap-20 xl:max-w-screen-xl md:mt-10">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-10 col-span-5">
          <div className="flex justify-center items-center h-[400px] w-[400px] rounded-full overflow-hidden">
            {profilePictureImage ? (
              <img
                src={profilePictureImage}
                alt="person image"
                className="grow"
              />
            ) : (
              <img
                src={currentUser?.profilePicture}
                alt="person image"
                className="grow"
              />
            )}
            {/* chose image */}
          </div>
          <label htmlFor="uploadImage">
            <span className="bg-white py-2 px-20 rounded-md text-black hover:cursor-pointer">
              Upload Image
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
        {/* container for email, username, name */}
        <div className="col-span-7 grid justify-items-center content-center gap-10">
          {/* Email */}
          <FormRow
            type="email"
            name="email"
            value={values?.email}
            handleChange={handleChange}
          />
          {/* Email */}
          <FormRow
            type="text"
            name="username"
            value={values?.username}
            handleChange={handleChange}
          />
          {/* Email */}
          <FormRow
            type="text"
            name="fullName"
            value={values?.fullName}
            handleChange={handleChange}
            labelText="full name"
          />
        </div>
      </div>
      {/* save button */}
      <div className="bg-cyan-500 px-20 py-2 text-white rounded-lg hover:bg-cyan-700 ease-in-out duration-700 hover:cursor-pointer">
        <button type="submit">Save changes</button>
      </div>
    </form>
  );
};

export default UpdateProfile;
