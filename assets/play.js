import { loadWorks } from './works.js';

const status = document.getElementById('status');
const frame = document.getElementById('frame');
const workTitle = document.getElementById('work-title');
const fullscreenButton = document.getElementById('fullscreen');

function showError(message) {
  status.textContent = message;
  status.classList.add('error');
  status.hidden = false;
}

function setUpFullscreen() {
  // iPadOS Safari only provides the prefixed API; iPhone Safari provides neither.
  const requestFullscreen = frame.requestFullscreen ?? frame.webkitRequestFullscreen;
  if (!requestFullscreen) {
    return;
  }
  fullscreenButton.hidden = false;
  fullscreenButton.addEventListener('click', async () => {
    try {
      await requestFullscreen.call(frame);
    } catch (error) {
      showError('全画面表示にできませんでした。');
      throw error;
    }
    frame.focus();
  });
  document.addEventListener('fullscreenchange', () => frame.focus());
  document.addEventListener('webkitfullscreenchange', () => frame.focus());
}

let works;
try {
  works = await loadWorks();
} catch (error) {
  showError(`作品の一覧を読み込めませんでした（${error.message}）`);
  throw error;
}

// Only slugs listed in works.json are loaded, so the URL cannot point the frame anywhere else.
const slug = new URLSearchParams(location.search).get('work');
const work = works.find((candidate) => candidate.slug === slug);

if (work) {
  document.title = `${work.title} | infinity842 の作品サイト`;
  workTitle.textContent = work.title;
  frame.title = work.title;
  // The games are keyboard driven, so move focus into the frame once it is ready.
  frame.addEventListener('load', () => frame.focus());
  frame.src = `works/${encodeURIComponent(work.slug)}/index.html`;
  frame.hidden = false;
  status.hidden = true;
  setUpFullscreen();
} else {
  showError('この作品は見つかりませんでした。');
}
