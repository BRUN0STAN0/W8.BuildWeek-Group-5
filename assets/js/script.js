async function loadJSON() {
  let musicResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${inputSearch.value}`);
  let musicObject = await musicResponse.json();
  let musicArray = musicObject.data;
}

// * START TRACKBAR

let timer = 0;
let timer2 = 100;
let pause = document.getElementById("pause");
let play = document.getElementById("play");
let isPlay = false;
let seconds = 0;
let minutes = 0;
let trackSeconds = document.getElementById("track-seconds");
let trackDefault = document.getElementsByClassName("track-default")[0];

play.addEventListener("click", () => {
  isPlay = true;
  play.style.display = "none";
  pause.style.display = "inline";
  pauseTrackBarSeconds();
  pauseSeconds();
});

pause.addEventListener("click", () => {
  isPlay = false;
  play.style.display = "inline";
  pause.style.display = "none";
  intervalTrackBarSeconds;
  intervalSeconds;
});

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
