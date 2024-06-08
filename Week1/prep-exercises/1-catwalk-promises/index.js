'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
const WALKING_CAT_URL =
  'http://www.anniemation.com/clip_art/images/cat-walk.gif'; // Assuming this is the walking cat URL

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let currentPos = startPos;
    img.style.left = `${currentPos}px`;

    const step = () => {
      if ((startPos < stopPos && currentPos >= stopPos) || (startPos > stopPos && currentPos <= stopPos)) {
        resolve();
      } else {
        currentPos += (startPos < stopPos) ? STEP_SIZE_PX : -STEP_SIZE_PX;
        img.style.left = `${currentPos}px`;
        setTimeout(step, STEP_INTERVAL_MS);
      }
    };

    step();
  });
}

function dance(img) {
  return new Promise((resolve) => {
    const originalSrc = img.src;
    img.src = DANCING_CAT_URL;
    
    setTimeout(() => {
      img.src = originalSrc;
      resolve();
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  const repeat = async () => {
    await walk(img, startPos, centerPos);
    await dance(img);
    await walk(img, centerPos, stopPos);
    repeat();
  };

  repeat();
}

window.addEventListener('load', catWalk);
;
