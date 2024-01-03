import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col space-y-10">
      <h1 className="text-4xl">Page not found</h1>
      <Link to="/" className="bg-cyan-700 text-white px-10 py-3 rounded-md text-lg hover:bg-cyan-500 hover:text-white ease-in-out duration-500 cursor-pointer">
        Back Home
      </Link>
    </div>
  )
}

export default Error