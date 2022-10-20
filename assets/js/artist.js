let queryString = new URLSearchParams(window.location.search);
let id = queryString.get("id");

window.onload = () => {
  loadJSON();
};

async function loadJSON() {
  let musicResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`);
  let musicObject = await musicResponse.json();
  console.log(musicObject);
  titoloHeader(musicObject);
}

function titoloHeader(music) {
  let headerTitleArtist = document.getElementById("header_title");
  headerTitleArtist.innerHTML = music.name;
  let headerPreviewImg = document.getElementById("header_previewImg");
  headerPreviewImg.style.backgroundImage = `url(${music.picture_big})`;
}
