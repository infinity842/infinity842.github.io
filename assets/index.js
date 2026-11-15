import { loadWorks } from './works.js';

const list = document.getElementById('works');
const status = document.getElementById('status');

// Formats YYYY-MM-DD without Date to avoid time zone shifts.
function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${year}年${month}月${day}日`;
}

function createCard(work) {
  const link = document.createElement('a');
  link.className = 'card';
  link.href = `play.html?work=${encodeURIComponent(work.slug)}`;

  const title = document.createElement('h2');
  title.className = 'card-title';
  title.textContent = work.title;

  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = work.description;

  const date = document.createElement('time');
  date.className = 'card-date';
  date.dateTime = work.publishedAt;
  date.textContent = `${formatDate(work.publishedAt)} 公開`;

  const play = document.createElement('span');
  play.className = 'card-play';
  play.textContent = 'あそぶ';

  link.append(title, description, date, play);

  const item = document.createElement('li');
  item.append(link);
  return item;
}

try {
  const works = await loadWorks();
  if (works.length === 0) {
    status.textContent = 'まだ作品はありません。';
  } else {
    list.append(...works.map(createCard));
    status.hidden = true;
  }
} catch (error) {
  status.textContent = `作品の一覧を読み込めませんでした（${error.message}）`;
  status.classList.add('error');
  throw error;
}
