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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${Math.floor(song.duration/60)}:${song.duration%60}.`)
  },
}

function identifySong(id){
  let song = {}
  for (let i of player.songs) if (i.id === id) {song = {id,title,album,artist,duration} = i}
  return song
}

function playSong(id) {
  if (!(identifySong(id))) throw "No such song. try another ID."
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
  if (!(identifySong(id))) throw "No such song."
  else{
    player.songs.splice(songIndexByID(id),1)
    player.playlists[isSongInPlaylist(id)].songs.splice(songIndexInPlaylistByID(id),1)
    } 
  
  return player.songs
}

function addSong(title, album, artist, duration, id) {
  // your code here
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
