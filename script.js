const countdownTarget = new Date("2026-05-04T08:00:00+08:00").getTime();
const countdownParts = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const formatPart = (value) => String(Math.max(0, value)).padStart(2, "0");

const updateCountdown = () => {
  const distance = countdownTarget - Date.now();

  if (distance <= 0) {
    countdownParts.days.textContent = "00";
    countdownParts.hours.textContent = "00";
    countdownParts.minutes.textContent = "00";
    countdownParts.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownParts.days.textContent = formatPart(days);
  countdownParts.hours.textContent = formatPart(hours);
  countdownParts.minutes.textContent = formatPart(minutes);
  countdownParts.seconds.textContent = formatPart(seconds);
};

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".fade-up").forEach((element) => observer.observe(element));

const musicToggle = document.getElementById("music-toggle");
const youtubeAudio = document.getElementById("youtube-audio");

const youtubeVideoId = "mirAsQVMKE8";

let musicPlaying = true;

const renderYouTubePlayer = () => {
  youtubeAudio.hidden = false;
  youtubeAudio.innerHTML = `
    <iframe
      width="0"
      height="0"
      src="https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&loop=1&playlist=${youtubeVideoId}&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&rel=0"
      title="Background music player"
      allow="autoplay"
      referrerpolicy="strict-origin-when-cross-origin"
      tabindex="-1"
    ></iframe>
  `;
};

const stopYouTubePlayer = () => {
  youtubeAudio.innerHTML = "";
  youtubeAudio.hidden = true;
};

const syncMusicButton = () => {
  musicToggle.textContent = musicPlaying ? "Pause Music" : "Play Music";
  musicToggle.setAttribute("aria-pressed", musicPlaying ? "true" : "false");
};

renderYouTubePlayer();
syncMusicButton();

musicToggle.addEventListener("click", () => {
  if (!musicPlaying) {
    renderYouTubePlayer();
    musicPlaying = true;
    syncMusicButton();
    return;
  }

  stopYouTubePlayer();
  musicPlaying = false;
  syncMusicButton();
});
