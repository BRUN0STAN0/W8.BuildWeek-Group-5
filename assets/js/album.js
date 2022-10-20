let queryString = new URLSearchParams(window.location.search);
let id = queryString.get("id");
let musicObject;

window.onload = () => {
  loadJSON();
};

async function loadJSON() {
  let musicResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`);
  musicObject = await musicResponse.json();
  let musicArray = musicObject.tracks.data;
  console.log(musicArray);
  renderMusic(musicArray);
}

function renderMusic(music) {
  //   let titleArtist = document.getElementById("title-artis");
  let titleSong = document.getElementById("title-song-2");
  titleSong.innerHTML = music[0].title_short;
  let headerImg = document.getElementById("header-img");
  headerImg.src = music[0].album.cover_medium;
  let authorSong = document.getElementById("author-song");
  authorSong.innerHTML = music[0].artist.name;
  //   let titleSong = document.getElementById("title-song");
  //   let riproduzioni = document.getElementById("riproduzioni");
  //   let durata = document.getElementById("durata");

  let ol = document.querySelector("ol");
  ol.innerHTML = "";
  for (let song of music) {
    let div = document.createElement("div");
    div.className = "box-flex";
    ol.appendChild(div);
    div.innerHTML = ` <li>
                        <p id="title-song">${song.title}</p>
                        <p id="title-artis">${song.artist.name}</p>
                    </li>
                    <p id="riproduzioni">${song.rank}</p>
                    <p id="durata">${song.duration}s</p>
                    `;
  }
}

let linkMp3;

// * START TRACKBAR
let navbarLeft = document.getElementById("navbar-left");
let navbarRight = document.getElementById("navbar-right");
let timer = 0;
let timer2 = 100;
let pause = document.getElementById("pause");
let play = document.getElementById("play");
let playAds = document.getElementById("play2");
let isPlay = false;
let seconds = 0;
let minutes = 0;
let trackSeconds = document.getElementById("track-seconds");
let trackDefault = document.getElementsByClassName("track-default")[0];

playAds.addEventListener("click", navbarRenderAds);
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
  audio = new Audio(linkMp3);
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
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function navbarRender(eventClick) {
  let i = eventClick.target.parentElement.children[0].innerHTML - 1;
  linkMp3 = musicArray[i].preview;
  navbarLeft.style.opacity = 1;
  navbarRight.style.opacity = 1;
  previewImg[0].src = musicArray[i].album.cover;
  titles[0].innerHTML = musicArray[i].title;
  authors[0].innerHTML = musicArray[i].artist.name;
  audio.pause();
  resetTrackBarSeconds();
  pauseFunction();
}

function navbarRenderAds(eventClick) {
  audio.pause();

  let i = eventClick.target.parentElement.children[0].innerHTML - 1;
  let linkMp3 = musicArray[0].preview;
  audio = new Audio(linkMp3);
  navbarLeft.style.opacity = 1;
  navbarRight.style.opacity = 1;
  play.style.display = "none";
  pause.style.display = "inline";
  previewImg[0].src = musicArray[0].album.cover;
  titles[0].innerHTML = musicArray[0].title;
  authors[0].innerHTML = musicArray[0].artist.name;
  resetTrackBarSeconds();
}

// function selectSongPlay(eventClick) {
//   previewImg[previewImg.length - 1].src =
//   titles[titles.length - 1].innerHTML =
//   authors[authors.length - 1].innerHTML =
//   let linkMp3 = eventClick[0].parentElement.children[3].innerHTML;
//   audio = new Audio(linkMp3);
//   audio.play();
// }

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
