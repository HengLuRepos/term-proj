import axios from "axios";
import { ALL_PLATFORM } from "./platform";
const headers = {
  "x-api-key":import.meta.env.VITE_AWS_API_KEY
}
const IGDB = import.meta.env.VITE_AWS_API_DNS;
const getGame = async ({name}) => {
  /**
   * get games whose title contains "name", and get released in (minReleaseDate, maxReleaseDate),
   * if min is not provided, 0 is used
   * if max is not provided, the timestamp of Jan 1 2024 is used
   * 
   * axios returns:
   * gameID
   * platforms: array of platform objects {id, name}
   * release_dates: array of objects {id, human, platform}
   * cover: object {id, url}
   * genres: array of genre objects {id, name}
   */
  const dataField = `fields name, platforms.name, release_dates.platform, 
                      release_dates.human, release_dates.date, id, 
                      total_rating, cover.url, genres.name; 
                      search "${name}"; 
                      where release_dates.platform=${ALL_PLATFORM}; limit 120;`
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: IGDB,
    headers: {
      ...headers,
      'Content-Type': 'text/plain',
    },
    data: dataField
  };
  let response = await axios.request(config);
  let data = await response.data
  return data
}

const getDetails = async ({id}) => {

}
export default getGame