// === Neon Custom Music Player v3 ===

// 🎵 Плейлист
const playlist = [
  { title: "I & Me", src: "music/I & Me.mp3" },
  { title: "I Told You", src: "music/I Told You.mp3" },
  { title: "Warm", src: "music/Warm.mp3" }
];


let currentTrack = 0;
let isPlaying = false;
let isVisible = false;

// 🎧 Створення елементів
const playerWrapper = document.createElement("div");
const toggleBtn = document.createElement("button");
const player = document.createElement("div");
const audio = document.createElement("audio");
const title = document.createElement("div");
const controls = document.createElement("div");
const volumeControl = document.createElement("input");
const prevBtn = document.createElement("button");
const playBtn = document.createElement("button");
const nextBtn = document.createElement("button");

// 🎨 Основний контейнер
Object.assign(playerWrapper.style, {
  position: "fixed",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "9999",
  textAlign: "center",
  color: "#00ff00",
  fontFamily: "sans-serif"
});

// 🎛️ Кнопка згортання / розгортання (тут вона завжди видима)
toggleBtn.textContent = "▲";
Object.assign(toggleBtn.style, {
  marginBottom: "10px",
  background: "rgba(0,0,0,0.6)",
  border: "1px solid #00ff00",
  borderRadius: "8px",
  color: "#00ff00",
  fontSize: "16px",
  cursor: "pointer",
  padding: "3px 6px",
  transition: "all 0.3s ease",
  boxShadow: "0 0 8px #00ff00"
});
toggleBtn.onmouseenter = () => (toggleBtn.style.boxShadow = "0 0 12px #00ff00");
toggleBtn.onmouseleave = () => (toggleBtn.style.boxShadow = "0 0 8px #00ff00");

// 🎨 Плеєр (за замовчуванням схований)
Object.assign(player.style, {
  display: "none",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "360px",
  padding: "16px",
  borderRadius: "18px",
  background: "rgba(0, 0, 0, 0.75)",
  boxShadow: "0 0 20px #00ff00",
  color: "#00ff00",
  backdropFilter: "blur(10px)",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  opacity: "0",
  transform: "translateY(20px)"
});

Object.assign(title.style, {
  marginBottom: "12px",
  fontSize: "15px",
  textAlign: "center"
});

Object.assign(controls.style, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginBottom: "10px"
});

volumeControl.type = "range";
volumeControl.min = 0;
volumeControl.max = 1;
volumeControl.step = 0.01;
volumeControl.value = 0.7;
audio.volume = 0.7;

Object.assign(volumeControl.style, {
  width: "180px",
  accentColor: "#00ff00",
  cursor: "pointer",
  height: "4px"
});

[prevBtn, playBtn, nextBtn].forEach(btn => {
  Object.assign(btn.style, {
    background: "rgba(0, 0, 0, 0.3)",
    border: "1px solid #00ff00",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#00ff00",
    fontSize: "18px",
    cursor: "pointer",
    transition: "all 0.3s ease"
  });
  btn.onmouseenter = () => (btn.style.boxShadow = "0 0 12px #00ff00");
  btn.onmouseleave = () => (btn.style.boxShadow = "none");
});

prevBtn.textContent = "I◄";
playBtn.textContent = "▷";
nextBtn.textContent = "►I";

// 📻 Логіка
function loadTrack(index) {
  audio.src = playlist[index].src;
  title.textContent = playlist[index].title;
  audio.load();
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "❚❚";
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▷";
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  playTrack();
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  playTrack();
}

playBtn.onclick = () => (isPlaying ? pauseTrack() : playTrack());
nextBtn.onclick = nextTrack;
prevBtn.onclick = prevTrack;
audio.addEventListener("ended", nextTrack);
volumeControl.addEventListener("input", e => (audio.volume = e.target.value));

// 🎚️ Тогл показу плеєра
toggleBtn.onclick = () => {
  if (isVisible) {
    player.style.opacity = "0";
    player.style.transform = "translateY(20px)";
    setTimeout(() => (player.style.display = "none"), 300);
    toggleBtn.textContent = "▲";
  } else {
    player.style.display = "flex";
    setTimeout(() => {
      player.style.opacity = "1";
      player.style.transform = "translateY(0)";
    }, 10);
    toggleBtn.textContent = "▼";
  }
  isVisible = !isVisible;
};

// 🧩 Додаємо елементи
controls.append(prevBtn, playBtn, nextBtn);
player.append(title, controls, volumeControl);
playerWrapper.append(toggleBtn, player); // кнопка ззовні
document.body.appendChild(playerWrapper);
document.body.appendChild(audio);

// 🚀 Завантаження першого треку
loadTrack(currentTrack);

// 🔊 Автоплей після першого кліку користувача
function startMusic() {
  // розгортаємо плеєр, якщо він схований
  if (!isVisible) toggleBtn.click();
  
  // запускаємо музику
  playTrack();
  
  // прибираємо слухача після першого кліку
  window.removeEventListener("click", startMusic);
}

// слухаємо будь-який клік на сторінці
window.addEventListener("click", startMusic);
