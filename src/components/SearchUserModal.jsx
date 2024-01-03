import React from 'react'
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { closeSearchUserModal } from '../features/user/userSlice';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { getSingleUser } from '../features/user/userSlice';

const SearchUserModal = () => {
  
    const { searchUserModal, searchUsersResult, isLoadingUsers } = useSelector((store) => store.user);
    const dispatch = useDispatch()

    const toggle = () => {
      dispatch(closeSearchUserModal());
    };

    const fetchSingleUser = (id) => {
      dispatch(getSingleUser({ id: id }));
      dispatch(closeSearchUserModal());
    };

  return (
    <aside
      className={`fixed bottom-0 left-0 w-[390px] h-[calc(100vh-60px)] bg-gray-300 z-20 ease-linear duration-700 flex flex-col ${
        searchUserModal ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <div className="relative p-2 pt-4 text-right flex justify-end w-full text-black mb-10">
        <IoClose
          className="text-2xl absolute top-2 hover:cursor-pointer"
          onClick={toggle}
        />
        <div></div>
      </div>
      {/* users container */}
      {isLoadingUsers ? (
        <Loading />
      ) : (
        <div className="flex flex-col space-y-5 px-3">
          {/* user div */}
          {searchUsersResult?.map((user) => {
            return (
              <Link
                to={`users/${user._id}`}
                onClick={(e) => fetchSingleUser(user._id)}
                key={user._id}
                className="flex gap-2 items-center bg-white rounded-md py-1 px-3 hover:bg-cyan-600 cursor-pointer"
              >
                {/* image div */}
                <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={user.profilePicture}
                    alt="person image"
                    className="flex shrink-0 min-h-full min-w-full"
                  />
                </div>
                {/* name div*/}
                <div className="capitalize text-">{user.fullName}</div>
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
}

export default SearchUserModal