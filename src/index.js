import rainyBg from './assets/rainy-bg.jpg';
import summerBg from './assets/summer-bg.jpg';
import winterBg from './assets/winter-bg.jpg';
import rainAudio from './assets/sounds/rain.mp3';
import summerAudio from './assets/sounds/summer.mp3';
import winterAudio from './assets/sounds/winter.mp3';
import './index.scss'

const app = document.getElementById('app');
const volumeControl = document.getElementById('volume');
let currentAudio = null;
let currentVolume = 0.5;

const sounds = {
  rain: { audio: new Audio(rainAudio), bg: rainyBg },
  summer: { audio: new Audio(summerAudio), bg: summerBg },
  winter: { audio: new Audio(winterAudio), bg: winterBg },
};

Object.values(sounds).forEach((sound) => {
  sound.audio.volume = currentVolume;
});

function playSound(sound) {
  if (currentAudio && currentAudio !== sound.audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (sound.audio.paused) {
    sound.audio.volume = currentVolume;
    sound.audio.play();
    currentAudio = sound.audio;
    document.body.style.backgroundImage = `url(${sound.bg})`;
  } else {
    sound.audio.pause();
  }
}

document.getElementById('rain').addEventListener('click', () => playSound(sounds.rain));
document.getElementById('summer').addEventListener('click', () => playSound(sounds.summer));
document.getElementById('winter').addEventListener('click', () => playSound(sounds.winter));

volumeControl.addEventListener('input', (e) => {
  currentVolume = parseFloat(e.target.value);
  if (currentAudio) {
    currentAudio.volume = currentVolume;
  }
});

volumeControl.value = currentVolume;