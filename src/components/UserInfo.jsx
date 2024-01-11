import React from 'react'
import { FaUserCog, FaFacebookF } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiSuitcase } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { getSingleUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { emptyPostsArray } from '../features/posts/postSlice';

const UserInfo = () => {

  const dispatch = useDispatch();
  const {currentUser} = useSelector((store) => store.user);

  const fetchSingleUser = (id) => {
    dispatch(getSingleUser({ id: id }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md py-2 px-3 ease-in-out duration-700">
      {/* photo,name and profile*/}
      <div className="flex justify-between border-b border-gray-300 pb-3 dark:text-white">
        {/* photo and name */}
        <Link
          to={`users/${currentUser?._id}`}
          onClick={(e) => fetchSingleUser(currentUser?._id)}
        >
          <div className="flex gap-3">
            <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
              <img
                src={currentUser?.profilePicture}
                alt="person image"
                className="flex shrink-0 min-h-full min-w-full"
              />
            </div>
            <div className="flex flex-col dark:text-white">
              <span className="text-md font-light">
                {currentUser?.fullName}
              </span>
              <span className="text-sm text-gray-300 font-light">
                {`${currentUser?.friends.length} friend${
                  currentUser?.friends.length > 1 ||
                  currentUser?.friends.length === 0
                    ? "s"
                    : ""
                }`}
              </span>
            </div>
          </div>
        </Link>
        {/* profile */}
        <div className="text-sm flex items-center">
          <Link
            to="/updateProfile"
            onClick={(e) => dispatch(emptyPostsArray())}
          >
            <FaUserCog />
          </Link>
        </div>
      </div>
      {/* location and job */}
      <div className="flex flex-col mt-5 border-b border-gray-300 pb-3">
        <div className="flex gap-3 items-center">
          <FaLocationDot className="dark:text-white" />
          {currentUser?.location ? (
            <span className="text-sm text-gray-400">
              {currentUser?.location}
            </span>
          ) : (
            <p className="text-sm text-gray-400">
              Click
              <Link
                to="/updateProfile"
                className="cursor-pointer font-semibold text-md text-cyan-700 dark:text-cyan-500 mx-1"
              >
                here
              </Link>
              to add your location
            </p>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <GiSuitcase className="dark:text-white" />
          {currentUser?.job ? (
            <span className="text-sm text-gray-400">{currentUser?.job}</span>
          ) : (
            <p className="text-sm text-gray-400">
              Click
              <Link
                to="/updateProfile"
                className="cursor-pointer font-semibold text-md text-cyan-700 dark:text-cyan-500 mx-1"
              >
                here
              </Link>
              to add a job
            </p>
          )}
        </div>
      </div>
      {/* social profiles */}
      <div className="flex flex-col mt-5 pb-3 space-y-2">
        <h4 className="text-md font-light dark:text-white">Social Profiles</h4>
        {/* for every social, div below */}
        {currentUser?.facebook && (
          <a
            className="mt-2 flex gap-3 items-center cursor-pointer"
            href={currentUser?.facebook}
            target="_blank"
            no-referrer="true"
          >
            <FaFacebookF className="dark:text-white" />
            <div>
              <p className="text-sm dark:text-white">Facebook</p>
              <p className="text-[0.7rem] text-gray-300">Social Network</p>
            </div>
          </a>
        )}
        {currentUser?.instagram && (
          <a
            className="mt-2 flex gap-3 items-center cursor-pointer"
            href={currentUser?.instagram}
            target="_blank"
            no-referrer="true"
          >
            <AiFillInstagram className="dark:text-white" />
            <div>
              <p className="text-sm dark:text-white">Instagram</p>
              <p className="text-[0.7rem] text-gray-300">Social Network</p>
            </div>
          </a>
        )}
        {currentUser?.twitter && (
          <a
            className="mt-2 flex gap-3 items-center cursor-pointer"
            href={currentUser?.twitter}
            target="_blank"
            no-referrer="true"
          >
            <FaXTwitter className="dark:text-white" />
            <div>
              <p className="text-sm dark:text-white">Twitter</p>
              <p className="text-[0.7rem] text-gray-300">Social Network</p>
            </div>
          </a>
        )}
        {!currentUser?.facebook &&
          !currentUser?.instagram &&
          !currentUser?.twitter && (
            <span className="text-sm dark:text-white">
              Link your social media accounts{" "}
              <Link
                to="/updateProfile"
                className="cursor-pointer font-semibold text-md text-cyan-700 dark:text-cyan-500"
              >
                here
              </Link>
            </span>
          )}
      </div>
    </div>
  );
}

export default UserInfo