import { Container } from "react-bootstrap"
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
    getGame({name:queryName}).then(data => setGames(data))
  },[queryName])

  const handleButton = (e) => {
    e.stopPropagation()
    console.log("button!")
  }
  const handleCard = () => {
    console.log("card!")
  }

  return (
    <div className="body-content">
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
        
          <GameCard img_url={"https://images.igdb.com/igdb/image/upload/t_1080p/co3p2d.jpg"} 
          name={"The Legend of Zelda: Breath of the Wild and The Legend of Zelda: Breath of the Wild Expansion Pass Bundle"} release_date={"08 Dec 2017"}
          handleButton={handleButton}
          handleCard={handleCard}
          tracking={false}/>
          <GameCard img_url={"https://images.igdb.com/igdb/image/upload/t_1080p/co3p2d.jpg"} 
          name={"The Legend of Zelda: Breath of the Wild and The Legend of Zelda: Breath of the Wild Expansion Pass Bundle"} release_date={"08 Dec 2017"}
          handleButton={handleButton}
          handleCard={handleCard}
          tracking={true}/>

      </div>
    </div>
  )
}
