// Общая логика для роадмапа и Mega Lab: отрисовка, прогресс, поиск, навигация.
// Страница описывает данные в едином формате и вызывает Tracker.init().
const Tracker = (function () {
  'use strict';

  const ROADMAP_KEY = 'nastya-roadmap-progress';
  const LAB_KEY = 'nastya-lab-progress';
  const UI_KEY = 'nastya-roadmap-ui';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function loadJSON(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* хранилище недоступно (приватный режим) — работаем без сохранения */
    }
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Экранирует текст и превращает `код` в <code>
  function fmt(str) {
    return esc(str).replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  const CHEVRON =
    '<svg class="chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>';

  function init(cfg) {
    const ui = loadJSON(UI_KEY);
    ui.open = ui.open || {};
    ui.news = ui.news || {};
    const saveUI = () => saveJSON(UI_KEY, ui);

    let progress = loadJSON(cfg.storageKey);
    const sections = cfg.sections;
    const content = $('#ui-content');

    // Плоский список отмечаемых пунктов в порядке прохождения
    const flat = [];
    sections.forEach(section => {
      section.cards.forEach(card => {
        (card.items || []).forEach(item => flat.push({ item, card, section }));
      });
    });

    const isDone = id => progress[id] === true;
    const countDone = items => items.filter(item => isDone(item.id)).length;
    const sectionItems = section => section.cards.flatMap(card => card.items || []);
    const openKey = card => cfg.page + ':' + card.id;

    /* ---------- Отрисовка ---------- */

    function renderItem(item) {
      return `
        <div class="item" id="item-${item.id}" data-search="${esc((item.search || item.title).toLowerCase())}">
          <label class="cb">
            <input type="checkbox" data-check="${item.id}" aria-label="Выполнено: ${esc(item.title.slice(0, 90))}">
            <span class="cb-box" aria-hidden="true"></span>
          </label>
          <div class="item-body">${item.html}</div>
        </div>`;
    }

    function renderCard(card) {
      const checkable = Boolean(card.items);
      return `
        <article class="card" id="${card.id}" data-search="${esc((card.search || '').toLowerCase())}">
          <h3 class="card-h">
            <button class="card-head" type="button" aria-expanded="false" aria-controls="${card.id}-body">
              ${card.num ? `<span class="card-num">${esc(card.num)}</span>` : ''}
              <span class="card-title">${card.isNew ? '<span class="tag tag-new">новое</span>' : ''}${esc(card.title)}</span>
              ${checkable ? '<span class="card-count"></span>' : ''}
              ${CHEVRON}
            </button>
          </h3>
          <div class="card-body" id="${card.id}-body">
            ${card.topHtml || ''}
            ${checkable ? `<div class="items">${card.items.map(renderItem).join('')}</div>` : ''}
            ${card.bottomHtml || ''}
          </div>
        </article>`;
    }

    function renderSection(section) {
      return `
        <section class="section" id="${section.id}">
          <header class="section-head">
            <span class="section-num">${esc(section.num)}</span>
            <div class="section-info">
              <h2 class="section-title">${section.optional ? '<span class="tag tag-bonus">бонус</span>' : ''}${esc(section.title)}</h2>
              <p class="section-desc">${esc(section.description)}</p>
              <div class="section-meta">
                <span class="bar"><span class="bar-fill"></span></span>
                <span class="section-count"></span>
                ${section.metaHtml || ''}
              </div>
            </div>
          </header>
          ${section.cards.map(renderCard).join('')}
        </section>`;
    }

    function renderNav() {
      $('#ui-nav').innerHTML = sections
        .map(section => {
          const sub = cfg.navCards
            ? `<ul class="nav-sub">${section.cards
                .map(
                  card => `
                  <li><a class="nav-sub-link" href="#${card.id}" data-nav="${card.id}">
                    <span class="nav-sub-num">${esc(card.num || '')}</span><span>${esc(card.title)}</span>
                  </a></li>`
                )
                .join('')}</ul>`
            : '';
          return `
            <li data-group="${section.id}">
              <a class="nav-link" href="#${section.id}" data-nav="${section.id}">
                <span class="nav-num">${esc(section.num)}</span>
                <span class="nav-main">
                  <span class="nav-title">${esc(section.title)}</span>
                  <span class="bar"><span class="bar-fill"></span></span>
                </span>
                <span class="nav-count"></span>
              </a>
              ${sub}
            </li>`;
        })
        .join('');
    }

    function renderNews(force) {
      const box = $('#ui-news');
      const btn = $('#ui-news-btn');
      if (!cfg.news) {
        btn.hidden = true;
        return;
      }
      const seen = ui.news[cfg.news.id] === true;
      btn.hidden = !seen || force === true;
      if (seen && !force) {
        box.innerHTML = '';
        return;
      }
      box.innerHTML = `
        <div class="news">
          <span class="eyebrow">Что нового</span>
          ${cfg.news.html}
          <button class="news-close" type="button" aria-label="Скрыть">&times;</button>
        </div>`;
      $('.news-close', box).addEventListener('click', () => {
        ui.news[cfg.news.id] = true;
        saveUI();
        renderNews();
      });
    }

    /* ---------- Прогресс ---------- */

    function nextItem() {
      const pick = list => {
        let last = -1;
        list.forEach((entry, i) => {
          if (isDone(entry.item.id)) last = i;
        });
        for (let i = last + 1; i < list.length; i++) {
          if (!isDone(list[i].item.id)) return list[i];
        }
        return list.find(entry => !isDone(entry.item.id)) || null;
      };
      return pick(flat.filter(e => !e.section.optional)) || pick(flat.filter(e => e.section.optional));
    }

    function setBar(root, done, total) {
      const fill = $('.bar-fill', root);
      if (fill) fill.style.width = (total ? Math.round((done / total) * 100) : 0) + '%';
    }

    function update() {
      const all = flat.map(e => e.item);
      const done = countDone(all);
      const pct = all.length ? Math.round((done / all.length) * 100) : 0;
      setBar($('.top-progress'), done, all.length);
      $('#ui-progress-text').innerHTML = `${pct}% <small>· ${done} из ${all.length}</small>`;

      sections.forEach(section => {
        const items = sectionItems(section);
        const sDone = countDone(items);
        const complete = items.length > 0 && sDone === items.length;
        const el = document.getElementById(section.id);
        const navLi = $(`[data-group="${section.id}"]`);

        el.classList.toggle('is-done', complete);
        setBar($('.section-meta', el), sDone, items.length);
        $('.section-count', el).textContent = `${sDone} из ${items.length}`;

        navLi.classList.toggle('is-done', complete);
        setBar(navLi, sDone, items.length);
        $('.nav-count', navLi).textContent = `${sDone}/${items.length}`;

        section.cards.forEach(card => {
          if (!card.items) return;
          const cDone = countDone(card.items);
          const cardComplete = cDone === card.items.length;
          const cardEl = document.getElementById(card.id);
          cardEl.classList.toggle('all-done', cardComplete);
          $('.card-count', cardEl).textContent = `${cDone}/${card.items.length}`;
          const subLink = $(`[data-nav="${card.id}"]`);
          if (subLink) subLink.classList.toggle('all-done', cardComplete);

          card.items.forEach(item => {
            const itemEl = document.getElementById('item-' + item.id);
            itemEl.classList.toggle('done', isDone(item.id));
            $('input', itemEl).checked = isDone(item.id);
          });
        });
      });

      renderContinue();
    }

    function renderContinue() {
      const box = $('#ui-continue');
      const next = nextItem();
      if (!next) {
        box.innerHTML = `
          <div class="continue">
            <div class="continue-body">
              <span class="eyebrow">Готово</span>
              <div class="continue-title">Все пункты отмечены. Время обновлять резюме.</div>
            </div>
          </div>`;
        return;
      }
      const started = flat.some(e => isDone(e.item.id));
      box.innerHTML = `
        <div class="continue">
          <div class="continue-body">
            <span class="eyebrow">${started ? 'Продолжить' : 'Начать'}</span>
            <div class="continue-path">${esc(next.section.title)} › ${esc(next.card.title)}</div>
            <div class="continue-title">${esc(next.item.title)}</div>
          </div>
          <button class="btn" type="button" data-goto="${next.item.id}">Перейти</button>
        </div>`;
    }

    /* ---------- Раскрытие карточек ---------- */

    function setOpen(cardEl, open, persist) {
      cardEl.classList.toggle('open', open);
      $('.card-head', cardEl).setAttribute('aria-expanded', String(open));
      if (persist) {
        ui.open[cfg.page + ':' + cardEl.id] = open;
        saveUI();
      }
    }

    function restoreOpen() {
      const known = Object.keys(ui.open).some(key => key.startsWith(cfg.page + ':'));
      const next = nextItem();
      sections.forEach(section =>
        section.cards.forEach(card => {
          const stored = ui.open[openKey(card)];
          const open = known ? stored === true : Boolean(next && next.card === card);
          setOpen(document.getElementById(card.id), open, false);
        })
      );
    }

    function setAllOpen(open) {
      $$('.card', content).forEach(cardEl => setOpen(cardEl, open, true));
    }

    function clearSearch() {
      const input = $('#ui-search');
      if (input.value) {
        input.value = '';
        applySearch('');
      }
    }

    function goToItem(id) {
      const entry = flat.find(e => e.item.id === id);
      if (!entry) return;
      clearSearch();
      setOpen(document.getElementById(entry.card.id), true, true);
      const el = document.getElementById('item-' + id);
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
      el.classList.remove('flash');
      void el.offsetWidth;
      el.classList.add('flash');
    }

    function openFromHash() {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      if (el.classList.contains('card')) setOpen(el, true, true);
      el.scrollIntoView({ behavior: 'instant' });
    }

    /* ---------- Поиск ---------- */

    function applySearch(raw) {
      const q = raw.trim().toLowerCase();
      content.classList.toggle('searching', Boolean(q));
      let anyVisible = false;

      sections.forEach(section => {
        let sectionVisible = false;
        section.cards.forEach(card => {
          const cardEl = document.getElementById(card.id);
          const titleHit = Boolean(q) && card.title.toLowerCase().includes(q);
          let cardVisible = !q || titleHit || (cardEl.dataset.search || '').includes(q);
          (card.items || []).forEach(item => {
            const itemEl = document.getElementById('item-' + item.id);
            const hit = !q || titleHit || itemEl.dataset.search.includes(q);
            itemEl.classList.toggle('search-miss', !hit);
            if (hit) cardVisible = true;
          });
          cardEl.classList.toggle('search-miss', !cardVisible);
          if (cardVisible) sectionVisible = true;
        });
        document.getElementById(section.id).classList.toggle('search-miss', !sectionVisible);
        if (sectionVisible) anyVisible = true;
      });

      $('#ui-empty').hidden = anyVisible;
    }

    /* ---------- Подсветка текущего раздела в меню ---------- */

    function updateActiveNav() {
      const line = 120;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      let currentSection = sections[0].id;
      let currentCard = '';

      sections.forEach(section => {
        const el = document.getElementById(section.id);
        if (el.getBoundingClientRect().top < line) currentSection = section.id;
      });
      if (atBottom) currentSection = sections[sections.length - 1].id;

      if (cfg.navCards) {
        const section = sections.find(s => s.id === currentSection);
        section.cards.forEach(card => {
          if (document.getElementById(card.id).getBoundingClientRect().top < line + 40) currentCard = card.id;
        });
      }

      $$('[data-group]').forEach(li => li.classList.toggle('active-group', li.dataset.group === currentSection));
      $$('[data-nav]').forEach(link => {
        const active = link.dataset.nav === currentSection || link.dataset.nav === currentCard;
        link.classList.toggle('active', active);
      });
    }

    /* ---------- Экспорт / импорт ---------- */

    function exportProgress() {
      const data = {
        app: 'nastya-frontend-roadmap',
        exportedAt: new Date().toISOString(),
        roadmap: loadJSON(ROADMAP_KEY),
        lab: loadJSON(LAB_KEY),
      };
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `frontend-roadmap-progress-${data.exportedAt.slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }

    async function importProgress(file) {
      try {
        const data = JSON.parse(await file.text());
        const valid = v => v && typeof v === 'object' && !Array.isArray(v);
        if (!valid(data) || !valid(data.roadmap) || !valid(data.lab)) throw new Error('bad format');
        const summary = `роадмап — ${Object.keys(data.roadmap).length}, Mega Lab — ${Object.keys(data.lab).length}`;
        if (!confirm(`Заменить текущий прогресс данными из файла?\nОтмечено в файле: ${summary}.`)) return;
        saveJSON(ROADMAP_KEY, data.roadmap);
        saveJSON(LAB_KEY, data.lab);
        location.reload();
      } catch {
        alert('Не получилось прочитать файл. Нужен JSON, сохранённый кнопкой «Экспорт».');
      }
    }

    /* ---------- События ---------- */

    function bind() {
      content.addEventListener('change', event => {
        const id = event.target.dataset && event.target.dataset.check;
        if (!id) return;
        if (event.target.checked) progress[id] = true;
        else delete progress[id];
        saveJSON(cfg.storageKey, progress);
        update();
      });

      content.addEventListener('click', event => {
        const head = event.target.closest('.card-head');
        if (!head) return;
        const cardEl = head.closest('.card');
        setOpen(cardEl, !cardEl.classList.contains('open'), true);
      });

      $('#ui-continue').addEventListener('click', event => {
        const btn = event.target.closest('[data-goto]');
        if (btn) goToItem(btn.dataset.goto);
      });

      $('#ui-search').addEventListener('input', event => applySearch(event.target.value));

      const hideBtn = $('#ui-hide-done');
      const setHideDone = on => {
        document.body.classList.toggle('hide-done', on);
        hideBtn.setAttribute('aria-pressed', String(on));
      };
      setHideDone(ui.hideDone === true);
      hideBtn.addEventListener('click', () => {
        ui.hideDone = !ui.hideDone;
        saveUI();
        setHideDone(ui.hideDone);
      });

      $('#ui-news-btn').addEventListener('click', () => {
        renderNews(true);
        window.scrollTo({ top: 0 });
      });

      $('#ui-expand').addEventListener('click', () => setAllOpen(true));
      $('#ui-collapse').addEventListener('click', () => setAllOpen(false));

      // Мобильное меню
      const closeNav = () => document.body.classList.remove('nav-open');
      $('#ui-menu').addEventListener('click', () => document.body.classList.toggle('nav-open'));
      $('#ui-overlay').addEventListener('click', closeNav);
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeNav();
        if (event.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
          event.preventDefault();
          $('#ui-search').focus();
        }
      });
      $('#ui-nav').addEventListener('click', event => {
        const link = event.target.closest('[data-nav]');
        if (!link) return;
        clearSearch();
        const target = document.getElementById(link.dataset.nav);
        if (target && target.classList.contains('card')) setOpen(target, true, true);
        closeNav();
      });

      // Тема
      $('#ui-theme').addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = next;
        ui.theme = next;
        saveUI();
      });

      $('#ui-export').addEventListener('click', exportProgress);
      $('#ui-import').addEventListener('click', () => $('#ui-import-file').click());
      $('#ui-import-file').addEventListener('change', event => {
        const file = event.target.files[0];
        if (file) importProgress(file);
        event.target.value = '';
      });

      let ticking = false;
      window.addEventListener(
        'scroll',
        () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
          });
        },
        { passive: true }
      );

      window.addEventListener('hashchange', openFromHash);

      // Прогресс поменяли в другой вкладке
      window.addEventListener('storage', event => {
        if (event.key !== cfg.storageKey) return;
        progress = loadJSON(cfg.storageKey);
        update();
      });
    }

    renderNews();
    renderNav();
    content.innerHTML = sections.map(renderSection).join('');
    update();
    restoreOpen();
    bind();
    openFromHash();
    updateActiveNav();
  }

  return { init, esc, fmt, ROADMAP_KEY, LAB_KEY };
})();
