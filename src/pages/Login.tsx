import {Link} from 'react-router-dom'


const Login = () => {
  return (
    <>
    <main>
      {/* container */}
      <div className="center-div border border-gray-400 py-20">
      <div className="flex flex-col align-center items-center">
        <h1 className="text-2xl text-black text-center">Twenty</h1>
        <form className="pt-10 flex flex-col px-10 gap-10">
          {/* name */}
          <div className="gap-3 flex flex-col ">
            <label htmlFor="name" className="text-lg">Name</label>
            <input type="text" id="name" className="border border-gray-700 p-1 px-2" />
          </div>
          {/* email */}
          <div className="gap-3 flex flex-col">
            <label htmlFor="email" className="text-lg">Email</label>
            <input type="email" id="email" className="border border-gray-700 p-1 px-2" />
          </div>
          {/* submit button */}
          <div className="text-center">
            <button className="bg-cyan-300 w-full rounded-sm p-1 hover:bg-cyan-700 hover:text-white ease-in-out duration-700">
              Login
            </button>
          </div>
        </form>
      </div>
      {/* register and forgot password */}
      <div className="pt-10 text-center space-y-3">
        {/* register */}
        <div>
          <span>New to Twenty?</span> <Link to={'/register'} className="font-medium text-cyan-700 hover:text-cyan-400 ease-in-out duration-700">Register Here</Link>
        </div>
        {/* forgot password */}
        <div>
          <a>Forgot Password?</a>
        </div>
      </div>
      </div>
    </main>
    </>
  )
}

export default Login