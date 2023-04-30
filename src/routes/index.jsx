import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getSlider } from '../utils/getGame';
import { useLoaderData } from 'react-router-dom';
import preprocess from '../utils/preprocess';
import { minBy } from 'lodash';
import { useNavigate } from 'react-router-dom';
export async function loader() {
  const games = await getSlider({id:[228542,119388,183617]})
  return {games}
}
export default function Index() {
  const [index, setIndex] = useState(0)
  const {games} = useLoaderData()
  const navigate = useNavigate()
  games.forEach((game) => {
    preprocess(game)
  });
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const handleMouseOver = (e) => {
    e.target.style.cursor="pointer"
  }
  return(
    <>
      <Carousel fade activeIndex={index} onSelect={handleSelect}>
        {games.map(game => (
          <Carousel.Item 
            key={game.id} 
            onClick={() => navigate(`games/${game.id}`)}
            onMouseOver={handleMouseOver}>
            <img
              className="d-block w-100"
              src={game.screenshots[0].url}
              alt={game.name}
            />
            <Carousel.Caption>
              <h3>{game.name}</h3>
              <p>Coming in {minBy(game.release_dates,'date').human}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
    </>
  )
}