import { NavLink } from "react-router-dom";
import { IoGameController } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate()
  const handleHover = (e) => {
    e.target.style.cursor = 'pointer'
  }
  return (
    <>
      <header>
        <nav>
          <li>
            <IoGameController 
              size={28} 
              onClick={() => navigate(`${import.meta.env.BASE_URL}`)} 
              onMouseOver={handleHover}/>
          </li>
          <li>
            <div 
              onClick={() => navigate(`${import.meta.env.BASE_URL}search`)}
              onMouseOver={handleHover}
            >Search</div>
          </li>
          <li>
            <div 
              onClick={() => navigate(`${import.meta.env.BASE_URL}tracking`)}
              onMouseOver={handleHover}
            >Tracking</div>
          </li>
        </nav>
      </header>
    </>
  )
}