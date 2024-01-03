import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { toggleCloseCurrentPostLikes } from "../features/likes/likesSlice";
import { getSingleUser } from '../features/user/userSlice';
import { Link } from 'react-router-dom';


const LikesModal = () => {

    const { currentPostLikes, openCurrentPostLikes } = useSelector(
      (store) => store.likes
    );
    const dispatch = useDispatch();
    const toggle = () => {
      dispatch(toggleCloseCurrentPostLikes());
    };

     const fetchSingleUser = (id) => {
       dispatch(getSingleUser({ id: id }));
     };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/80 justify-center items-center z-20 ease-in-out duration-700 ${
        openCurrentPostLikes ? "flex" : "hidden"
      }`}
    >
      <div className="bg-cyan-700 text-white max-h-[30rem] w-[25rem] overflow-y-auto rounded-md">
        {/* likes and close button */}
        <div className="text-center border-b border-white mb-5 pb-2 relative p-2 pt-4">
          <IoClose
            className="text-2xl absolute right-2 top-2 hover:cursor-pointer"
            onClick={toggle}
          />
          <h1>Likes</h1>
        </div>
        {/* userInfo */}
        {currentPostLikes?.map((like) => {
          return (
            <div
              className="flex justify-between gap-20 px-5 mb-5"
              key={like._id}
            >
              {/* image and name */}
              <Link
                to={`users/${like.user}`}
                onClick={(e) => fetchSingleUser(like.user)}
                className="cursor:pointer"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
                    <img
                      src={like.profilePicture}
                      alt="profile picture"
                      className="flex shrink-0 min-h-full min-w-full"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <h1>{like.name}</h1>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LikesModal