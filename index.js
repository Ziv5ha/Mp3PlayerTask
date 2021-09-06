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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${durationFormat(song.duration)}.`)
  },
}

function identifySong(id){
  let song = {}
  for (let i of player.songs) if (i.id === id) {song = {id,title,album,artist,duration} = i}
  return song
}

function checkSong(id){
  if (!(identifySong(id).id)) throw "No such song. try another ID."
}

function checkPlaylist(id){
  if (!(identifyPlaylist(id).id)) throw "No such playlist. try another ID."
}

function durationFormat(duration){
  let min = ""
  if (Math.floor(duration/60)>=10) min = `${Math.floor(duration/60)}`
  if (Math.floor(duration/60)>=1 && Math.floor(duration/60)<10) min = `0${Math.floor(duration/60)}`
  if (Math.floor(duration/60)==0) min = "00"
  let sec = ""
  if ((duration%60)>=10) sec = `${duration%60}`
  if ((duration%60)>=1 && (duration%60)<10) sec = `0${duration%60}`
  if ((duration%60)==0) sec = `00`
  return min+":"+sec
}

function playSong(id) {
  checkSong(id)
  return player.playSong(identifySong(id))
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
  checkSong(id)
  player.songs.splice(songIndexByID(id),1)
  player.playlists[isSongInPlaylist(id)].songs.splice(songIndexInPlaylistByID(id),1) 
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

function identifyPlaylist(id){
  let playlist = {}
  for (let i of player.playlists) if (i.id === id) {playlist = {id,title,album,artist,duration} = i}
  return playlist
}

function playlistIndexByID(id){
  for (let i in player.playlists) if(player.playlists[i].id===id) return i
}

function removePlaylist(id) {
  if (!(identifyPlaylist(id).id)) throw "No such playlist."
  else player.playlists.splice(playlistIndexByID(id),1)
  return player.playlists
}

function createPlaylist(name, id) {
  if ((identifyPlaylist(id).id)) throw "ID taken. try another ID."
  while (id === undefined && !(identifyPlaylist(id).id)){              //Gerenrates a random ID based on how many songs there are in the player
    id = Math.floor(Math.random()*10**(Math.floor(1+player.songs.length/10)))
  }
  player.playlists.push({name, id, songs:[]})
  return player
}

function playPlaylist(id) {
  checkPlaylist(id)
  let nowPlayingPlaylist = identifyPlaylist(id).songs
  for (let i of nowPlayingPlaylist) playSong(i)
}

function editPlaylist(playlistId, songId) {
  checkSong(songId)
  checkPlaylist(playlistId)
  if (isSongInPlaylist(songId) === playlistIndexByID(playlistId)) player.playlists[playlistIndexByID(playlistId)].songs.splice(songIndexInPlaylistByID(songId),1)
  else player.playlists[playlistIndexByID(playlistId)].songs.push(songId)
  if (player.playlists[playlistIndexByID(playlistId)].songs.length === 0) player.playlists.splice(playlistIndexByID(playlistId),1)
}

function playlistDuration(id) {
  checkPlaylist(id)
  let time=0
  for (let s of identifyPlaylist(id).songs){
    time += identifySong(s).duration
  }
  return time
}

function removeDoubleSearchResult(result, searchRsult){
  let double = 0
  for (let i of searchRsult.songs) if (i.id === result.id) double++
  if (double > 0) return false
  return true
}

function sortByTitle(a,b){
  if ( a.title < b.title ){
    return -1;
  }
  if ( a.title > b.title ){
    return 1;
  }
  return 0;
}

function searchByQuery(query) {
  query = query.toLowerCase()
  let searchRsult = {playlists:[], songs:[]}
  for (let song of player.songs){
    for (let i in song) if (`${song[i]}`.toLowerCase().includes(query)&& removeDoubleSearchResult(song, searchRsult)) searchRsult.songs.push(song)
  }
  for (let playlist of player.playlists){
    for (let i in playlist) if (`${playlist[i]}`.toLowerCase().includes(query)) searchRsult.playlists.push(playlist)
  }
  if (searchRsult.playlists===[]&&searchRsult.songs===[])return "Nothing found"
  searchRsult.songs.sort(sortByTitle)
  return searchRsult
}
function mmssToS(duration){
  return parseInt(duration.slice(0,duration.indexOf(":"))*60)+parseInt(duration.slice(duration.indexOf(":")+1))
}

function searchByDuration(duration) {
  let timeLength = mmssToS(duration)
  let diffSong = timeLength
  let diffPlaylist = timeLength
  let songLength = 0
  let playlistLength = 0
  for (let song of player.songs) if (Math.abs(song.duration-timeLength)<Math.abs(diffSong)) {diffSong=Math.abs(song.duration-timeLength); songLength = song.duration}
  for (let playlist of player.playlists) if (Math.abs(playlistDuration(playlist.id)-timeLength)<Math.abs(diffPlaylist)) {diffPlaylist=Math.abs(playlistDuration(playlist.id)-timeLength); playlistLength = playlistDuration(playlist.id)}
  for (let i of player.songs) if (i.duration === songLength && diffSong<diffPlaylist) return i
  for (let i of player.playlists) if (playlistDuration(i.id) === playlistLength && diffSong>diffPlaylist) return i
}

console.log(searchByDuration("4:23"))

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
