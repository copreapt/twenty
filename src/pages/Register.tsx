import {Link} from 'react-router-dom'

const Register = () => {
  return (
    <>
    <main>
      {/* container */}
      <div className="center-div border border-gray-400 py-20">
      <div className="flex flex-col align-center items-center">
        <h1 className="text-2xl text-black text-center">Register to Twenty</h1>
        <form className="pt-10 flex flex-col px-10 gap-4">
          {/* Email */}
          <div className="gap-3 flex flex-col ">
            <label htmlFor="email" className="text-lg">Email</label>
            <input type="email" id="email" className="border border-gray-700 p-1 px-2" />
          </div>
           {/* Full Name */}
          <div className="gap-3 flex flex-col ">
            <label htmlFor="fullName" className="text-lg">Full Name</label>
            <input type="text" id="fullName" className="border border-gray-700 p-1 px-2" />
          </div>
          {/* Username */}
          <div className="gap-3 flex flex-col">
            <label htmlFor="username" className="text-lg">Username</label>
            <input type="text" id="username" className="border border-gray-700 p-1 px-2" />
          </div>
          {/* Password */}
          <div className="gap-3 flex flex-col">
            <label htmlFor="password" className="text-lg">Password</label>
            <input type="password" id="password" className="border border-gray-700 p-1 px-2" />
          </div>
          {/* submit button */}
          <div className="text-center">
            <button className="bg-cyan-300 w-full rounded-sm p-1 hover:bg-cyan-700 hover:text-white ease-in-out duration-700">
              Register
            </button>
          </div>
        </form>
      </div>
      {/* register and forgot password */}
      <div className="pt-10 text-center space-y-3">
        {/* Login */}
        <div>
          <span>Already have an account?</span> <Link to={'/login'} className="font-medium text-cyan-700 hover:text-cyan-400 ease-in-out duration-700">Login Here</Link>
        </div>
      </div>
      </div>
    </main>
    </>
  )
}

export default Register