import React, { useEffect, useState } from "react";
import { FormRow, FriendsModal, SearchUserModalMobile } from "../components";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, updateUser, getCurrentUser } from "../features/user/userSlice";
import { useNavigate } from "react-router";
import { changeTheme, navbarDesktop } from "../utils/utils";
import { toggleLogout, logoutUser } from "../features/user/userSlice";
import { Link, useLocation } from "react-router-dom";
import {Navbar} from "../components";
import { emptyPostsArray } from "../features/posts/postSlice";


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
  const themeLocalStorage = localStorage.getItem("theme");
  const { currentUser, profilePictureImage, openLogoutDiv, isLoadingProfilePicture } = useSelector(
    (store) => store.user
  );
  const [theme, setTheme] = useState(themeLocalStorage);
  const [values, setValues] = useState(initialState);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  const toggleTheme = () => {
    if (theme === "white") {
      setTheme("dark");
      document.getElementById("darkMode").classList.add("dark");
    } else {
      setTheme("white");
      document.getElementById("darkMode").classList.remove("dark");
    }
  };

  useEffect(() => {
    if (profilePictureImage) {
      setValues({ ...values, profilePicture: profilePictureImage });
    }
  }, [profilePictureImage]);

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
    const theme = localStorage.getItem("theme");
    setTheme(theme);
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.getElementById("darkMode").classList.add("dark");
    } else if (theme === "white") {
      document.getElementById("darkMode").classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    dispatch(emptyPostsArray());
  }, [location]);

  return (
    <div className="w-full md:w-full md:mx-auto md:h-screen bg-gray-200 dark:bg-gray-900 flex flex-col items-center ease-in-out duration-700">
      {/* navbar div */}
      <div className="hidden md:flex fixed top-0 left-0 bg-white dark:bg-gray-800 overflow-hidden w-full ease-in-out duration-700">
        <div className="w-full">
          <div className="my-3 bg-white dark:bg-gray-800 mx-10 flex justify-between ease-in-out duration-700">
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
              <div className="flex justify-between px-6 dark:text-white cursor-pointer">
                {navbarDesktop.map((link) => {
                  return (
                    <span
                      key={link.id}
                      className="text-lg"
                      onClick={
                        link.name === "darkMode" ? toggleTheme : undefined
                      }
                    >
                      {link.icon}
                    </span>
                  );
                })}
              </div>
              {/* username */}
              <div
                className="bg-gray-200 dark:bg-gray-500 dark:text-white px-6 py-1 rounded-md flex items-center justify-center gap-4 hover:cursor-pointer w-[150px]"
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
        <div className="flex flex-col md:grid md:grid-cols-12 md:py-14 md:mx-auto gap-10 mt-[45px] md:mt-[60px] md:max-w-[900px] lg:max-w-screen-lg xl:max-w-screen-xl">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-10 md:col-span-5">
            {isLoadingProfilePicture ? (
              // Loading for when the user changes the image
              <div className="flex justify-center items-center h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full overflow-hidden border-4 border-white shadow-md shadow-gray-400">
                <div className="flex w-full h-full  bg-black/80  items-center justify-center">
                  <div className="m-auto">
                    <div className="w-[2rem] h-[2rem] mx-auto rounded-full border-2 border-gray-300 border-t-2 border-t-cyan-700 animate-spin"></div>
                  </div>
                </div>
              </div>
            ) : (
              // profile picture
              <div className="flex justify-center items-center h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full overflow-hidden border-4 border-white shadow-md shadow-gray-400">
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
              </div>
            )}
            {/* chose image */}
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
          <div className="flex flex-col gap-10 md:justify-items-center md:col-span-7 md:grid md:content-center">
            {/* sub container */}
            <div className="flex flex-col md:flex-row items-center gap-20">
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
              <div className="flex flex-col space-y-10 mx-5 md:mx-0 mb-10 md:mb-0">
                <h1 className="text-cyan-700 dark:text-cyan-500">
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
          className=" mb-20 md:mb-0 bg-cyan-500 px-20 py-2 text-white rounded-lg hover:bg-cyan-700 ease-in-out duration-700 hover:cursor-pointer"
          type="submit"
        >
          Save changes
        </button>
      </form>
      {/* Navbar for mobile version */}
      <div className="md:hidden flex items-center py-3 bg-white dark:bg-gray-800 rounded-md justify-center border-t border-gray-300 dark:border-gray-600 fixed bottom-0 w-full">
        <Navbar />
      </div>
      {/* Friends Modal for Mobile Version */}
      <FriendsModal />
      {/* Search User Modal */}
      <SearchUserModalMobile />
    </div>
  );
};

export default UpdateProfile;
