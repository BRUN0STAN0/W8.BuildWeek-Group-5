let previewImg = document.querySelectorAll("#preview-img");
let audio;
let titles = document.querySelectorAll("#title-song");
let authors = document.querySelectorAll("#author");
let navbarLeft = document.getElementById("navbar-left");
let navbarRight = document.getElementById("navbar-right");

let buonasalvePlaylist = ["ads", "Monday", "Left", "Right", "Up", "Best", "Life", "ciia", "Summer", "Cipolli", "ludovico", "giuliano", "Motivation", "ciao", "Kill", "We", "Possiamo"];
let buonasalvePlaylistFETCH = [];
window.onload = () => {
  loadJSON();
};

async function loadJSON() {
  for (let playlist of buonasalvePlaylist) {
    let musicResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${playlist}`);
    let musicObject = await musicResponse.json();
    let musicArray = musicObject.data;
    let musicElement = musicArray[0];
    buonasalvePlaylistFETCH.push(musicElement);
  }
  iterateArray(buonasalvePlaylistFETCH);
}

function iterateArray(musicArray) {
  // * START CICLO PER LINKARE L'AUDIO
  for (let preview of previewImg) {
    let p = document.createElement("p");
    p.classList.add("link-mp3");
    preview.parentElement.appendChild(p);
  }
  let par = document.querySelectorAll(".link-mp3");
  for (let i = 0; i < 7; i++) {
    par[i].innerHTML = musicArray[i].preview;
  }
  // ! END CICLO PER LINKARE L'AUDIO
  for (let i = 0; i < 16; i++) {
    previewImg[i].src = musicArray[i].album.cover;
    // console.log(previewImg[i].parentElement.parentElement);
  }
  for (let i = 0; i < 7; i++) {
    authors[i].innerHTML = musicArray[i].artist.name;
    authors[i].outerHTML = `<a href="./artist.html?id=${musicArray[i].artist.id}">${authors[i].outerHTML} </a>`;
    titles[i].innerHTML = musicArray[i].title_short;
  }
  for (let i = 10; i < 15; i++) {
    previewImg[i].parentElement.parentElement.outerHTML = `<a href="./album.html?id=${musicArray[i].album.id}">${previewImg[i].parentElement.parentElement.outerHTML}</a>`;
  }
}

// * START TRACKBAR

let timer = 0;
let timer2 = 100;
let pause = document.getElementById("pause");
let play = document.getElementById("play");
let playAds = document.getElementById("play-ads");
let isPlay = false;
let seconds = 0;
let minutes = 0;
let trackSeconds = document.getElementById("track-seconds");
let trackDefault = document.getElementsByClassName("track-default")[0];

playAds.addEventListener("click", playFunction);
play.addEventListener("click", playFunctionNavbar);
pause.addEventListener("click", pauseFunction);

function playFunction() {
  if (isPlay) {
    pauseFunction();
    resetTrackBarSeconds();
  }

  navbarLeft.style.opacity = 1;
  navbarRight.style.opacity = 1;
  play.style.display = "none";
  pause.style.display = "inline";
  pauseTrackBarSeconds();
  pauseSeconds();
  selectSongPlay(previewImg);
  isPlay = true;
}

function playFunctionNavbar() {
  if (isPlay) {
    pauseFunction();
    resetTrackBarSeconds();
  }
  navbarLeft.style.opacity = 1;
  navbarRight.style.opacity = 1;
  play.style.display = "none";
  pause.style.display = "inline";
  pauseTrackBarSeconds();
  pauseSeconds();
  audio.play();
  isPlay = true;
}

function pauseFunction() {
  isPlay = false;
  play.style.display = "inline";
  pause.style.display = "none";
  audio.pause();
  intervalTrackBarSeconds;
  intervalSeconds;
}

function selectSongPlay(eventClick) {
  previewImg[previewImg.length - 1].src = buonasalvePlaylistFETCH[0].album.cover;
  titles[titles.length - 1].innerHTML = buonasalvePlaylistFETCH[0].title_short;
  authors[authors.length - 1].innerHTML = buonasalvePlaylistFETCH[0].artist.name;
  let linkMp3 = eventClick[0].parentElement.children[3].innerHTML;
  audio = new Audio(linkMp3);
  audio.play();
}

function startTrackBarSeconds() {
  if (isPlay) {
    trackSeconds.style.width = `${timer}%`;
    trackDefault.style.width = `${timer2}%`;
    if (timer === 100) {
      pauseTrackBarSeconds();
    }
    timer++;
    timer2--;
  }
}

function resetTrackBarSeconds() {
  trackSeconds.style.width = `0%`;
  trackDefault.style.width = `100%`;
  timer = 0;
  timer2 = 100;
  seconds = 0;
  minutes = 0;
}
const intervalTrackBarSeconds = setInterval(startTrackBarSeconds, 300);

function pauseTrackBarSeconds() {
  clearInterval(startTrackBarSeconds);
}

function startSeconds() {
  let currentSeconds = document.getElementById("current-seconds");
  currentSeconds.innerHTML = `${minutes}.${seconds}`;
  if (isPlay) {
    // if (seconds === 59) {
    //   seconds = 0;
    //   minutes++;
    // }
    // if (minutes == 2) {
    //   pauseTrackBarSeconds();
    // }

    if (seconds == 30) {
      pauseTrackBarSeconds();
      resetTrackBarSeconds();
      seconds = 0;
      isPlay = false;
    }
    seconds++;
  }
}

const intervalSeconds = setInterval(startSeconds, 1000);

function pauseSeconds() {
  clearInterval(startSeconds);
}
// ! END TRACK BAR

// * START VOLUME
let oldXPos = 0;
let isDragging = false;

let volumeSet = document.getElementById("volume-set");
let volume = document.getElementsByClassName("volume")[0];
let mouseIsDown = false;

volume.addEventListener("mousedown", () => {
  mouseIsDown = true;
});

volume.addEventListener("mouseup", () => {
  mouseIsDown = false;
});

const volumeRangeWidth = volume.getBoundingClientRect().width;
volumeSet.addEventListener("mousemove", function volumeSlide(event) {
  if (mouseIsDown) {
    let x = event.offsetX;
    if (event.target.className == "volume-set") {
      x = Math.floor(x);
      if (x < 0) x = 0;
      if (x > volumeRangeWidth) x = volumeRangeWidth;
      volumeSet.style.width = x + 5 + "px";
    }
  }
});

// ! END VOLUME
