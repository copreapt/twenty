import {HiOutlineUserAdd} from 'react-icons/hi'
import {AiFillHeart} from 'react-icons/ai'
import {FaRegCommentDots} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { createLike, getCurrentPostLikes, toggleOpenCurrentPostLikes } from '../features/likes/likesSlice';
import {
  toggleOpenCurrentPostComments,
  setCurrentPostId,
  getCurrentPostComments,
  getCurrentUserComments,
  openPostCommentsMobile,
} from "../features/comments/commentsSlice";
import {
  getCurrentPost,
  togglePostImage,
} from "../features/posts/postSlice";
import { getSingleUser, addFriend } from '../features/user/userSlice';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const PostCard = () => {

  const {posts}  = useSelector((store) => store.posts);
  const {currentUser, isLoading} = useSelector((store) => store.user);
  const {currentUserLikes, isLoadingLikes, likes} = useSelector((store) => store.likes);
  const [likedPosts, setLikedPosts] = useState(null)
  const dispatch = useDispatch();

  // find liked posts
  const findLikedPosts = useCallback(() => {
    const currentUserLikedPosts = currentUserLikes?.map((like) => {
      const { post } = like;
      return post;
    });
    if (currentUserLikedPosts) {
      setLikedPosts(currentUserLikedPosts);
    }
  },[currentUserLikes]);

  const likePostOnClick =(postId) => {
    //  to prevent from spamming like button, we first wait for the request to fulfill then the user can send again
    if (isLoadingLikes) {
      return;
    } else {
      dispatch(
        createLike({
          post: postId,
          name: currentUser?.fullName,
          profilePicture: currentUser?.profilePicture,
        })
      );
      // if like already exists and user presses like again, we remove the postId from state
      if (likedPosts.includes(postId)) {
        const index = likedPosts.indexOf(postId);
        likedPosts.splice(index, 1);
        // else if like doesn't exist in liked posts and user presses like button, we add back in the state
      } else if (!likedPosts.includes(postId)) {
        likedPosts.push(postId);
      }
    }
  }

  const fetchCurrentPostLikes = (id) => {
    dispatch(getCurrentPostLikes({post: id}))
    dispatch(toggleOpenCurrentPostLikes());
  }

  const openCommentsModal = (id) => {
    dispatch(setCurrentPostId(id));
    dispatch(getCurrentPost({id: id}));
    dispatch(getCurrentPostComments({post: id}));
    dispatch(getCurrentUserComments({post: id}));
    dispatch(toggleOpenCurrentPostComments());
  }

  const fetchSingleUser = (id) => {
    dispatch(getSingleUser({id: id}))
  }

  const addUserToFriendList = (name, image, id) => {
    if(isLoading){
      return;
    } else {
      dispatch(
        addFriend({ fullName: name, profilePicture: image, friendId: id })
      );
    }
  }

  useEffect(() => {
      findLikedPosts()
  },[currentUserLikes,findLikedPosts])



  return (
    <>
      {posts?.map((post) => {
        const {description, image, name, profilePicture, location, _id, user} = post;
        return (
          <div
            className="bg-white dark:bg-gray-800 mb-4 flex flex-col space-y-4 p-3 rounded-md ease-in-out duration-700"
            key={_id}
          >
            {/* top div */}
            <div className="flex justify-between">
              {/* img and name */}
              <Link
                to={`users/${user}`}
                className="flex gap-2 cursor-pointer"
                onClick={(e) => fetchSingleUser(user)}
              >
                <div className="flex justify-center items-center w-[60px] h-[60px] md:w-[45px] md:h-[45px] rounded-full overflow-hidden">
                  <img
                    src={profilePicture}
                    alt="person image"
                    className="flex shrink-0 min-h-full min-w-full"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-md md:text-[0.80rem] dark:text-white">
                    {name}
                  </span>
                  <span className="text-sm md:text-[0.60rem] text-gray-500 dark:text-gray-300">
                    {location}
                  </span>
                </div>
              </Link>
              {/* add friend icon */}
              {user === currentUser?._id ? (
                ""
              ) : currentUser?.friends?.some(
                  (item) => item.friendId === user
                ) ? (
                ""
              ) : (
                <div
                  className="flex items-center text-cyan-700 cursor-pointer"
                  onClick={(e) =>
                    addUserToFriendList(name, profilePicture, user)
                  }
                >
                  <HiOutlineUserAdd />
                </div>
              )}
            </div>
            {/* img/photo div */}
            <div className="space-y-2">
              {/* description */}
              <div className="px-2">
                <p className="text-md md:text-sm dark:text-gray-300">
                  {description}
                </p>
              </div>
              {/* image/photo */}
              {image ? (
                <div
                  onClick={(e) => {
                    openCommentsModal(_id);
                    dispatch(togglePostImage());
                  }}
                  className="flex justify-center items-center max-h-[600px] overflow-hidden"
                >
                  <img
                    src={image}
                    alt="image"
                    className="w-full min-h-full min-w-full cursor-pointer flex shrink-0 mx-auto"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            {/* bottom div - like, comment */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex gap-5 text-2xl text-cyan-700 items-center dark:text-cyan-400">
                <button
                  disabled={isLoadingLikes}
                  onClick={(e) => likePostOnClick(_id)}
                >
                  <AiFillHeart
                    className={`ease-linear duration-700 ${
                      likedPosts?.includes(_id)
                        ? "text-red-500 text-3xl"
                        : "text-cyan-700 dark:text-cyan-500"
                    }`}
                  />
                </button>
                {/* number of likes */}
                {likes?.filter((item) => item.post === _id).length > 0 ? (
                  <span className="text-xl font-semibold">
                    {likes?.filter((item) => item.post === _id).length}
                  </span>
                ) : (
                  ""
                )}
                <button
                  onClick={(e) => {
                    openCommentsModal(_id);
                    dispatch(openPostCommentsMobile());
                  }}
                >
                  <FaRegCommentDots />
                </button>
              </div>
              {/* liked by */}
              {likes?.filter((item) => item.post === _id).length > 0 ? (
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-sm dark:text-white">
                    Liked by
                  </span>
                  <span className="text-sm md:text-md text-cyan-600 dark:text-cyan-500">
                    {likes?.filter((item) => item.post === _id).pop()?.name}
                  </span>
                  <span className="text-sm dark:text-white">
                    and
                  </span>
                  <span
                    className="text-md text-cyan-600 dark:text-cyan-500 hover:cursor-pointer"
                    onClick={() => fetchCurrentPostLikes(_id)}
                  >
                    Others
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PostCard