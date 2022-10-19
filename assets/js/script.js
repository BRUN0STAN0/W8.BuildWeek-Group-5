let previewImg = document.querySelectorAll("#preview-img");
let audio;

let buonasalvePlaylist = ["ads", "Summer", "Monday", "Best", "Life", "Rock", "Cipoll"];
let buonasalvePlaylistFETCH = [];
window.onload = () => {
  loadJSON();
};

async function loadJSON() {
  for (let p of buonasalvePlaylist) {
    let musicResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${p}`);
    let musicObject = await musicResponse.json();
    let musicArray = musicObject.data;
    let musicElement = musicArray[0];
    buonasalvePlaylistFETCH.push(musicElement);
  }
  iterateArray(buonasalvePlaylistFETCH);
}
let buonasalveMp3Array = [];
let buonasalvePreviewArray = [];
let buonasalveTitleArray = [];
let buonasalveAuthorArray = [];

function iterateArray(musicArray) {
  // * START CICLO PER LINKARE L'AUDIO
  for (let preview of previewImg) {
    preview.addEventListener("click", playFunction);
    let p = document.createElement("p");
    p.classList.add("link-mp3");
    for (let m of musicArray) {
      p.innerHTML = m.preview;
    }
    preview.parentElement.appendChild(p);
  }
  // ! END CICLO PER LINKARE L'AUDIO
  let title = document.querySelectorAll("#title-song");
  let author = document.querySelectorAll("#author");
  for (let m of musicArray) {
    // sectionMusicArray.push(m.)
    for (let a of author) {
      a.innerHTML = m.artist.name;
    }
    for (let t of title) {
      t.innerHTML = m.title_short;
    }
    for (let preview of previewImg) {
      preview.src = m.album.cover;
    }
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
play.addEventListener("click", playFunction);
pause.addEventListener("click", pauseFunction);

function playFunction() {
  if (isPlay) {
    pauseFunction();
    resetTrackBarSeconds();
  }
  play.style.display = "none";
  pause.style.display = "inline";
  pauseTrackBarSeconds();
  pauseSeconds();
  selectSongPlay(previewImg);
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
const intervalTrackBarSeconds = setInterval(startTrackBarSeconds, 1000);

function pauseTrackBarSeconds() {
  clearInterval(startTrackBarSeconds);
}

function startSeconds() {
  let currentSeconds = document.getElementById("current-seconds");
  currentSeconds.innerHTML = `${minutes}.${seconds}`;
  if (isPlay) {
    if (seconds === 59) {
      seconds = 0;
      minutes++;
    }
    if (minutes == 2) {
      pauseTrackBarSeconds();
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
