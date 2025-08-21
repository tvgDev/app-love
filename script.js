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

function removerElemento(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    // Verifica se o elemento existe
    elemento.remove();
  }
}

if (window.innerWidth > 768) {
  playTrack();
  removerElemento("prev");
  removerElemento("next");
}
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

const promptsDeElogio = [
  "Use uma metáfora comparando minha namorada com algo do universo (estrelas, galáxias).",
  "Descreva o efeito que o sorriso dela causa em você e no ambiente ao redor.",
  "Crie um elogio focado nos detalhes e na profundidade do olhar dela.",
  "Faça um elogio sobre a inteligência dela de uma forma que soe poética.",
  "Descreva a sensação de paz e segurança que a presença dela te traz.",
  "Faça um elogio sobre a força e a resiliência dela diante de um desafio.",
  "Crie um elogio sobre a bondade e o coração generoso dela.",
  "Use uma metáfora criativa para descrever como a voz dela soa para você.",
  "Faça um elogio sobre o jeito único que ela tem de te fazer rir.",
];

async function fetchAiText() {
  console.log("Buscando novo elogio... " + new Date().toLocaleTimeString());

  const randomIndex = Math.floor(Math.random() * promptsDeElogio.length);
  const missaoDoElogio = promptsDeElogio[randomIndex];

  const promptFinal = `Sua missão é gerar um elogio único para minha namorada. A instrução é: "${missaoDoElogio}". Retorne APENAS a frase do elogio, com no máximo 20 palavras e sem qualquer introdução.`;
  try {
    const response = await fetch("/api/gerar-texto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptFinal }),
    });
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    aiTextElement.style.opacity = 0;

    setTimeout(() => {
      aiTextElement.textContent = data.text;

      aiTextElement.style.opacity = 1;
    }, 500);

    aiTextElement.textContent = data.text;
  } catch (error) {
    console.error("Erro ao buscar a frase:", error);
    aiTextElement.textContent =
      "Não foi possível gerar uma frase no momento. Tente recarregar a página.";
  }
}

fetchAiText();

setInterval(fetchAiText, 12000);

