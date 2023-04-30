import SearchField from "../components/SearchField"
import { useState, useEffect } from "react"
import getGame from "../utils/getGame"
import { ALL_PLATFORM } from "../utils/platform"
import GameCard from "../components/GameCard"
import { changeTimestamp, changeUrl } from "../utils/preprocess"

export default function Search() {
  const [name, setName] = useState("")
  const [queryName, setQueryName] = useState("")
  const [queryState, setQueryState] = useState({})
  const [games, setGames] = useState([])

  const [trackingId, setTrackingId] = useState(()=>{
    const tracking = sessionStorage.getItem("tracking");
    const ids = JSON.parse(tracking);
    return ids || [];
  })
  const trackingSet = new Set(trackingId)
  useEffect(() => {
    sessionStorage.setItem("tracking",JSON.stringify(trackingId))
  },[trackingId])

  //only triggers when queryName changes, otherwise just fliter games.
  useEffect(() => {
    getGame({name:queryName}).then(data => {
      data.forEach((game) => changeUrl(game))
      data.forEach((game) => changeTimestamp(game))
      setGames(data)
    })
  },[queryName])

  const handleButton = (e,id) => {
    e.stopPropagation()
    if(trackingSet.has(id)) {
      trackingSet.delete(id)
    } else {
      trackingSet.add(id)
    }
    setTrackingId([...trackingSet])
  }
  const handleCard = () => {
    console.log("card!")
  }

  return (
    <>
      <SearchField
        name={name} 
        handleChange={(e) => setName(e.target.value)} 
        handleSearch={() => setQueryName(name)}
        handleEnter={e => {
          if(e.key === "Enter") {
            setQueryName(name)
          }
        }}
      />
      <div className="result-field">
        {games.map(game =>  (
        <GameCard 
          key={game.id}
          gameId={game.id}
          img_url={game.cover.url} 
          name={game.name}
          release_date={game.release_dates} 
          handleButton={handleButton}
          handleCard={handleCard}
          trackButton={true}
          platforms={game.platforms}
          tracking={trackingId.includes(game.id)}/>
        ))}


      </div>
    </>
  )
}
