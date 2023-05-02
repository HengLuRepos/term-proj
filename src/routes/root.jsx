import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
export default function Root() {
  window.YTConfig = {
    host: 'https://www.youtube.com' 
  } 
  return (
    <>
      <Header />
      <div id="details">
        <Outlet />
      </div>
    </>
  )
}
