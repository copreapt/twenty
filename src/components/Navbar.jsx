import { navbarLinks } from "../utils/utils"
import { Link } from "react-router-dom"
import { SlLogout } from "react-icons/sl";
import { useDispatch } from "react-redux";
import {logoutUser} from "../features/user/userSlice";

const Navbar = () => {

  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <section className="w-2/4">
      <div className="flex justify-between">
        {navbarLinks.map((link) => {
          return (
            <div key={link.id}>
              <Link to={"#"} className="text-cyan-600 text-xl">
                {link.icon}
              </Link>
              <span className="hidden">{link.name}</span>
            </div>
          );
        })}
        <div>
          <Link to={"#"} className="text-cyan-600 text-xl" onClick={logout}>
            <SlLogout />
          </Link>
          <span className="hidden">Settings</span>
        </div>
      </div>
    </section>
  );
}

export default Navbar