import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const storageKey = 'videoplayer-current-time';


const saveCurrentTime = throttle((time) => {
  localStorage.setItem(storageKey, time.toFixed(2));
}, 1000);


const restorePlaybackPosition = async () => {
  const currentTime = localStorage.getItem(storageKey);
  if (currentTime) {
    await player.setCurrentTime(parseFloat(currentTime));
  }
};


player.on('timeupdate', (data) => {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
});


player.ready().then(restorePlaybackPosition);
