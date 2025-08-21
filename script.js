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
  {
    title: "Sparks",
    artist: "Coldplay",
    src: "/assets/SpotiDownloader.com - Sparks - Coldplay.mp3",
    art: "/assets/Cover of Sparks by Coldplay.jpg",
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

let startX = 0;
let endX = 0;

list.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

list.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = startX - endX;
  if (diff > 50) {
    next.click();
  } else if (diff < -50) {
    prev.click();
  }
}

// ↑ Fim do script do slider
playTrack();
// ↓ inicio do script do contador

const startDate = new Date(2022, 4, 17, 18, 30, 0);

const loveCounterElement = document.getElementById("love-counter");

function updateLoveCounter() {
  const now = new Date();

  let diffInSeconds = Math.floor((now - startDate) / 1000);

  const years = Math.floor(diffInSeconds / (365.25 * 24 * 60 * 60));
  diffInSeconds -= years * 365.25 * 24 * 60 * 60;

  const days = Math.floor(diffInSeconds / (24 * 60 * 60));
  diffInSeconds -= days * 24 * 60 * 60;

  const hours = Math.floor(diffInSeconds / (60 * 60));
  diffInSeconds -= hours * 60 * 60;

  const minutes = Math.floor(diffInSeconds / 60);
  diffInSeconds -= minutes * 60;

  const seconds = diffInSeconds;

  loveCounterElement.innerHTML = `Eu te amo há ${years} anos, ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos ❤️`;
}

setInterval(updateLoveCounter, 1000);

updateLoveCounter();

// ↑ Fim do script do contador

// ↓ inicio do script dos textos com I.A

const aiTextElement = document.querySelector("#ai-text-container .ai-text");

async function fetchAiText() {
 console.log("Buscando novo elogio... " + new Date().toLocaleTimeString());
  try {
    const response = await fetch("/api/gerar-texto");
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    aiTextElement.textContent = data.text;
  } catch (error) {
    console.error("Erro ao buscar a frase:", error);
    aiTextElement.textContent =
      "Não foi possível gerar uma frase no momento. Tente recarregar a página.";
  }
}

fetchAiText();

setInterval(fetchAiText, 15000);

