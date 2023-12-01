import {BsSearch} from 'react-icons/bs';
import { navbarDesktop } from '../utils/utils';
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../features/user/userSlice';
import { useEffect, useState } from 'react';

const SearchBar = () => {

  const [data, setData] = useState(null)
  const dispatch = useDispatch();

  const logoutUserFunction = () => {
    dispatch(logoutUser());
  }

  useEffect(() => {
     const data = JSON.parse(localStorage.getItem("userData"));
     setData(data);
  },[])
  
  return (
    <section className="w-full">
      <div className="my-3 bg-white shadow-sm shadow-white mx-10 flex justify-between">
        {/* navbar logo and search */}
        <div className="flex gap-4">
          <div className="">
            <Link to='/' className="text-3xl text-cyan-500">Twenty</Link>
          </div>
          <div className="flex items-center justify-center border-2 rounded-md  bg-gray-200">
            <input
              type="text"
              className="focus:shadow-none focus:outline-none focus:ring-transparent px-2 bg-gray-200 placeholder:text-sm"
              placeholder="Search..."
            />
            <BsSearch className="mx-6 text-sm" />
          </div>
        </div>
        {/* navbar links */}
        <div className="flex items-center justify-around">
          {/* links */}
          <div className="flex justify-between w-40 px-6">
            {navbarDesktop.map((link) => {
              return (
                <span key={link.id} className="text-lg">
                  {link.icon}
                </span>
              );
            })}
          </div>
          {/* username */}
          <div className="bg-gray-200 px-6 py-1 rounded-md flex items-center gap-4">
            <h1>{data?.fullName}</h1>
            <IoIosArrowDown/>
            <h1 onClick={logoutUserFunction}>Logout</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchBar