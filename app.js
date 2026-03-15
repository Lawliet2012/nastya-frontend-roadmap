const STORAGE_KEY = 'nastya-roadmap-progress';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

let progress = loadProgress();

function isChecked(id) {
  return progress[id] === true;
}

function toggleCheck(id) {
  if (progress[id]) {
    delete progress[id];
  } else {
    progress[id] = true;
  }
  saveProgress(progress);
  updateAllProgress();
}

function getAllCheckableItems() {
  const items = [];
  ROADMAP_DATA.forEach(section => {
    section.topics.forEach(topic => {
      if (!topic.isResources) {
        topic.items.forEach(item => items.push(item.id));
      }
    });
  });
  return items;
}

function getSectionCheckableItems(section) {
  const items = [];
  section.topics.forEach(topic => {
    if (!topic.isResources) {
      topic.items.forEach(item => items.push(item.id));
    }
  });
  return items;
}

function getTopicCheckableItems(topic) {
  if (topic.isResources) return [];
  return topic.items.map(item => item.id);
}

function calcProgress(ids) {
  if (ids.length === 0) return 0;
  const done = ids.filter(id => isChecked(id)).length;
  return Math.round((done / ids.length) * 100);
}

function updateAllProgress() {
  // Overall
  const allItems = getAllCheckableItems();
  const overallPct = calcProgress(allItems);
  document.getElementById('overall-progress-fill').style.width = overallPct + '%';
  document.getElementById('overall-progress-text').textContent = overallPct + '%';

  // Sections
  ROADMAP_DATA.forEach(section => {
    const sectionItems = getSectionCheckableItems(section);
    const sectionPct = calcProgress(sectionItems);

    const sectionFill = document.getElementById(`section-progress-${section.id}`);
    const sectionText = document.getElementById(`section-progress-text-${section.id}`);
    if (sectionFill) sectionFill.style.width = sectionPct + '%';
    if (sectionText) sectionText.textContent = sectionPct + '%';

    // Nav
    const navProgress = document.getElementById(`nav-progress-${section.id}`);
    if (navProgress) {
      navProgress.textContent = sectionPct + '%';
      navProgress.classList.toggle('done', sectionPct === 100);
    }

    // Topics
    section.topics.forEach(topic => {
      const topicItems = getTopicCheckableItems(topic);
      const topicBadge = document.getElementById(`topic-badge-${topic.id}`);
      if (topicBadge && topicItems.length > 0) {
        const done = topicItems.filter(id => isChecked(id)).length;
        topicBadge.textContent = `${done}/${topicItems.length}`;
        topicBadge.classList.toggle('all-done', done === topicItems.length);
      }
    });

    // Checkboxes
    section.topics.forEach(topic => {
      topic.items.forEach(item => {
        const box = document.getElementById(`box-${item.id}`);
        const checkItem = document.getElementById(`item-${item.id}`);
        if (box) {
          box.classList.toggle('checked', isChecked(item.id));
        }
        if (checkItem) {
          checkItem.classList.toggle('done', isChecked(item.id));
        }
      });
    });
  });
}

function renderNav() {
  const navList = document.getElementById('nav-list');
  navList.innerHTML = ROADMAP_DATA.map(section => {
    const sectionItems = getSectionCheckableItems(section);
    const pct = calcProgress(sectionItems);
    return `
      <li class="nav-item">
        <a class="nav-link" data-section="${section.id}" href="#${section.id}">
          <span class="nav-icon">${section.icon}</span>
          <span class="nav-label">${section.title}</span>
          <span class="nav-progress ${pct === 100 ? 'done' : ''}" id="nav-progress-${section.id}">${pct}%</span>
        </a>
      </li>
    `;
  }).join('');

  navList.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      closeSidebar();
    });
  });
}

function renderMain() {
  const main = document.getElementById('main-content');
  main.innerHTML = ROADMAP_DATA.map(section => {
    const sectionItems = getSectionCheckableItems(section);
    const pct = calcProgress(sectionItems);

    const topicsHtml = section.topics.map(topic => {
      const topicItems = getTopicCheckableItems(topic);
      let badgeHtml = '';
      if (topicItems.length > 0) {
        const done = topicItems.filter(id => isChecked(id)).length;
        const allDone = done === topicItems.length;
        badgeHtml = `<span class="topic-badge ${allDone ? 'all-done' : ''}" id="topic-badge-${topic.id}">${done}/${topicItems.length}</span>`;
      }

      let contentHtml;
      if (topic.isResources) {
        contentHtml = topic.items.map(item => {
          const linkHtml = item.link
            ? `<a class="resource-link" href="${item.link}" target="_blank" rel="noopener">${item.text}</a>`
            : `<span>${item.text}</span>`;
          const tipHtml = item.tip ? `<div class="resource-tip">${item.tip}</div>` : '';
          return `
            <div class="resource-item">
              <span class="resource-icon">&#128279;</span>
              ${linkHtml}
            </div>
            ${tipHtml}
          `;
        }).join('');
      } else {
        contentHtml = topic.items.map(item => {
          const checked = isChecked(item.id);
          const tipHtml = item.tip ? `
            <button class="tip-toggle" onclick="this.closest('.check-item').classList.toggle('show-tip')">&#128161; подсказка</button>
            <div class="check-tip">${item.tip}</div>
          ` : '';
          return `
            <div class="check-item ${checked ? 'done' : ''}" id="item-${item.id}">
              <div class="check-box ${checked ? 'checked' : ''}" id="box-${item.id}" onclick="toggleCheck('${item.id}')"></div>
              <div class="check-text">
                ${item.text}
                ${tipHtml}
              </div>
            </div>
          `;
        }).join('');
      }

      return `
        <div class="topic" id="topic-${topic.id}">
          <div class="topic-header" onclick="this.parentElement.classList.toggle('open')">
            <span class="topic-title">
              <span class="icon">${topic.isResources ? '&#128218;' : '&#128204;'}</span>
              ${topic.title}
            </span>
            <div style="display:flex;align-items:center;gap:8px;">
              ${badgeHtml}
              <span class="topic-chevron">&#9654;</span>
            </div>
          </div>
          <div class="topic-content">
            ${contentHtml}
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="section" id="${section.id}">
        <div class="section-header">
          <div class="section-number">${section.icon}</div>
          <h2 class="section-title">${section.title}</h2>
        </div>
        <p class="section-description">${section.description}</p>
        <div class="section-progress">
          <div class="progress-bar">
            <div class="progress-fill" id="section-progress-${section.id}" style="width:${pct}%"></div>
          </div>
          <span class="progress-text" id="section-progress-text-${section.id}">${pct}%</span>
        </div>
        ${topicsHtml}
      </section>
    `;
  }).join('');
}

// Sidebar toggle for mobile
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) overlay.classList.remove('visible');
}

document.getElementById('sidebar-toggle').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
  }
  overlay.classList.toggle('visible', sidebar.classList.contains('open'));
});

// Active nav tracking on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('.section');
  let current = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < 200) current = section.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Init
renderNav();
renderMain();
updateAllProgress();
updateActiveNav();
