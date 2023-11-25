import React from 'react'
import { FaUserCog } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiSuitcase } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";

const UserInfo = () => {

  const { user } = useSelector((store) => store.user);

  return (
    <div className="bg-white rounded-md py-2 shadow-sm shadow-white px-3">
      {/* photo,name and profile*/}
      <div className="flex justify-between border-b border-gray-300 pb-3">
        {/* photo and name */}
        <div className="flex gap-3">
          <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
            <img
              src="/assets/me2 (1).jpeg"
              alt="person image"
              className="grow"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-md font-light">{user?.fullName}</span>
            <span className="text-sm text-gray-300 font-light">0 friends</span>
          </div>
        </div>
        {/* profile */}
        <div className="text-sm flex items-center">
          <FaUserCog />
        </div>
      </div>
      {/* location and job */}
      <div className="flex flex-col mt-5 border-b border-gray-300 pb-3">
        <div className="flex gap-3 items-center">
          <FaLocationDot />
          <p className="text-sm text-gray-400">Somewhere, GL</p>
        </div>
        <div className="flex gap-3 items-center">
          <GiSuitcase />
          <p className="text-sm text-gray-400">Some job</p>
        </div>
      </div>
      {/* social profiles */}
      <div className="flex flex-col mt-5 pb-3">
        <h4 className="text-md font-light">Social Profiles</h4>
        {/* for every social, div below */}
        <div className='mt-2 flex gap-3 items-center cursor-pointer'>
          <FaXTwitter />
          <div>
            <p className='text-sm'>Twitter</p>
            <p className='text-[0.7rem] text-gray-300'>Social Network</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo