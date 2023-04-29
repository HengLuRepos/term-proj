import { NavLink } from "react-router-dom";
import { IoGameController } from 'react-icons/io5'
export default function Header() {
  return (
    <>
      <header>
        <nav>
          <li>
            <NavLink to={`/`}>
            <IoGameController size={28} />
            </NavLink>
          </li>
          <li>
            <NavLink to={`search`}>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to={`tracking`}>
              Tracking
            </NavLink>
          </li>
        </nav>
      </header>
    </>
  )
}