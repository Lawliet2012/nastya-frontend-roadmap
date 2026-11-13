// Mega Lab: превращает LAB_DATA в формат Tracker и запускает страницу.
(function () {
  'use strict';

  const { esc } = Tracker;

  const PM_MARK = 'ЗАДАЧА ОТ PM:';
  const HARD_MARK = 'СЛОЖНАЯ ЗАДАЧА:';

  function fmtTask(str) {
    let s = esc(str);
    // Перенос строки перед ключевыми маркерами
    s = s.replace(/— /g, '<br>— ');
    s = s.replace(/(Макет:)/g, '<br><strong>$1</strong>');
    s = s.replace(PM_MARK, '<span class="tag tag-pm">Задача от PM</span>');
    s = s.replace(HARD_MARK, '<span class="tag tag-hard">Сложная</span>');
    return s;
  }

  function fmtHint(str) {
    // Разбиваем подсказку по предложениям, чтобы её было легче читать
    return esc(str).replace(/\. ([A-ZА-ЯЁ])/g, '.<br>$1');
  }

  function plainTitle(text) {
    const clean = text.replace(PM_MARK, '').replace(HARD_MARK, '').trim();
    return clean.length > 150 ? clean.slice(0, 150).trimEnd() + '…' : clean;
  }

  function taskHtml(task) {
    const hint = task.hint
      ? `<div class="extras">
           <details class="extra">
             <summary>Подсказка</summary>
             <div class="extra-body">${fmtHint(task.hint)}</div>
           </details>
         </div>`
      : '';
    return `<div class="item-text">${fmtTask(task.text)}</div>${hint}`;
  }

  let stepCounter = 0;
  let phaseCounter = 0;

  const sections = LAB_DATA.phases.map(phase => ({
    id: 'phase-' + phase.id,
    num: phase.bonus ? '★' : 'P' + ++phaseCounter,
    title: phase.title,
    description: phase.description,
    optional: Boolean(phase.bonus),
    cards: phase.steps.map(step => ({
      id: step.id,
      num: step.num || String(++stepCounter),
      title: step.title,
      topHtml: `
        <div class="note note-why">
          <span class="note-label">Зачем</span>
          ${esc(step.why)}
        </div>
        <div class="covers">${step.covers.map(c => `<span>${esc(c)}</span>`).join('')}</div>`,
      bottomHtml: `
        <div class="note note-checkpoint">
          <span class="note-label">Чекпоинт</span>
          ${esc(step.checkpoint)}
        </div>`,
      items: step.tasks.map(task => ({
        id: task.id,
        title: plainTitle(task.text),
        search: task.text + ' ' + (task.hint || '') + ' ' + step.covers.join(' '),
        html: taskHtml(task),
      })),
    })),
  }));

  document.getElementById('lab-intro').textContent = LAB_DATA.description;

  Tracker.init({
    page: 'lab',
    storageKey: Tracker.LAB_KEY,
    sections,
    navCards: true,
    news: {
      id: 'lab-2026-11',
      html: `
        <strong>Обновление, ноябрь 2026. Все твои галочки на месте, номера шагов не изменились.</strong>
        <ul>
          <li>Новый бонус-трек в конце — <a href="#phase-under-hood">«Под капотом: свой бэкенд»</a>. Свой сервер на чистом Node.js, SQLite, CORS и cookies с обеих сторон. Его можно проходить в любой момент, параллельно с основным проектом.</li>
          <li>Задачи актуализированы под текущие версии: Tailwind 4, Vite 8, React Router 7, Nuxt 4, TanStack Query 5, Node.js 24/26.</li>
          <li>Удобства: кнопка «Продолжить», поиск, «Скрыть выполненное», светлая тема, экспорт прогресса.</li>
        </ul>`,
    },
  });
})();
