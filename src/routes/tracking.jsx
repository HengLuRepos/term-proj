import { useEffect, useState } from "react"
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import GameCard from "../components/GameCard"
import { getTracking } from "../utils/getGame"
import { changeTimestamp, changeUrl } from "../utils/preprocess"
import { minBy } from "lodash"
export default function Tracking() {
  const [upcoming, setUpcoming] = useState(true)
  const [released, setReleased] = useState(true)
  const [trackingId, setTrackingId] = useState(()=>{
    const tracking = localStorage.getItem("tracking");
    const ids = JSON.parse(tracking);
    return ids || [];
  })
  const [games, setGames] = useState([])
  useEffect(() => {
    getTracking({id:trackingId}).then(data => {
      data.forEach((game) => changeUrl(game))
      data.forEach((game) => changeTimestamp(game))
      setGames(data)
    })
  },[])
  const handleUpcomingClick = () => {
    setUpcoming(!upcoming)
  }
  const handleReleasedClick = () => {
    setReleased(!released)
  }
  const handleDelete = (e,id) => {
    e.stopPropagation()
    const trackingSet = new Set(trackingId)
    trackingSet.delete(id)
    setTrackingId([...trackingSet])
    setGames(games.filter((game) => trackingSet.has(game.id)))
    localStorage.setItem("tracking", JSON.stringify(trackingId))
  }
  return (
    <>
        <div className="upcoming">
          <button type="button" onClick={handleUpcomingClick}>
            {upcoming ? <AiFillCaretDown size={28} /> : <AiFillCaretRight size={28}/>} Upcoming
          </button>
          {upcoming && <div className="upcoming-content">
          {games.filter((game) => {
            const first_release_date = minBy(game.release_dates,"date")
            return first_release_date.date >= Date.now()
          }).map(game =>  (
            <GameCard 
              key={game.id}
              gameId={game.id}
              img_url={game.cover.url} 
              name={game.name}
              release_date={game.release_dates} 
              platforms={game.platforms}
              tracking={trackingId.includes(game.id)}
              trackButton={false}
              deletable={true}
              handleDelete={handleDelete}/>
            ))}
          </div>}
        </div>
        <div className="released">
          <button type="button" onClick={handleReleasedClick}>
            {released ? <AiFillCaretDown size={28} /> : <AiFillCaretRight size={28}/>} Released
          </button>
          {released && <div className="released-content">
          {games.filter((game) => {
            const first_release_date = minBy(game.release_dates,"date")
            return first_release_date.date < Date.now()
          }).map(game =>  (
            <GameCard 
              key={game.id}
              gameId={game.id}
              img_url={game.cover.url} 
              name={game.name}
              release_date={game.release_dates} 
              platforms={game.platforms}
              tracking={trackingId.includes(game.id)}
              trackButton={false}
              deletable={true}
              handleDelete={handleDelete}/>
            ))}
          </div>} 
        </div>
    </>
  )
}