import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeFriendsModal, getSingleUser } from '../features/user/userSlice';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const FriendsModal = () => {
    const { openFriendsModal, currentUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(closeFriendsModal());
    }

    const fetchSingleUser = (id) => {
      dispatch(getSingleUser({id: id}));
      dispatch(closeFriendsModal());
    };

  return (
    <div
      className={`fixed  left-0 w-full h-[calc(100vh-85px)] bg-gray-300 dark:bg-gray-900 z-20 ease-linear duration-300 flex flex-col justify-center ${
        openFriendsModal
          ? "translate-y-0 bottom-10"
          : "translate-y-[100%] bottom-0"
      }`}
    >
      <div
        onClick={closeModal}
        className="fixed top-5 right-5 text-2xl text-cyan-700 bg-white"
      >
        <IoClose />
      </div>
      {/* friends */}
      <div className="pt-20 text-center text-2xl text-cyan-700 dark:text-cyan-500 border-b-2 pb-5 mb-10">
        <h1>Friends</h1>
      </div>
      {/* container */}
      <div className="flex flex-col space-y-5 px-3 grow overflow-y-auto mb-10">
        {currentUser?.friends.map((friend) => {
            return (
              <Link
                to={`../users/${friend.friendId}`}
                onClick={(e) => fetchSingleUser(friend.friendId)}
                key={friend._id}
                className="flex gap-2 items-center bg-white rounded-md py-1 px-3 hover:bg-cyan-600 cursor-pointer"
              >
                {/* image div */}
                <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={friend.profilePicture}
                    alt="person image"
                    className="flex shrink-0 min-h-full min-w-full"
                  />
                </div>
                {/* name div*/}
                <div className="capitalize text-">{friend.fullName}</div>
              </Link>
            );
        })}
      </div>
    </div>
  );
}

export default FriendsModal