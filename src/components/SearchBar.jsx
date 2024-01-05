import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { navbarDesktop } from "../utils/utils";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { toggleLogout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../features/user/userSlice";
import { openSearchUserModal } from "../features/user/userSlice";

const initialState = {
  search: "",
}

const SearchBar = () => {
  const [data, setData] = useState(null);
  const { openLogoutDiv } = useSelector((store) => store.user);
  const [search, setSearch] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUserFunction = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setData(data);
  },[]);

  const toggleLogoutFunction = () => {
    dispatch(toggleLogout());
  };

  const getSearchValue = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setSearch({ ...search, [name]: value })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(searchUsers(search));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
    

  return (
    <section className="w-full">
      <div className="my-3 bg-white shadow-sm shadow-white mx-10 flex justify-between">
        {/* navbar logo and search */}
        <div className="flex gap-4">
          <div className="">
            <Link to="/" className="text-3xl text-cyan-500">
              Twenty
            </Link>
          </div>
          <div className="flex items-center justify-center border-2 rounded-md  bg-gray-200">
            <input
              type="text"
              name="search"
              autoComplete="off"
              value={search.search}
              className="focus:shadow-none focus:outline-none focus:ring-transparent px-2 bg-gray-200 placeholder:text-sm"
              placeholder="Search..."
              onChange={getSearchValue}
              onClick={(e) => dispatch(openSearchUserModal())}
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
          <div
            className="bg-gray-200 px-6 py-1 rounded-md flex items-center justify-center gap-4 hover:cursor-pointer w-[150px]"
            onClick={toggleLogoutFunction}
          >
            <h1>{data?.username}</h1>
            <IoIosArrowDown />
          </div>
          {/* logout */}
          <div
            className={`top-12 right-10 bg-cyan-400 px-5 py-1 w-[150px] items-center justify-center rounded-md flex hover:cursor-pointer text-white hover:bg-cyan-700 ease-in-out duration-500 ${
              openLogoutDiv ? "fixed" : "hidden"
            }`}
            onClick={logoutUserFunction}
          >
            <h1 className="px-5">Logout</h1>
          </div>
        </div>
        {/* search users result */}
      </div>
    </section>
  );
};

export default SearchBar;
