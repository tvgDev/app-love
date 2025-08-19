// ↓ inicio do script do mini-player

const audio = document.getElementById("audio-source");
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseIcon = playPauseBtn.querySelector("i");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const albumArt = document.getElementById("album-art");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");

const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");

const playlist = [
  {
    title: "Ainda Bem",
    artist: "Vanessa Da Mata",
    src: "/assets/SpotiDownloader.com - Ainda Bem - Vanessa Da Mata.mp3",
    art: "/assets/Cover of Ainda Bem by Vanessa Da Mata.jpg",
  },
  {
    title: "Wonderful Tonight",
    artist: "Eric Clapton",
    src: "/assets/SpotiDownloader.com - Wonderful Tonight - Eric Clapton.mp3",
    art: "/assets/Cover of Wonderful Tonight by Eric Clapton.jpg",
  },
  {
    title: "Something About You",
    artist: "Eyedress, Dent May",
    src: "/assets/SpotiDownloader.com - Something About You - Eyedress.mp3",
    art: "/assets/Cover of Something About You by Eyedress, Dent May.jpg",
  },
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(trackIndex) {
  const track = playlist[trackIndex];
  audio.src = track.src;
  albumArt.src = track.art;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
}

function playTrack() {
  isPlaying = true;
  audio.play();
  playPauseIcon.classList.remove("fa-play");
  playPauseIcon.classList.add("fa-pause");
}

function pauseTrack() {
  isPlaying = false;
  audio.pause();
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");
}

function togglePlayPause() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function nextTrack() {
  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) {
    currentTrackIndex = 0;
  }
  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = playlist.length - 1;
  }
  loadTrack(currentTrackIndex);
  playTrack();
}

function updateProgress() {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

audio.addEventListener("timeupdate", updateProgress);

audio.addEventListener("ended", nextTrack);

progressContainer.addEventListener("click", setProgress);

loadTrack(currentTrackIndex);

// ↑ Fim do script do mini-player

// ↓ inicio do script do slider

let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let active = 0;
let lengthItems = items.length - 1;

next.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active = active + 1;
  }
  reloadSlider();
};

prev.onclick = function () {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active = active - 1;
  }
  reloadSlider();
};

let refreshSlider = setInterval(() => {
  next.click();
}, 5000);

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";

  let lasActiveDot = document.querySelector(".slider .dots li.active");
  lasActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 5000);
}
dots.forEach((li, key) => {
  li.addEventListener("click", function () {
    active = key;
    reloadSlider();
  });
});
