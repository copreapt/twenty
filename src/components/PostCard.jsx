import {HiOutlineUserAdd} from 'react-icons/hi'
import {AiFillHeart} from 'react-icons/ai'
import {FaRegCommentDots} from 'react-icons/fa'
import {IoIosShareAlt} from 'react-icons/io'

const PostCard = () => {
  return (
    <>
    {/* First Card */}
      <div className="bg-white mb-4 flex flex-col space-y-2">
        {/* top div */}
        <div className='flex justify-between'>
          {/* img and name */}
          <div className='flex gap-2'>
            <div className='flex justify-center items-center w-[45px] h-[45px] rounded-full overflow-hidden'>
              <img src="/public/assets/me2 (1).jpeg" alt="person image" className='grow' />
            </div>
              <div className='flex flex-col items-center'>
                <span className='text-[0.80rem]'>Rox</span>
                <span className='text-[0.60rem] text-gray-500'>Location</span>
              </div>
          </div>
          {/* add friend icon */}
          <div className='flex items-center text-cyan-700'>
            <HiOutlineUserAdd />
          </div>
        </div>
        {/* img/photo div */}
        <div className='space-y-2'>
          {/* description */}
          <div className='px-2'>
            <p className='text-sm'>description</p>
          </div>
          {/* image/photo */}
          <div>
            <img src="https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?auto=format&fit=crop&q=80&w=1912&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" className='w-full' />
          </div>
        </div>
        {/* bottom div - like, comment, share */}
        <div className='flex flex-col gap-1 px-1'>
          <div className='flex gap-5 text-2xl text-cyan-700'>
            <AiFillHeart />
            <FaRegCommentDots />
            <IoIosShareAlt />
          </div>
          <span className='text-sm font-semibold'>Liked by <span className='text-md text-cyan-600'>Catalin</span> and <span className='text-md text-cyan-600'>Others</span></span>
          {/* last comment */}
          <span className='text-sm'>Last comment here</span>
          {/* comment input */}
          <input type="text" placeholder='Leave a comment here...' className='text-sm' />
        </div>
    </div>
    {/* Second Card */}
    <div className="bg-white mb-2 flex flex-col space-y-2">
        {/* top div */}
        <div className='flex justify-between'>
          {/* img and name */}
          <div className='flex gap-2'>
            <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="person image" className='rounded-full max-w-[40px] h-[40px]' />
              <div className='flex flex-col items-center'>
                <span className='text-[0.80rem]'>Rox</span>
                <span className='text-[0.60rem] text-gray-500'>Location</span>
              </div>
          </div>
          {/* add friend icon */}
          <div className='flex items-center text-cyan-700'>
            <HiOutlineUserAdd />
          </div>
        </div>
        {/* img/photo div */}
        <div className='space-y-2'>
          {/* description */}
          <div className='px-2'>
            <p className='text-sm'>description</p>
          </div>
          {/* image/photo */}
          <div>
            <img src="/public/assets/testimg.jpg" alt="image" className='w-full' />
          </div>
        </div>
        {/* bottom div - like, comment, share */}
        <div className='flex flex-col gap-1 px-1'>
          <div className='flex gap-5 text-2xl text-cyan-700'>
            <AiFillHeart />
            <FaRegCommentDots />
            <IoIosShareAlt />
          </div>
          <span className='text-sm font-semibold'>Liked by <span className='text-md text-cyan-600'>Catalin</span> and <span className='text-md text-cyan-600'>Others</span></span>
          {/* last comment */}
          <span className='text-sm'>Last comment here</span>
          {/* comment input */}
          <input type="text" placeholder='Leave a comment here...' className='text-sm' />
        </div>
    </div>
    {/* 3 rd Card */}
    <div className="bg-white mb-2 flex flex-col space-y-2">
        {/* top div */}
        <div className='flex justify-between'>
          {/* img and name */}
          <div className='flex gap-2'>
            <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="person image" className='rounded-full max-w-[40px] h-[40px]' />
              <div className='flex flex-col items-center'>
                <span className='text-[0.80rem]'>Rox</span>
                <span className='text-[0.60rem] text-gray-500'>Location</span>
              </div>
          </div>
          {/* add friend icon */}
          <div className='flex items-center text-cyan-700'>
            <HiOutlineUserAdd />
          </div>
        </div>
        {/* img/photo div */}
        <div className='space-y-2'>
          {/* description */}
          <div className='px-2'>
            <p className='text-sm'>description</p>
          </div>
          {/* image/photo */}
          <div>
            <img src="https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?auto=format&fit=crop&q=80&w=1912&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" className='w-full' />
          </div>
        </div>
        {/* bottom div - like, comment, share */}
        <div className='flex flex-col gap-1 px-1'>
          <div className='flex gap-5 text-2xl text-cyan-700'>
            <AiFillHeart />
            <FaRegCommentDots />
            <IoIosShareAlt />
          </div>
          <span className='text-sm font-semibold'>Liked by <span className='text-md text-cyan-600'>Catalin</span> and <span className='text-md text-cyan-600'>Others</span></span>
          {/* last comment */}
          <span className='text-sm'>Last comment here</span>
          {/* comment input */}
          <input type="text" placeholder='Leave a comment here...' className='text-sm' />
        </div>
    </div>
    {/* 4th Card */}
    <div className="bg-white mb-2 flex flex-col space-y-2">
        {/* top div */}
        <div className='flex justify-between'>
          {/* img and name */}
          <div className='flex gap-2'>
            <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="person image" className='rounded-full max-w-[40px] h-[40px]' />
              <div className='flex flex-col items-center'>
                <span className='text-[0.80rem]'>Rox</span>
                <span className='text-[0.60rem] text-gray-500'>Location</span>
              </div>
          </div>
          {/* add friend icon */}
          <div className='flex items-center text-cyan-700'>
            <HiOutlineUserAdd />
          </div>
        </div>
        {/* img/photo div */}
        <div className='space-y-2'>
          {/* description */}
          <div className='px-2'>
            <p className='text-sm'>description</p>
          </div>
          {/* image/photo */}
          <div>
            <img src="https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?auto=format&fit=crop&q=80&w=1912&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" className='w-full' />
          </div>
        </div>
        {/* bottom div - like, comment, share */}
        <div className='flex flex-col gap-1 px-1'>
          <div className='flex gap-5 text-2xl text-cyan-700'>
            <AiFillHeart />
            <FaRegCommentDots />
            <IoIosShareAlt />
          </div>
          <span className='text-sm font-semibold'>Liked by <span className='text-md text-cyan-600'>Catalin</span> and <span className='text-md text-cyan-600'>Others</span></span>
          {/* last comment */}
          <span className='text-sm'>Last comment here</span>
          {/* comment input */}
          <input type="text" placeholder='Leave a comment here...' className='text-sm' />
        </div>
    </div>
    </>
    
  )
}

export default PostCard