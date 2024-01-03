import React, {useState} from 'react'
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { removeCurrentPostFromState } from "../features/posts/postSlice";
import {
  createComment,
  toggleCloseCurrentPostComments,
  deleteComment,
} from "../features/comments/commentsSlice";
import Loading from './Loading';

const CommentsSection = () => {
    const [values, setValues] = useState({comment: ""});
    const { currentUser } = useSelector((store) => store.user);
    const {
      currentPostId,
      currentPostComments,
      currentUserComments,
      openCurrentPostComments,
    } = useSelector((store) => store.comments);
    const { currentPost, isLoading  } = useSelector((store) => store.posts);
    const dispatch = useDispatch();

    // close comments modal and empty state
    const toggleComments = () => {
      dispatch(toggleCloseCurrentPostComments());
      dispatch(removeCurrentPostFromState());
    };

    const storeMessageInState = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setValues({ ...values, [name]: value });
    };

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      dispatch(
        createComment({
          name: currentUser?.fullName,
          profilePicture: currentUser?.profilePicture,
          comment: values?.comment,
          post: currentPostId?.payload,
        })
      );
      setValues({ comment: "" });
    };

    // delete comment
    const deleteCommentTrigger = (commentId, postId) => {
      dispatch(deleteComment({ id: commentId, postId: postId }));
    };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full  bg-black/80  items-center z-20 ${
        openCurrentPostComments ? "flex" : "hidden" } `}
    >
      {/* container */}
      <div className="grid grid-cols-12 p-20 max-w-screen-xl mx-auto">
        {/* image div */}
        <div className="col-span-7 flex items-center justify-center bg-black">
          {isLoading ? (
            <Loading />
          ) : (
            <img src={currentPost?.image} alt="user image" className="w-full" />
          )}
        </div>
        {/* comments section div */}
        <div className="col-span-5 p-5 bg-gray-200 ">
          {/* container */}
          <div className="flex flex-col relative">
            {/* current user profile picture and name */}
            <div className="border-b border-black mt-10 pb-5 flex items-center gap-3 flex-none">
              <IoClose
                className="text-2xl absolute right-2 top-2 cursor-pointer"
                onClick={toggleComments}
            />
              <div className="rounded-full justify-center overflow-hidden w-[40px] h-[40px] flex items-center">
                <img
                  src={currentUser?.profilePicture}
                  alt="image"
                  className="grow"
                />
              </div>
              <div>
                <h1 className="text-md font-extra-light">
                  {currentUser?.fullName}
                </h1>
              </div>
            </div>
            {/* comments section */}
            <div className="grow my-5 overflow-y-auto p-2 space-y-3 h-[400px] max-h-[400px]">
              {/* container */}
              <div className="flex gap-5 items-baseline flex-col-reverse">
                {/* user div */}
                {currentPostComments?.map((comment) => {
                  return (
                    <div
                      className="flex items-center justify-between relative w-full"
                      key={comment._id}
                    >
                      {/* image and comment */}
                      <div className="flex items-center gap-2">
                        {/* img */}
                        <div className="flex items-center justify-center overflow-hidden rounded-full w-[40px] h-[40px] flex-none">
                          <img
                            src={comment.profilePicture}
                            alt="image"
                            className="flex shrink-0 min-h-full min-w-full"
                          />
                        </div>
                        {/* name and comment */}
                        <div className="text-sm">
                          <span className="font-extra-light text-cyan-700 mr-2">
                            {comment.name}
                          </span>
                          <span className="text-[0.90rem] text-gray-700 break-all">
                            {comment.comment}
                          </span>
                        </div>
                      </div>
                      {/* delete button */}
                      {currentUserComments?.map((item) => {
                        if (item._id === comment._id) {
                          return (
                            <div
                              key={comment._id}
                              className="flex items-center text-md text-black absolute right-2 cursor-pointer"
                              onClick={(e) =>
                                deleteCommentTrigger(
                                  comment._id,
                                  currentPostId?.payload
                                )
                              }
                            >
                              <span>
                                <MdDelete />
                              </span>
                            </div>
                          );
                        }
                        return;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* input div */}
            <form
              className="mb-5 flex-none border-t border-black pt-3 flex gap-2 items-center"
              action="submit"
              onSubmit={handleCommentSubmit}
            >
              <input
                type="text"
                name="comment"
                value={values.comment}
                onChange={storeMessageInState}
                className="flex grow p-2 focus:shadow-none focus:border-black focus:outline-none focus:ring-transparent placeholder:text-black bg-gray-200"
                placeholder="Add a comment..."
              />
              <button type="submit" className="flex text-cyan-700">
                Post
              </button>
            </form>
          </div>
        </div>
        {/* end of comments section div */}
      </div>
    </div>
  );
}

export default CommentsSection