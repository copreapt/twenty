import { navbarLinks } from "../utils/utils"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <section className="w-2/4">
      <div className="flex justify-between">
        {navbarLinks.map((link) => {
          return <div key={link.id}>
            <Link to={'#'} className="text-cyan-600 text-xl">{link.icon}</Link>
            <span className="hidden">{link.name}</span>
          </div>
        })}
      </div>
    </section>
  )
}

export default Navbar