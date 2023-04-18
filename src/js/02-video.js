import Player from "@vimeo/player";

import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = "videoplayer-current-time";

function getTimeCode(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
}

player.on('timeupdate', throttle(getTimeCode, 1000));


player.setCurrentTime(localStorage.getItem(LOCAL_STORAGE_KEY) || 0);

