//Search Songs from API
const searchSongs = () =>{
    const searchText = document.getElementById("search-field").value; 
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError(error))
}

//Display Songs
const displaySongs = songs =>{
    const songContainer = document.getElementById('song-container');
    document.getElementById("search-field").value = "";
    document.getElementById('lyrics-container').innerHTML = "";
    document.getElementById('song-container').innerHTML = "";
    document.getElementById('err-msg').innerHTML = "";
    
    songs.forEach(song => {
        // console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv);
    });
}

//Get lyrics from API
const getLyrics = (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError(error))
}

//Display lyrics
const displayLyrics = lyrics => {
    const lyricsContainer = document.getElementById('lyrics-container');
    document.getElementById('err-msg').innerText = "";
    if(lyrics != ""){
        lyricsContainer.innerText = lyrics;
    }else{
        const errorMsg = document.getElementById('err-msg');
        errorMsg.innerText = "Sorry!!! Lyrics not found..." 
    }
    
}

//Error handling
const displayError = () =>{
    const errorMsg = document.getElementById('err-msg');
    errorMsg.innerText = "I failed to load data, please try again leter!!!"
}

//Submit with Enter key
const input = document.getElementById("search-field");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("search-button").click();
  }
});
