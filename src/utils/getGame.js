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
                      cover.url; 
                      search "${name}"; 
                      where release_dates.platform=${ALL_PLATFORM} 
                      & parent_game = null & cover != null; limit 120;`
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

export const getTracking = async ({id}) => {
  const dataField = `fields name, platforms.name, release_dates.platform, 
                      release_dates.human, release_dates.date, id, 
                      cover.url;
                      where id = (${id.join(',')}) & release_dates.platform=${ALL_PLATFORM} 
                      & parent_game = null & cover != null; limit 120;`
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
export const getSlider = async ({id}) => {
  const dataField = `fields name, 
                      release_dates.human, release_dates.date, id, 
                      screenshots.*;
                      where id = (${id.join(',')}) & release_dates.platform=${ALL_PLATFORM} 
                      & parent_game = null & cover != null; limit 120;`
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
export default getGame