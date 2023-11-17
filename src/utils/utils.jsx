import {FaUserFriends, FaImages} from "react-icons/fa"
import {BsNewspaper, BsSearch} from "react-icons/bs"
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
    icon: <FaImages />,
    name: "posts",
  },
  {
    id: 3,
    icon: <BsSearch />,
    name: "search",
  },
  {
    id: 4,
    icon: <CgProfile />,
    name: "profile",
  },
  {
    id: 5,
    icon: <BsNewspaper />,
    name: "news",
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