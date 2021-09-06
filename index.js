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


// -~-~-~-~-~- Identifiers -~-~-~-~-~- //
function identifySong(id){                    //identify a song in the player and returns all the information about it
  let song = {}
  for (let i of player.songs) if (i.id === id) {song = {id,title,album,artist,duration} = i}
  return song
}
function identifyPlaylist(id){                //identify a playlist in the player and returns all the information about it
  let playlist = {}
  for (let i of player.playlists) if (i.id === id) {playlist = {id,title,album,artist,duration} = i}
  return playlist
}
function songIndexByID(id){                   //I forgot that .indexOf is a function in JavaScript 
  for (let i in player.songs) if(player.songs[i].id===id) return i
}
function songIndexInPlaylistByID(id){         //I forgot that .indexOf is a function in JavaScript
  for (let p in player.playlists){
    for (let s in player.playlists[p].songs)  if (player.playlists[p].songs[s]===id) return(s)
  } 
}
function playlistIndexByID(id){               //I forgot that .indexOf is a function in JavaScript
  for (let i in player.playlists) if(player.playlists[i].id===id) return i
}

// -~-~-~-~-~- Conformations -~-~-~-~-~- //
function checkSong(id){           //Checks if the song exists in the player
  if (!(identifySong(id).id)) throw "No such song. try another ID."
}
function checkPlaylist(id){       //Checks if the playlist exists in the player
  if (!(identifyPlaylist(id).id)) throw "No such playlist. try another ID."
}
function isSongInPlaylist(id){    //Checks if the song is in a playlist
  for (let p in player.playlists){
    for (let s in player.playlists[p].songs)  if (player.playlists[p].songs[s]===id) return(p)
  } 
}

// -~-~-~-~-~- Utilities -~-~-~-~-~- //
function removeDoubleSearchResult(result, searchRsult){     //Subfunction to remove the same song from the search result
  let double = 0
  for (let i of searchRsult.songs) if (i.id === result.id) double++
  if (double > 0) return false
  return true
}
function sortByTitle(a,b){                                  //Subfunction to sort the search results by title
  if ( a.title < b.title )return -1;
}
function mmssToS(duration){                                 //Subfunction to convert from "mm:ss" string to duration in seconds
  return parseInt(duration.slice(0,duration.indexOf(":"))*60)+parseInt(duration.slice(duration.indexOf(":")+1))
}
function durationFormat(duration){                          //Subfunction to convert from duration in seconds to "mm:ss" string
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

// -~-~-~-~-~- Main Taks Functions -~-~-~-~-~- //
function playSong(id) {
  checkSong(id)
  return player.playSong(identifySong(id))
}

function removeSong(id) {
  checkSong(id)
  player.songs.splice(songIndexByID(id),1)
  player.playlists[isSongInPlaylist(id)].songs.splice(songIndexInPlaylistByID(id),1) 
  return player.songs
}

function addSong(title, album, artist, duration, id) {
  if ((identifySong(id).id)) throw "ID taken. try another ID."
  while (id === undefined && !(identifySong(id).id)){                         //Gerenrates a random ID based on how many songs there are in the player
    id = Math.floor(Math.random()*10**(Math.floor(1+player.songs.length/10)))
  }
  duration = mmssToS(duration)
  player.songs.push({title, album, artist, duration, id})
  return player
}

function removePlaylist(id) {
  checkPlaylist(id)
  player.playlists.splice(playlistIndexByID(id),1)
  return player.playlists
}

function createPlaylist(name, id) {
  if ((identifyPlaylist(id).id)) throw "ID taken. try another ID."
  if ((identifyPlaylist(id).name)) throw "Name taken. try editing the playlins instead."
  while (id === undefined && !(identifyPlaylist(id).id)){                      //Gerenrates a random ID based on how many playlist there are in the player
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
  if (isSongInPlaylist(songId) === playlistIndexByID(playlistId)) player.playlists[playlistIndexByID(playlistId)].songs.splice(songIndexInPlaylistByID(songId),1) //Remove an exixting song from a playlist
  else player.playlists[playlistIndexByID(playlistId)].songs.push(songId)                                                                                         //Add a song to a playlist
  if (player.playlists[playlistIndexByID(playlistId)].songs.length === 0) player.playlists.splice(playlistIndexByID(playlistId),1)                                //Delete empty playlists
}

function playlistDuration(id) {
  checkPlaylist(id)
  let time=0
  for (let s of identifyPlaylist(id).songs){
    time += identifySong(s).duration
  }
  return time
}

function searchByQuery(query) {
  query = query.toLowerCase()
  let searchRsult = {playlists:[], songs:[]}
  for (let song of player.songs){              //Searching the query in every song and avoiding giving the same saong twice
    for (let i in song) if (`${song[i]}`.toLowerCase().includes(query)&& removeDoubleSearchResult(song, searchRsult)) searchRsult.songs.push(song)
  }
  for (let playlist of player.playlists){      //Sreaching in query in every playlist. Playlists can't have the same name.
    for (let i in playlist) if (`${playlist[i]}`.toLowerCase().includes(query)) searchRsult.playlists.push(playlist)
  }
  if (searchRsult.playlists===[]&&searchRsult.songs===[])return "Nothing found"
  searchRsult.songs.sort(sortByTitle)
  return searchRsult
}

function searchByDuration(duration) {
  let timeLength = mmssToS(duration)
  let diffSong = timeLength
  let diffPlaylist = timeLength
  let songLength = 0
  let playlistLength = 0
  for (let song of player.songs) if (Math.abs(song.duration-timeLength)<Math.abs(diffSong)) {diffSong=Math.abs(song.duration-timeLength); songLength = song.duration}                                                                                  
  //Checks if a song's duration is closer to the given duration than the previous song. Then saves that songs length and updates the diffence variable 
  for (let playlist of player.playlists) if (Math.abs(playlistDuration(playlist.id)-timeLength)<Math.abs(diffPlaylist)) {diffPlaylist=Math.abs(playlistDuration(playlist.id)-timeLength); playlistLength = playlistDuration(playlist.id)}
  //Checks if a playlist's duration is closer to the given duration than the previous playlist. Then saves that playlist's length and updates the diffence variable
  for (let i of player.songs) if (i.duration === songLength && diffSong<diffPlaylist) return i
  //If a song's duration is closer to the given duration than a playlist's duration. This line returns that song's details
  for (let i of player.playlists) if (playlistDuration(i.id) === playlistLength && diffSong>diffPlaylist) return i
  //If a playlist's duration is closer to the given duration than a song's duration. This line returns that playlist's details
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
