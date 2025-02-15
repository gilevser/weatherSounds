import rainyBg from './assets/rainy-bg.jpg';
import summerBg from './assets/summer-bg.jpg';
import winterBg from './assets/winter-bg.jpg';
import rainAudio from './assets/sounds/rain.mp3';
import summerAudio from './assets/sounds/summer.mp3';
import winterAudio from './assets/sounds/winter.mp3';
import './index.scss'

const app: HTMLElement = document.getElementById('app');
const volumeControl: HTMLInputElement = <HTMLInputElement>document.getElementById('volume');
const rain = document.getElementById('rain');
rain.style.backgroundImage = `url(${rainyBg})`;
rain.style.backgroundSize = 'cover';
const summer = document.getElementById('summer');
summer.style.backgroundImage = `url(${summerBg})`;
summer.style.backgroundSize = 'cover';

const winter = document.getElementById('winter');
winter.style.backgroundImage = `url(${winterBg})`;
winter.style.backgroundSize = 'cover';


let currentAudio: HTMLAudioElement  = null;
let currentVolume:number = 0.5;

interface Sound {
  audio: HTMLAudioElement,
  bg: string,
}

type Sounds = "rain" | "summer" | "winter";

const sounds: Record<string, Sound> = {
  rain: { audio: new Audio(rainAudio), bg: rainyBg },
  summer: { audio: new Audio(summerAudio), bg: summerBg },
  winter: { audio: new Audio(winterAudio), bg: winterBg },
};

Object.values(sounds).forEach((sound) => {
  sound.audio.volume = currentVolume;
});

function playSound(sound: Sound ) {
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

rain.addEventListener('click', () => playSound(sounds.rain));
summer.addEventListener('click', () => playSound(sounds.summer));
winter.addEventListener('click', () => playSound(sounds.winter));

if (volumeControl) {
  volumeControl.addEventListener('input', (e: MouseEvent | null) => {
    currentVolume = parseFloat((e.target  as HTMLTextAreaElement ).value);
    if (currentAudio) {
      currentAudio.volume = currentVolume;
    }
  });

volumeControl.valueAsNumber = currentVolume;
}



