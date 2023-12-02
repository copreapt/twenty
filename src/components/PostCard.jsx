import {HiOutlineUserAdd} from 'react-icons/hi'
import {AiFillHeart} from 'react-icons/ai'
import {FaRegCommentDots} from 'react-icons/fa'
import { useSelector } from "react-redux";

const PostCard = () => {

  const  {posts}  = useSelector((store) => store.posts);

  return (
    <>
      {posts?.map((post, index) => {
        const {description, image, name, profilePicture, location} = post;
        return (
          <div className="bg-white mb-4 flex flex-col space-y-2 p-3 rounded-md" key={index}>
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
                  <span className="text-[0.60rem] text-gray-500">{location}</span>
                </div>
              </div>
              {/* add friend icon */}
              <div className="flex items-center text-cyan-700">
                <HiOutlineUserAdd />
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
                <img
                  src={image}
                  alt="image"
                  className="w-full"
                />
              </div>
            </div>
            {/* bottom div - like, comment, share */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex gap-5 text-2xl text-cyan-700">
                <AiFillHeart />
                <FaRegCommentDots />
              </div>
              <span className="text-sm font-semibold">
                Liked by <span className="text-md text-cyan-600">Catalin</span>{" "}
                and <span className="text-md text-cyan-600">Others</span>
              </span>
              {/* last comment */}
              <span className="text-sm">Last comment here</span>
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