import { navbarLinks } from "../utils/utils"
import { Link } from "react-router-dom"
import { SlLogout } from "react-icons/sl";
import {closeFriendsModal, closeSearchUserModalMobile, logoutUser, openSearchUserModalMobile} from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { toggleFriendsModal } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const logoutUserFunction = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const openAndCloseFriendsModal = () => {
    dispatch(toggleFriendsModal());
  }

  const openAndCloseSearchModal = () => {
    dispatch(openSearchUserModalMobile());
  }

  const closeModal = () => {
    dispatch(closeFriendsModal());
    dispatch(closeSearchUserModalMobile());
  };

  return (
    <section className="w-full">
      <div className="flex justify-center gap-10">
        {navbarLinks.map((link) => {
          return (
            <div key={link.id}>
              <Link to={link.link} className="text-cyan-600 text-xl dark:text-cyan-500" onClick={link.name === 'friends' ? openAndCloseFriendsModal : link.name === 'search' ? openAndCloseSearchModal : link.name === "home" || link.name ===  "profile" ? closeModal : undefined}>
                {link.icon}
              </Link>
            </div>
          );
        })}
        <div>
          <Link to={"#"} className="text-cyan-600 text-xl" onClick={logoutUserFunction}>
            <SlLogout />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Navbar