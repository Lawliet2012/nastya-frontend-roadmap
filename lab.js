const LAB_STORAGE_KEY = 'nastya-lab-progress';

function loadLabProgress() {
  try {
    return JSON.parse(localStorage.getItem(LAB_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLabProgress(progress) {
  localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(progress));
}

let labProgress = loadLabProgress();

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function isTaskDone(id) {
  return labProgress[id] === true;
}

function toggleTask(id) {
  if (labProgress[id]) {
    delete labProgress[id];
  } else {
    labProgress[id] = true;
  }
  saveLabProgress(labProgress);
  updateLabProgress();
}

function getAllTaskIds() {
  const ids = [];
  LAB_DATA.phases.forEach(phase => {
    phase.steps.forEach(step => {
      step.tasks.forEach(task => ids.push(task.id));
    });
  });
  return ids;
}

function getPhaseTaskIds(phase) {
  const ids = [];
  phase.steps.forEach(step => {
    step.tasks.forEach(task => ids.push(task.id));
  });
  return ids;
}

function getStepTaskIds(step) {
  return step.tasks.map(t => t.id);
}

function countDone(ids) {
  return ids.filter(id => isTaskDone(id)).length;
}

function updateLabProgress() {
  const allIds = getAllTaskIds();
  const totalDone = countDone(allIds);
  const total = allIds.length;
  const pct = total === 0 ? 0 : Math.round((totalDone / total) * 100);

  document.getElementById('overall-progress-fill').style.width = pct + '%';
  document.getElementById('overall-progress-text').textContent = `${totalDone} / ${total}`;

  LAB_DATA.phases.forEach(phase => {
    const phaseIds = getPhaseTaskIds(phase);
    const phaseDone = countDone(phaseIds);
    const phaseTotal = phaseIds.length;

    const navProg = document.getElementById(`nav-prog-${phase.id}`);
    if (navProg) {
      navProg.textContent = `${phaseDone}/${phaseTotal}`;
      navProg.classList.toggle('done', phaseDone === phaseTotal);
    }

    const phaseFill = document.getElementById(`phase-fill-${phase.id}`);
    const phaseText = document.getElementById(`phase-text-${phase.id}`);
    if (phaseFill) {
      const p = phaseTotal === 0 ? 0 : Math.round((phaseDone / phaseTotal) * 100);
      phaseFill.style.width = p + '%';
    }
    if (phaseText) {
      phaseText.textContent = `${phaseDone}/${phaseTotal}`;
    }

    phase.steps.forEach(step => {
      const stepIds = getStepTaskIds(step);
      const stepDone = countDone(stepIds);
      const stepTotal = stepIds.length;

      const badge = document.getElementById(`step-badge-${step.id}`);
      if (badge) {
        badge.textContent = `${stepDone}/${stepTotal}`;
        badge.classList.toggle('all-done', stepDone === stepTotal);
      }

      step.tasks.forEach(task => {
        const box = document.getElementById(`box-${task.id}`);
        const item = document.getElementById(`item-${task.id}`);
        if (box) box.classList.toggle('checked', isTaskDone(task.id));
        if (item) item.classList.toggle('done', isTaskDone(task.id));
      });
    });
  });
}

function renderLabNav() {
  const nav = document.getElementById('nav-list');
  let stepCounter = 0;
  nav.innerHTML = LAB_DATA.phases.map((phase, pi) => {
    const phaseIds = getPhaseTaskIds(phase);
    const done = countDone(phaseIds);
    const total = phaseIds.length;

    const stepsHtml = phase.steps.map(step => {
      stepCounter++;
      return `
        <li class="nav-sub-item">
          <a class="nav-sub-link" href="#${step.id}" data-section="${step.id}">
            <span class="nav-step-num">${stepCounter}</span>
            <span class="nav-step-title">${step.title}</span>
          </a>
        </li>
      `;
    }).join('');

    return `
      <li class="nav-phase">
        <a class="nav-link" href="#phase-${phase.id}" data-section="phase-${phase.id}">
          <span class="nav-icon">P${pi + 1}</span>
          <span class="nav-label">${phase.title}</span>
          <span class="nav-progress ${done === total ? 'done' : ''}" id="nav-prog-${phase.id}">${done}/${total}</span>
        </a>
        <ul class="nav-sub-list">${stepsHtml}</ul>
      </li>
    `;
  }).join('');

  nav.querySelectorAll('a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.section;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      closeSidebar();
    });
  });
}

