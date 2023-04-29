import { BsSteam, BsXbox, BsPlaystation, BsNintendoSwitch, BsWindows } from 'react-icons/bs'
import { NINTENDO, XBOX, PLAYSTATION, PC} from '../utils/platform'
import { Card, Button } from 'react-bootstrap'
export default function GameCard({name, img_url, platformIds, release_date, handleButton, handleCard, tracking}) {
  const names = name.split(" ")
  return(
    <div className='card' onClick={handleCard}>
      <img src={img_url} alt='cover'/>
      <div className='card-body'>
        <div>{names.length > 8 ? name.split(" ",8).join(" ") + "..." : names.join(" ")}</div>
        <div>Release: {release_date}</div>
        <div><BsNintendoSwitch size={28}/><BsNintendoSwitch size={28}/><BsNintendoSwitch size={28}/><BsNintendoSwitch size={28}/></div>
        <button type='button' onClick={handleButton} className={tracking ? "tracking" : ""}><span>track</span></button>
      </div>
    </div>
  )
}

export function TrackingCard() {

}