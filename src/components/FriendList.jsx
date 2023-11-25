import React from 'react'

const FriendList = () => {
  return (
    <div className="bg-white rounded-md py-2 shadow-sm shadow-white px-3">
      <div className='flex gap-4'>
        {/* image */}
        <div className="flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden">
          <img src="/assets/me2 (1).jpeg" alt="person image" className="grow" />
        </div>
        {/* name */}
        <div className='flex items-center'>
          <span className='text-md font-light'>Oprea Catalin</span>
        </div>
      </div>
    </div>
  );
}

export default FriendList