function renderLabMain() {
  const main = document.getElementById('main-content');
  let stepCounter = 0;

  main.innerHTML = LAB_DATA.phases.map((phase, pi) => {
    const phaseIds = getPhaseTaskIds(phase);
    const phaseDone = countDone(phaseIds);
    const phaseTotal = phaseIds.length;

    const stepsHtml = phase.steps.map(step => {
      stepCounter++;
      const stepIds = getStepTaskIds(step);
      const stepDone = countDone(stepIds);
      const stepTotal = stepIds.length;
      const allDone = stepDone === stepTotal;

      const tasksHtml = step.tasks.map((task, ti) => {
        const checked = isTaskDone(task.id);
        const hintHtml = task.hint ? `
          <button class="hint-toggle" onclick="this.closest('.task-item').classList.toggle('show-hint')">&#9881; подсказка</button>
          <div class="task-hint">${esc(task.hint)}</div>
        ` : '';
        return `
          <div class="task-item ${checked ? 'done' : ''}" id="item-${task.id}">
            <div class="task-box ${checked ? 'checked' : ''}" id="box-${task.id}" onclick="toggleTask('${task.id}')"></div>
            <div class="task-content">
              <div class="task-text">${esc(task.text)}</div>
              ${hintHtml}
            </div>
          </div>
        `;
      }).join('');

      const coversHtml = step.covers.map(c => `<span class="cover-tag">${esc(c)}</span>`).join('');

      return `
        <div class="step" id="${step.id}">
          <div class="step-header" onclick="this.parentElement.classList.toggle('open')">
            <div class="step-title-row">
              <span class="step-number">${stepCounter}</span>
              <h3 class="step-title">${step.title}</h3>
            </div>
            <div class="step-meta">
              <span class="step-badge ${allDone ? 'all-done' : ''}" id="step-badge-${step.id}">${stepDone}/${stepTotal}</span>
              <span class="step-chevron">&#9654;</span>
            </div>
          </div>
          <div class="step-body">
            <div class="step-why">
              <div class="why-label">&#127919; Зачем</div>
              <p>${esc(step.why)}</p>
            </div>
            <div class="step-covers">
              <span class="covers-label">Покрывает:</span>
              ${coversHtml}
            </div>
            <div class="step-tasks">
              ${tasksHtml}
            </div>
            <div class="step-checkpoint">
              <div class="checkpoint-label">&#9989; Чекпоинт</div>
              <p>${esc(step.checkpoint)}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="phase" id="phase-${phase.id}">
        <div class="phase-header">
          <div class="phase-number">P${pi + 1}</div>
          <div>
            <h2 class="phase-title">${phase.title}</h2>
            <p class="phase-description">${phase.description}</p>
          </div>
        </div>
        <div class="phase-progress">
          <div class="progress-bar">
            <div class="progress-fill" id="phase-fill-${phase.id}" style="width:${phaseTotal ? Math.round(phaseDone/phaseTotal*100) : 0}%"></div>
          </div>
          <span class="progress-text" id="phase-text-${phase.id}">${phaseDone}/${phaseTotal}</span>
        </div>
        ${stepsHtml}
      </section>
    `;
  }).join('');
}

// Sidebar mobile
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

// Active nav
function updateActiveNav() {
  const steps = document.querySelectorAll('.step, .phase');
  let current = '';
  steps.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < 200) current = el.id;
  });
  document.querySelectorAll('.nav-link, .nav-sub-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Init
renderLabNav();
renderLabMain();
updateLabProgress();
updateActiveNav();
