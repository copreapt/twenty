import React, { useEffect, useState } from "react";
import { FormRow } from "../components";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, updateUser, getCurrentUser } from "../features/user/userSlice";
import { useNavigate } from "react-router";
import { navbarDesktop } from "../utils/utils";
import { toggleLogout, logoutUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";


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
  const { currentUser, profilePictureImage, openLogoutDiv } = useSelector(
    (store) => store.user
  );
  const [values, setValues] = useState(initialState);
  const [data, setData] = useState(null);

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

  const logoutUserFunction = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const toggleLogoutFunction = () => {
    dispatch(toggleLogout());
  };

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
    const data = JSON.parse(localStorage.getItem("userData"));
    setData(data);
  }, []);

  return (
    <div className="md:w-full h-screen bg-gray-200 flex flex-col items-center">
      {/* navbar div */}
      <div className="hidden md:flex fixed top-0 left-0 bg-white overflow-hidden w-full">
        <div className="w-full">
          <div className="my-3 bg-white shadow-sm shadow-white mx-10 flex justify-between">
            {/* navbar logo and search */}
            <div className="flex gap-4">
              <div className="">
                <Link to="/" className="text-3xl text-cyan-500">
                  Twenty
                </Link>
              </div>
            </div>
            {/* navbar links */}
            <div className="flex items-center justify-around">
              {/* links */}
              <div className="flex justify-between w-40 px-6">
                {navbarDesktop.map((link) => {
                  return (
                    <span key={link.id} className="text-lg">
                      {link.icon}
                    </span>
                  );
                })}
              </div>
              {/* username */}
              <div
                className="bg-gray-200 px-6 py-1 rounded-md flex items-center justify-center gap-4 hover:cursor-pointer w-[150px]"
                onClick={toggleLogoutFunction}
              >
                <h1>{data?.username}</h1>
                <IoIosArrowDown />
              </div>
              {/* logout */}
              <div
                className={`top-12 right-10 bg-cyan-400 px-5 py-1 w-[150px] items-center justify-center rounded-md flex hover:cursor-pointer text-white hover:bg-cyan-700 ease-in-out duration-500 ${
                  openLogoutDiv ? "fixed" : "hidden"
                }`}
                onClick={logoutUserFunction}
              >
                <h1 className="px-5">Logout</h1>
              </div>
            </div>
            {/* search users result */}
          </div>
        </div>
      </div>
      <form
        action="submit"
        className="flex flex-col items-center max-w-screen-xl"
        onSubmit={onSubmit}
      >
        {/* container */}
        <div className="flex py-14 md:mx-auto gap-10 mt-[45px] md:mt-[60px]">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-10 max-w-[500px]">
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
          <div className="flex max-w-[700px] justify-center items-center gap-10">
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
