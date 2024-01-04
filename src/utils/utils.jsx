import {FaUserFriends, FaImages} from "react-icons/fa"
import { BsSearch} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"
import { MdWbSunny } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaBell } from "react-icons/fa";




export const navbarLinks = [
  {
    id: 1,
    icon: <FaUserFriends />,
    name: "friends",
  },
  {
    id: 2,
    icon: <BsSearch />,
    name: "search",
  },
  {
    id: 3,
    icon: <CgProfile />,
    name: "profile",
  },
];

export const navbarDesktop = [
  {
    id: 1,
    icon: <MdWbSunny />,
    name: "darkMode",
  },
  {
    id: 2,
    icon: <BiMessageSquareDetail />,
    name: "messages",
  },
  {
    id: 3,
    icon: <FaBell />,
    name: "notifications",
  },
];

export const createPostLinks = [
  {
    id: 1,
    icon: <FaImages />,
    name: "image",
  },
];

export const setUserLocalStorage = (user) => {
  const previousData = localStorage.getItem("userData");
            if (previousData) {
                localStorage.removeItem("userData");
            }
            localStorage.setItem("userData", JSON.stringify(user));
};

export const getUserLocalStorage = () => {
          JSON.parse(localStorage.getItem("userData"));
        };