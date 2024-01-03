import React, { useEffect, useState } from "react";
import { SearchBar, FormRow } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, updateUser, getCurrentUser } from "../features/user/userSlice";
import { useNavigate } from "react-router";


const initialState = {
  fullName: "",
  username: "",
  profilePicture: "",
  facebook: "",
  instagram: "",
  twitter: "",
  job:"",
  location:"",
};


const UpdateProfile = () => {
  const {currentUser, profilePictureImage} = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectAndUploadImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      dispatch(uploadImage({ image: imageFile }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { fullName,  username, profilePicture, facebook, instagram, twitter, job, location } = values;
    dispatch(updateUser({ fullName, username, profilePicture, facebook, instagram, twitter, job, location }));
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  },[])

  useEffect(() => {
    if (currentUser) {
      setValues({
        fullName: currentUser?.fullName,
        username: currentUser?.username,
        profilePicture: currentUser?.profilePicture,
        facebook: currentUser?.facebook || "",
        instagram: currentUser?.instagram || "",
        twitter: currentUser?.twitter || "",
        job: currentUser?.job || "",
        location: currentUser?.location || "",
      });
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
    console.log(name,value);
    setValues({ ...values, [name]: value });
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
    <div className="md:w-full md:mx-auto h-screen bg-gray-200 flex flex-col absolute items-center">
      {/* navbar div */}
      <div className="hidden md:flex bg-white overflow-hidden fixed top-0 z-0 w-full">
        <SearchBar />
      </div>
      <form
        action="submit"
        className="flex flex-col items-center"
        onSubmit={onSubmit}
      >
        {/* container */}
        <div className="grid grid-cols-12 py-14 md:max-w-3xl md:mx-auto lg:max-w-screen-lg lg:gap-20 xl:max-w-screen-xl md:mt-10">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-10 col-span-5">
            <div className="flex justify-center items-center h-[400px] w-[400px] rounded-full overflow-hidden border-4 border-white shadow-md shadow-gray-400">
              {profilePictureImage ? (
                <img
                  src={profilePictureImage}
                  alt="person image"
                  className="flex shrink-0 min-h-full min-w-full"
                />
              ) : (
                <img
                  src={currentUser?.profilePicture}
                  alt="person image"
                  className="flex shrink-0 min-h-full min-w-full"
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
            {/* sub container */}
            <div className="flex items-center gap-20">
              {/* username and full name */}
              <div className="flex flex-col space-y-10">
                {/* Job */}
                <FormRow
                  type="text"
                  name="job"
                  value={values?.job}
                  handleChange={handleChange}
                />
                {/* Location */}
                <FormRow
                  type="text"
                  name="location"
                  value={values?.location}
                  handleChange={handleChange}
                />
                {/* Username */}
                <FormRow
                  type="text"
                  name="username"
                  value={values?.username}
                  handleChange={handleChange}
                />
                {/* Full Name */}
                <FormRow
                  type="text"
                  name="fullName"
                  value={values?.fullName}
                  handleChange={handleChange}
                  labelText="full name"
                />
              </div>
              {/* socials */}
              <div className="flex flex-col space-y-10">
                <h1 className="text-cyan-700">
                  You can link bellow, your social media accounts.
                </h1>
                {/* Facebook */}
                <FormRow
                  type="text"
                  name="facebook"
                  value={values?.facebook}
                  handleChange={handleChange}
                />
                {/* Instagram */}
                <FormRow
                  type="text"
                  name="instagram"
                  value={values?.instagram}
                  handleChange={handleChange}
                />
                {/* Twitter */}
                <FormRow
                  type="text"
                  name="twitter"
                  value={values?.twitter}
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-cyan-500 px-20 py-2 text-white rounded-lg hover:bg-cyan-700 ease-in-out duration-700 hover:cursor-pointer"
          type="submit"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
