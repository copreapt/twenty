import React, {useState, useEffect} from "react";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { closeSearchUserModalMobile } from "../features/user/userSlice";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { getSingleUser } from "../features/user/userSlice";
import { searchUsers } from "../features/user/userSlice";

const initialState = {
  search: "",
};

const SearchUserModalMobile = () => {
const [search, setSearch] = useState(initialState);
const { searchUserModalMobile, searchUsersResult, isLoadingUsers } = useSelector(
(store) => store.user
);
const dispatch = useDispatch();

const toggle = () => {
    dispatch(closeSearchUserModalMobile());
};

const fetchSingleUser = (id) => {
    dispatch(getSingleUser({ id: id }));
    dispatch(closeSearchUserModalMobile());
};

const getSearchValue = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setSearch({ ...search, [name]: value });
};

useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    dispatch(searchUsers(search));
  }, 1000);

  return () => clearTimeout(delayDebounceFn);
}, [search]);

return (
  <aside
    className={`fixed  left-0 w-full h-[calc(100vh-85px)] bg-gray-300 dark:bg-gray-900 z-20 ease-linear duration-300 flex flex-col justify-center ${
      searchUserModalMobile
        ? "translate-y-0 bottom-10"
        : "translate-y-[100%] bottom-0"
    }`}
  >
    <div className="relative p-2 pt-4 text-right flex justify-end w-full text-cyan-700 dark:text-cyan-500 mb-10">
      <IoClose
        className="text-2xl absolute top-5 right-5 hover:cursor-pointer bg-white"
        onClick={toggle}
      />
    </div>
    <div className="text-center text-2xl text-cyan-700 dark:text-cyan-500 border-b-2 pb-5 mb-10">
      <h1>Search Users</h1>
    </div>
    {/* search input */}
    <div className="flex items-center justify-center border-2 rounded-md  bg-gray-200 mb-10 mx-2">
      <input
        type="text"
        name="search"
        autoComplete="off"
        value={search.search}
        className="focus:shadow-none focus:outline-none focus:ring-transparent px-2 bg-gray-200 placeholder:text-sm w-full rounded-md py-2"
        placeholder="Search..."
        onChange={getSearchValue}
      />
    </div>
    {/* users container */}
    {isLoadingUsers ? (
      <Loading />
    ) : (
      <div className="flex flex-col space-y-5 px-3 grow mb-10 overflow-y-auto">
        {/* user div */}
        {searchUsersResult?.map((user) => {
          return (
            <Link
              to={`../users/${user._id}`}
              onClick={(e) => fetchSingleUser(user._id)}
              key={user._id}
              className="flex gap-2 items-center bg-white rounded-md py-1 px-3 hover:bg-cyan-600 cursor-pointer"
            >
              {/* image div */}
              <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={user.profilePicture}
                  alt="person image"
                  className="flex shrink-0 min-h-full min-w-full"
                />
              </div>
              {/* name div*/}
              <div className="capitalize text-">{user.fullName}</div>
            </Link>
          );
        })}
      </div>
    )}
  </aside>
);
};

export default SearchUserModalMobile;
