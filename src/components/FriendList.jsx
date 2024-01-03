import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getSingleUser } from '../features/user/userSlice';
import { Link } from 'react-router-dom';

const FriendList = () => {
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchSingleUser = (id) => {
    dispatch(getSingleUser({ id: id }));
  };

  return (
    <>
      {currentUser?.friends?.length > 0 ? (
        <div className="bg-white rounded-md py-2 shadow-sm shadow-white px-3 space-y-3">
          {currentUser?.friends.map((friend) => {
             return (
               <Link
                 to={`users/${friend.friendId}`}
                 className="flex gap-4 cursor-pointer"
                 onClick={(e) => fetchSingleUser(friend.friendId)}
                 key={friend.friendId}
               >
                 {/* image */}
                 <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
                   <img
                     src={friend.profilePicture}
                     alt="person image"
                     className="flex shrink-0 min-h-full min-w-full"
                   />
                 </div>
                 {/* name */}
                 <div className="flex items-center">
                   <span className="text-md font-light">{friend.fullName}</span>
                 </div>
               </Link>
             ); 
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default FriendList