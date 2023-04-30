import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getSlider } from '../utils/getGame';
import { useLoaderData } from 'react-router-dom';
import preprocess from '../utils/preprocess';
export async function loader() {
  const games = await getSlider({id:[228542,119388,183617]})
  return {games}
}
export default function Index() {
  const [index, setIndex] = useState(0)
  const {games} = useLoaderData()
  games.forEach((game) => {
    preprocess(game)
  });
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return(
    <>
      <Carousel fade activeIndex={index} onSelect={handleSelect}>
        {games.map(game => (
          <Carousel.Item key={game.id}>
            <img
              className="d-block w-100"
              src={game.screenshots[0].url}
              alt={game.name}
            />
            <Carousel.Caption>
              <h3>{game.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
    </>
  )
}