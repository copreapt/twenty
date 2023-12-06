import {HiOutlineUserAdd} from 'react-icons/hi'
import {AiFillHeart} from 'react-icons/ai'
import {FaRegCommentDots} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { createLike, getCurrentPostLikes, toggleOpenCurrentPostLikes } from '../features/likes/likesSlice';
import { useCallback, useEffect, useState } from 'react';


const PostCard = () => {

  const  {posts}  = useSelector((store) => store.posts);
  const {currentUser} = useSelector((store) => store.user);
  const {currentUserLikes, isLoadingLikes, likes} = useSelector((store) => store.likes);

  const [likedPosts, setLikedPosts] = useState(null)

  const dispatch = useDispatch();

  const findLikedPosts = useCallback(() => {
    const currentUserLikedPosts = currentUserLikes?.map((like) => {
      const { post } = like;
      return post;
    });
    if (currentUserLikedPosts) {
      setLikedPosts(currentUserLikedPosts);
    }
  }, [currentUserLikes]);

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
  }

  const toggle = () => {
    dispatch(toggleOpenCurrentPostLikes());
  }


  useEffect(() => {
      findLikedPosts()
  },[currentUserLikes,findLikedPosts])

  useEffect(() => {
      console.log(likedPosts)
  },[likedPosts])


  return (
    <>
      {posts?.map((post) => {
        const {description, image, name, profilePicture, location, _id} = post;
        return (
          <div
            className="bg-white mb-4 flex flex-col space-y-2 p-3 rounded-md"
            key={_id}
          >
            {/* top div */}
            <div className="flex justify-between">
              {/* img and name */}
              <div className="flex gap-2">
                <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
                  <img
                    src={profilePicture}
                    alt="person image"
                    className="grow"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[0.80rem]">{name}</span>
                  <span className="text-[0.60rem] text-gray-500">
                    {location}
                  </span>
                </div>
              </div>
              {/* add friend icon */}
              <div className="flex items-center text-cyan-700">
                <HiOutlineUserAdd onClick={toggle}
                />
              </div>
            </div>
            {/* img/photo div */}
            <div className="space-y-2">
              {/* description */}
              <div className="px-2">
                <p className="text-sm">{description}</p>
              </div>
              {/* image/photo */}
              <div>
                <img src={image} alt="image" className="w-full" />
              </div>
            </div>
            {/* bottom div - like, comment */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex gap-5 text-2xl text-cyan-700 items-center">
                <button
                  disabled={isLoadingLikes}
                  onClick={(e) => likePostOnClick(_id)}
                >
                  <AiFillHeart
                    className={`ease-in-out duration-800 ${
                      likedPosts?.includes(_id)
                        ? "text-red-500 text-3xl"
                        : "text-cyan-700"
                    }`}
                  />
                </button>
                <span className="text-xl font-semibold">
                  {likes?.filter((item) => item.post === _id).length}
                </span>
                <button>
                  <FaRegCommentDots />
                </button>
              </div>
              <span className="text-sm font-semibold">
                Liked by{" "}
                <span className="text-md text-cyan-600">
                  {
                    likes?.filter((item) => item.post === _id)[
                      Math.floor(Math.random() * likes.length)
                    ]?.name
                  }
                </span>{" "}
                and{" "}
                <span
                  className="text-md text-cyan-600 hover:cursor-pointer"
                  onClick={() => fetchCurrentPostLikes(_id)}
                >
                  Others
                </span>
              </span>
              {/* last comment */}
              <span className="text-md">Last comment here</span>
              {/* comment input */}
              <input
                type="text"
                placeholder="Leave a comment here..."
                className="text-sm"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PostCard