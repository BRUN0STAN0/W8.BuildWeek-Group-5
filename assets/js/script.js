async function loadJSON() {
  let musicResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${inputSearch.value}`);
  let musicObject = await musicResponse.json();
  let musicArray = musicObject.data;
}

// * START TRACKBAR
const intervalTrackSeconds = setInterval(startTrackSeconds, 300);

let timer = 0;
let timer2 = 100;

function startTrackSeconds() {
  let trackSeconds = document.getElementById("track-seconds");
  let trackDefault = document.getElementsByClassName("track-default")[0];
  trackSeconds.style.width = `${timer}%`;
  trackDefault.style.width = `${timer2}%`;
  if (timer === 100) {
    stopTrackSeconds();
  }
  timer++;
  timer2--;
}

function stopTrackSeconds() {
  clearInterval(intervalTrackSeconds);
}

const intervalSeconds = setInterval(startSeconds, 1000);
let seconds = 0;
let minutes = 0;

function startSeconds() {
  let currentSeconds = document.getElementById("current-seconds");
  currentSeconds.innerHTML = `${minutes}.${seconds}`;
  if (seconds === 59) {
    seconds = 0;
    minutes++;
  }
  if (minutes == 2) {
    stopTrackSeconds();
  }
  seconds++;
}
function stopSeconds() {
  clearInterval(intervalSeconds);
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

const volumeRangeWidth = volume.getBoundingClientRect().width; // This will be the volume limit (100%)
volumeSet.addEventListener("mousemove", function volumeSlide(event) {
  if (mouseIsDown) {
    let x = event.offsetX;
    if (event.target.className == "volume-set") {
      x = Math.floor(x);
      if (x < 0) x = 0; // check if it's too low
      if (x > volumeRangeWidth) x = volumeRangeWidth; // check if it's too high
      volumeSet.style.width = x + 5 + "px";
    }
  }
});

// ! END VOLUME
