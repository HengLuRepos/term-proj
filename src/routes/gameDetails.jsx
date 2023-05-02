import { useLoaderData } from "react-router-dom"
import { getDetails } from "../utils/getGame"
import preprocess, { changeScreenShotURL } from "../utils/preprocess"
import { minBy } from "lodash"
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react"
import YouTube from 'react-youtube'
export const loader = async ({ params }) =>{
  const data = await getDetails({id:params.gameid})
  preprocess(data)
  return { data }
}
export default function GameDetails() {
  const { data } = useLoaderData()
  const game = data[0]
  const first_release_date = minBy(game.release_dates,'date')
  const [index, setIndex] = useState(0)
  const [video, setVideo] = useState(0)
  const [interval, setInterval] = useState(5000)
  const handleSelect = (selectedInd, e) => {
    setIndex(selectedInd)
  }
  const handleVideo = (selected, e) => {
    setVideo(selected)
  }
  const handlePlay = () => {
    setInterval(null)
  }
  const handlePause = () => {
    setInterval(5000)
  }
  const handleEnd = () => {
    setVideo((video + 1) % game.videos.length)
  }
  return (
    <div className="body-content">
      <h2>{game.name}</h2>
      <p>{game.summary}</p>
      <p>Release Date: {first_release_date ? first_release_date.human : "Unknown"}</p>
      <p>Platforms: {game.platforms.map((plt) => plt.name)}</p>
      {game.websites && <a href={minBy(game.websites, 'category').url} target="_blank">Official Website</a>}
      {game.storyline && 
      (<>
        <h3>Storyline</h3>
        <p>{game.storyline}</p>
      </>)}
      <h3>ScreenShots</h3>
        <Carousel fade activeIndex={index} onSelect={handleSelect}>
          {game.screenshots.map((sc) => (
            <Carousel.Item
              key={sc.id}
              onMouseOver={(e) => e.target.style.cursor = 'pointer'}>
              <img className="d-block w-100" src={changeScreenShotURL(sc.url)} alt="screenshot"/>
            </Carousel.Item>
          ))}
        </Carousel>
      <h3>Videos</h3>
      <Carousel interval={interval} activeIndex={video} onSelect={handleVideo}>
        {game.videos.map((video) => (
          <Carousel.Item key={video.id}>
            <YouTube 
              videoId={video.video_id} 
              iframeClassName="d-block w-100" 
              onPlay={handlePlay}
              onPause={handlePause}
              onEnd={handleEnd}/>
          </Carousel.Item>
        ))}
      </Carousel>

      
    </div>
  )
}
