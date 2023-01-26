import { NavLink } from "react-router-dom"

import links from "../utils/Links"

const NavLinks = (toggleSidebar) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link

        return (
          <NavLink
            to={path}
            className={(
              { isActive } //isActive is a prop from NavLink default
            ) => (isActive ? "nav-link active" : "nav-link")}
            key={id}
            onClick={toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
export default NavLinks