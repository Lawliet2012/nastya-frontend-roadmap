// Роадмап: превращает ROADMAP_DATA + CHECKS в формат Tracker и запускает страницу.
(function () {
  'use strict';

  const { esc, fmt } = Tracker;

  function checksHtml(id) {
    const check = (typeof CHECKS !== 'undefined' && CHECKS[id]) || {};
    const parts = [];

    if (check.try) {
      parts.push(`
        <details class="extra extra-try">
          <summary>Попробуй руками</summary>
          <div class="extra-body">${fmt(check.try)}</div>
        </details>`);
    }

    if (check.q && check.q.length) {
      const list = check.q
        .map(
          ([question, answer]) => `
            <li>
              <p class="qa-q">${fmt(question)}</p>
              <details class="answer">
                <summary>Показать ответ</summary>
                <p>${fmt(answer)}</p>
              </details>
            </li>`
        )
        .join('');
      parts.push(`
        <details class="extra extra-check">
          <summary>Проверь себя · ${check.q.length}</summary>
          <div class="extra-body"><ol class="qa">${list}</ol></div>
        </details>`);
    }

    return parts.length ? `<div class="extras">${parts.join('')}</div>` : '';
  }

  function itemHtml(item) {
    return `
      <div class="item-text">${item.isNew ? '<span class="tag tag-new">новое</span>' : ''}${fmt(item.text)}</div>
      ${item.tip ? `<p class="item-tip">${fmt(item.tip)}</p>` : ''}
      ${checksHtml(item.id)}`;
  }

  function searchText(item) {
    const check = (typeof CHECKS !== 'undefined' && CHECKS[item.id]) || {};
    const questions = (check.q || []).map(pair => pair[0]).join(' ');
    return [item.text, item.tip || '', questions].join(' ');
  }

  function resourcesHtml(topic) {
    const links = topic.items
      .map(
        item => `
          <li>
            <a href="${esc(item.link)}" target="_blank" rel="noopener">${esc(item.text)} ↗</a>
            ${item.tip ? `<p class="item-tip">${fmt(item.tip)}</p>` : ''}
          </li>`
      )
      .join('');
    return `<ul class="links">${links}</ul>`;
  }

  function labLinksHtml(sectionId) {
    const links = (typeof SECTION_LAB !== 'undefined' && SECTION_LAB[sectionId]) || [];
    return links
      .map(([phase, label]) => `<a class="meta-link" href="lab.html#phase-${phase}">Практика в Mega Lab: ${esc(label)} →</a>`)
      .join('');
  }

  const sections = ROADMAP_DATA.map(section => ({
    id: section.id,
    num: section.icon,
    title: section.title,
    description: section.description,
    metaHtml: labLinksHtml(section.id),
    cards: section.topics.map(topic =>
      topic.isResources
        ? {
            id: 'topic-' + topic.id,
            title: topic.title,
            search: topic.items.map(item => item.text + ' ' + (item.tip || '')).join(' '),
            topHtml: resourcesHtml(topic),
          }
        : {
            id: 'topic-' + topic.id,
            title: topic.title,
            isNew: topic.isNew,
            items: topic.items.map(item => ({
              id: item.id,
              title: item.text,
              search: searchText(item),
              html: itemHtml(item),
            })),
          }
    ),
  }));

  Tracker.init({
    page: 'roadmap',
    storageKey: Tracker.ROADMAP_KEY,
    sections,
    news: {
      id: 'roadmap-2026-11',
      html: `
        <strong>Обновление, ноябрь 2026. Все твои галочки на месте.</strong>
        <ul>
          <li>У каждой темы появился блок «Проверь себя»: вопросы как на собеседовании со скрытыми ответами. А у базовых тем ещё и «Попробуй руками» — эксперимент на 10 минут.</li>
          <li>В первом разделе 11 новых пунктов про базу (помечены «новое»): память, процессы и порты, путь запроса от URL до экрана, CORS, авторизация, сервер и SQL.</li>
          <li>Темы актуализированы: Vite 8, TypeScript 7, React 19, Next.js 16, Nuxt 4, Tailwind 4, ESLint 10.</li>
          <li>Удобства: кнопка «Продолжить», поиск, «Скрыть выполненное», светлая тема, экспорт прогресса в файл (внизу меню).</li>
        </ul>`,
    },
  });
})();
