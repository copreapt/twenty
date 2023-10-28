import {HiOutlineUserAdd} from 'react-icons/hi'

const PostCard = () => {
  return (
    <>
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
        <div>
          <h1>hey</h1>
        </div>
    </div>
    <div className="bg-blue-500">
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
    </div>
    <div className="bg-gray-200">
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
    </div>
    <div className="bg-gray-200">
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
      <h1>PostCard</h1>
    </div>
    </>
    
  )
}

export default PostCard