const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${durationFormat(song)}.`)
  },
}

function identifySong(id){
  let song = {}
  for (let i of player.songs) if (i.id === id) {song = {id,title,album,artist,duration} = i}
  return song
}

function durationFormat(song){
  let min = ""
  if (Math.floor(song.duration/60)>=10) min = `${Math.floor(song.duration/60)}`
  if (Math.floor(song.duration/60)>=1 && Math.floor(song.duration/60)<10) min = `0${Math.floor(song.duration/60)}`
  if (Math.floor(song.duration/60)==0) min = "00"
  let sec = ""
  if ((song.duration%60)>=10) sec = `${song.duration%60}`
  if ((song.duration%60)>=1 && (song.duration%60)<10) sec = `0${song.duration%60}`
  if ((song.duration%60)==0) sec = `00`
  return min+":"+sec
}

function playSong(id) {
  if (!(identifySong(id).id)) throw "No such song. try another ID."
  else return player.playSong(identifySong(id))
}


function songIndexByID(id){
  for (let i in player.songs) if(player.songs[i].id===id) return i
}
function songIndexInPlaylistByID(id){
  for (let p in player.playlists){
    for (let s in player.playlists[p].songs)  if (player.playlists[p].songs[s]===id) return(s)
  } 
}
function isSongInPlaylist(id){
  for (let p in player.playlists){
    for (let s in player.playlists[p].songs)  if (player.playlists[p].songs[s]===id) return(p)
  } 
}

function removeSong(id) {
  if (!(identifySong(id).id)) throw "No such song."
  else{
    player.songs.splice(songIndexByID(id),1)
    player.playlists[isSongInPlaylist(id)].songs.splice(songIndexInPlaylistByID(id),1)
    } 
  
  return player.songs
}

function addSong(title, album, artist, duration, id) {
  if ((identifySong(id).id)) throw "ID taken. try another ID."
  while (id === undefined && !(identifySong(id).id)){              //Gerenrates a random ID based on how many songs there are in the player
    id = Math.floor(Math.random()*10**(Math.floor(1+player.songs.length/10)))
  }
  duration = parseInt(duration.slice(0,Math.floor(duration.length/2)))*60+parseInt(duration.slice(Math.ceil(duration.length/2)))
  player.songs.push({title, album, artist, duration, id})
  return player
}

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
