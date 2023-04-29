import SearchField from "../components/SearchField"
import { useState, useEffect } from "react"
import getGame from "../utils/getGame"
import { ALL_PLATFORM } from "../utils/platform"
import GameCard from "../components/GameCard"

export default function Search() {
  const [name, setName] = useState("")
  const [queryName, setQueryName] = useState("")
  const [queryState, setQueryState] = useState({})
  const [games, setGames] = useState([])
  //only triggers when queryName changes, otherwise just fliter games.
  useEffect(() => {
    getGame({name:queryName}).then(data => {
      data.forEach((game) => {
        let urlArray = game.cover.url.split("/")
        urlArray.splice(0,2)
        urlArray[4] = 't_1080p'
        game.cover.url = `https://${urlArray.join("/")}`
      })
      setGames(data)
    })
  },[queryName])

  const handleButton = (e) => {
    e.stopPropagation()
    console.log("button!")
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
          platforms={game.platforms}
          tracking={false}/>
        ))}


      </div>
    </>
  )
}
