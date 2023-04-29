const NINTENDO = [4,5,18,19,20,21,22,24,33,37,41,130,137,159]
const PLAYSTATION = [7,8,9,38,46,48,165,167]
const XBOX = [11,12,49,169]
const PC = [6]
const all_ids = [...NINTENDO,...PLAYSTATION,...XBOX,...PC]
const ALL_PLATFORM = `(${all_ids.join(',')})`
const NINTENDO_DICT = {
  4: "Nintendo 64",
  5: "Wii",

}
const PLAYSTATION_DICT = {
  7: "PlayStation",
  8: "PlayStation 2",
  9: "PlayStation 3",


}
const XBOX_DICT = {
  11: "Xbox",
  12: "Xbox 360",
  49: "Xbox One",
  169: "Xbox Series"
}
const PC_DICT = {
  6: "Microsoft Windows"
}

export { NINTENDO, PLAYSTATION,XBOX,PC, NINTENDO_DICT, PLAYSTATION_DICT, XBOX_DICT, PC_DICT, ALL_PLATFORM }