import {FaUserFriends, FaImages} from "react-icons/fa"
import {BsNewspaper, BsSearch} from "react-icons/bs"
import {CgProfile} from "react-icons/cg"


export const navbarLinks = [
    {
        id:1,
        icon:<FaUserFriends/>,
        name:"friends",
    },
    {
        id:2,
        icon:<FaImages />,
        name:"posts",
    },
    {
        id:3,
        icon:<BsSearch />,
        name:"search",
    },
    {
        id:4,
        icon:<CgProfile />,
        name:"profile",
    },
    {
        id:5,
        icon:<BsNewspaper />,
        name:"news",
    },
]