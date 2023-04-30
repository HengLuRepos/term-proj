import { useLoaderData } from "react-router-dom"
import { getDetails } from "../utils/getGame"
import preprocess from "../utils/preprocess"

export const loader = async ({ params }) =>{
  const games = await getDetails({id:params.gameid})
  games.forEach((game) => preprocess(game))
  return { games }
}
export default function GameDetails() {
  const { games } = useLoaderData()
  
  return (
    <div className="body-content details">
      <h3>Hi</h3>
    </div>
  )
}