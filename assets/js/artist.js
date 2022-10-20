let artistNameArray = window.location.href.split("=");

let buonasalvePlaylistFETCH = [];
window.onload = () => {
  loadJSON();
};

async function loadJSON() {
  let musicResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistNameArray[1]}`);
  let musicObject = await musicResponse.json();
  let musicArray = musicObject.data;
  console.log(musicArray);
  let musicElement = musicArray[0];
  buonasalvePlaylistFETCH.push(musicElement);
  funzioneACaso();
}

function funzioneACaso() {
  let headerTitleArtist = document.getElementById("header_title");

  headerTitleArtist.innerHTML = buonasalvePlaylistFETCH[0].artist.name;
  console.log(headerTitleArtist.innerHTML);
}
