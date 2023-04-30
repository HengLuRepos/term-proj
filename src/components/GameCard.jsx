import { BsXbox, BsPlaystation, BsNintendoSwitch, BsWindows } from 'react-icons/bs'
import { GiCrossedSwords } from 'react-icons/gi'
import { NINTENDO, XBOX, PLAYSTATION, PC } from '../utils/platform'
import { minBy } from 'lodash'
export default function GameCard({name, 
  gameId, 
  img_url, 
  platforms, 
  release_date, 
  handleButton, 
  handleCard, 
  tracking, 
  deletable,
  handleDelete,
  trackButton}) {
  const names = name.split(" ")
  const first_release_date = minBy(release_date,'date')
  const platformIds = platforms.map((plt) => plt.id)
  let [ns, xbox, ps, pc] = [0,0,0,0]
  platformIds.forEach((id) => {
    if(XBOX.includes(id)){
      xbox += 1;
    }
    if(PLAYSTATION.includes(id)){
      ps += 1;
    }
    if(PC.includes(id)){
      pc += 1;
    }
    if(NINTENDO.includes(id)){
      ns += 1;
    }
  })
  return(
    <div className='card' onClick={handleCard}>
      <img src={img_url} alt='cover'/>
      <div className='card-body'>
        <div>{name}</div>
        <div>Release Date: {first_release_date ? first_release_date.human : "Unknown"}</div>
        <div>
          {ns>0 && <BsNintendoSwitch size={28}/>}
          {xbox>0 && <BsXbox size={28}/>}
          {ps>0 && <BsPlaystation size={28}/>}
          {pc>0 && <BsWindows size={28}/>}
        </div>
        {trackButton && <button type='button' onClick={(e) => handleButton(e,gameId)} className={tracking ? "tracking" : ""}><span>track</span></button>}
        {deletable && <span><button type='button' onClick={(e) => handleDelete(e,gameId)} className='cross'><GiCrossedSwords /></button></span>}
      </div>
    </div>
  )
}
