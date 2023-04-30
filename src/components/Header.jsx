import { NavLink } from "react-router-dom";
import { IoGameController } from 'react-icons/io5'
export default function Header() {
  return (
    <>
      <header>
        <nav>
          <li>
            <NavLink to={`${import.meta.env.BASE_URL}`}>
            <IoGameController size={28} />
            </NavLink>
          </li>
          <li>
            <NavLink to={`${import.meta.env.BASE_URL}search`}>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to={`${import.meta.env.BASE_URL}tracking`}>
              Tracking
            </NavLink>
          </li>
        </nav>
      </header>
    </>
  )
}