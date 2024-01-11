import {FaUserFriends, FaImages} from "react-icons/fa"
import { BsSearch} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"
import { MdWbSunny } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";




export const navbarLinks = [
  {
    id: 1,
    icon: <IoMdHome />,
    name: "home",
    link: "/",
  },
  {
    id: 2,
    icon: <FaUserFriends />,
    name: "friends",
    link: "",
  },
  {
    id: 3,
    icon: <BsSearch />,
    name: "search",
    link: "",
  },
  {
    id: 4,
    icon: <CgProfile />,
    name: "profile",
    link: "/updateProfile",
  },
];

export const navbarDesktop = [
  {
    id: 1,
    icon: <MdWbSunny />,
    name: "darkMode",
  },
  // {
  //   id: 2,
  //   icon: <BiMessageSquareDetail />,
  //   name: "messages",
  // },
  // {
  //   id: 3,
  //   icon: <FaBell />,
  //   name: "notifications",
  // },
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

export const setThemeLocalStorage = (theme) => {
  const previousTheme = localStorage.getItem("theme");
  if(previousTheme) {
    return localStorage.setItem("theme", previousTheme);
  }
  localStorage.setItem("theme", theme);
};

export const changeTheme = (theme) => {
  localStorage.setItem("theme", theme);
};