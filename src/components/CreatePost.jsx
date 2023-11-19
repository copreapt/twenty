import React from 'react'
import { createPostLinks } from '../utils/utils';

function CreatePost() {
  return (
    <div className='bg-white rounded-md py-2 shadow-sm shadow-white px-3"'>
      {/* what's on your mind */}
      <div className="flex flex-col">
        <div className="flex pb-3 gap-6 border-b-2 border-gray-300 mx-4">
          {/* user photo */}
          <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
            <img
              src="/assets/me2 (1).jpeg"
              alt="person image"
              className="grow"
            />
          </div>
          {/* input */}
          <div className="flex items-center align-center w-full">
            <input
              type="text"
              name="post-text"
              id="post-text"
              className="w-full py-2 px-4 text-sm placeholder:text-sm rounded-full bg-gray-200 focus:shadow-none focus:outline-none focus:ring-transparent" placeholder="What's on your mind..."
            />
          </div>
        </div>
      </div>
      {/* load img, clip, attachment */}
      <div className='flex justify-between mx-6 mt-2'>
        {createPostLinks.map((link) => {
          return (
            <div key={link.id} className="flex items-center gap-3 cursor-pointer ease-in-out duration-500 hover:text-cyan-300">
              <span className=''>{link.icon}</span>
              <span className='text-sm capitalize'>{link.name}</span>
            </div>
          );
        })}
        {/* post button */}
        <div>
          <button className='bg-cyan-300 text-gray-700 rounded-full py-2 px-4 ease-in-out duration-500  hover:bg-cyan-700 hover:text-white'>Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost