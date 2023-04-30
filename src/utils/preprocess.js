export const changeUrl = (game) => {
  let urlArray = game.cover.url.split("/")
  urlArray.splice(0,2)
  urlArray[4] = 't_1080p'
  game.cover.url = `https://${urlArray.join("/")}`
}
export const changeTimestamp = (game) => {
  game.release_dates.filter((date) => date.date *= 1000)
}
export const changeScreenShot = (game) => {
  game.screenshots.map((sc) => {
    let urlArray = sc.url.split("/")
    urlArray.splice(0,2)
    urlArray[4] = 't_1080p'
    sc.url = `https://${urlArray.join("/")}`
  })
}
export default function preprocess(game) {
  if(game.cover) changeUrl(game);
  if(game.release_dates) changeTimestamp(game);
  if(game.screenshots) changeScreenShot(game);
}