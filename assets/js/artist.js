function funzioneACaso() {
  document.location.href = "artist.html";
  let headerTitleArtist = document.getElementById("header_title");

  headerTitleArtist.innerHTML = buonasalvePlaylistFETCH[i].artist.name;
  console.log(headerTitleArtist.innerHTML);
}
