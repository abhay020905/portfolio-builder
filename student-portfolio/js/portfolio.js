// portfolio.js — Portfolio builder logic

let skills = [];
let eduItems = [];
let projectItems = [];
let achieveItems = [];

// ===== SKILLS =====
function addSkill() {
  const input = document.getElementById('skill-input');
  const val = input.value.trim();
  if (!val) return;
  if (skills.includes(val)) { input.value = ''; return; }
  skills.push(val);
  input.value = '';
  renderSkillTags();
  updatePreview();
}

function removeSkill(s) {
  skills = skills.filter(x => x !== s);
  renderSkillTags();
  updatePreview();
}

function renderSkillTags() {
  const wrap = document.getElementById('skills-tags');
  wrap.innerHTML = skills.map(s =>
    `<div class="tag">${s} <span onclick="removeSkill('${s}')">✕</span></div>`
  ).join('');
}

// ===== EDUCATION =====
let eduCount = 0;
function addEdu() {
  const id = eduCount++;
  const list = document.getElementById('edu-list');
  const div = document.createElement('div');
  div.className = 'dynamic-entry';
  div.id = `edu-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('edu-${id}', eduItems, ${id}, updatePreview)">✕</button>
    <div class="form-row">
      <div class="form-group"><label>Degree / Course</label><input type="text" data-field="degree" placeholder="e.g. B.Tech CSE" oninput="syncEdu(${id}, this)"/></div>
      <div class="form-group"><label>College / University</label><input type="text" data-field="college" placeholder="e.g. RGPV University" oninput="syncEdu(${id}, this)"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Year / Duration</label><input type="text" data-field="year" placeholder="e.g. 2021 – 2025" oninput="syncEdu(${id}, this)"/></div>
      <div class="form-group"><label>CGPA / Percentage</label><input type="text" data-field="cgpa" placeholder="e.g. 8.5 CGPA" oninput="syncEdu(${id}, this)"/></div>
    </div>
  `;
  list.appendChild(div);
  eduItems.push({ id, degree: '', college: '', year: '', cgpa: '' });
}

function syncEdu(id, el) {
  const item = eduItems.find(e => e.id === id);
  if (item) { item[el.dataset.field] = el.value; updatePreview(); }
}

// ===== PROJECTS =====
let projCount = 0;
function addProject() {
  const id = projCount++;
  const list = document.getElementById('project-list');
  const div = document.createElement('div');
  div.className = 'dynamic-entry';
  div.id = `proj-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('proj-${id}', projectItems, ${id}, updatePreview)">✕</button>
    <div class="form-row">
      <div class="form-group"><label>Project Name</label><input type="text" data-field="name" placeholder="e.g. E-Commerce Website" oninput="syncProj(${id}, this)"/></div>
      <div class="form-group"><label>Tech Stack</label><input type="text" data-field="tech" placeholder="e.g. React, Node.js, MongoDB" oninput="syncProj(${id}, this)"/></div>
    </div>
    <div class="form-group"><label>Description</label><textarea data-field="desc" placeholder="What does this project do?" oninput="syncProj(${id}, this)"></textarea></div>
    <div class="form-group"><label>Live Link / GitHub</label><input type="url" data-field="link" placeholder="https://github.com/..." oninput="syncProj(${id}, this)"/></div>
  `;
  list.appendChild(div);
  projectItems.push({ id, name: '', tech: '', desc: '', link: '' });
}

function syncProj(id, el) {
  const item = projectItems.find(e => e.id === id);
  if (item) { item[el.dataset.field] = el.value; updatePreview(); }
}

// ===== ACHIEVEMENTS =====
let achieveCount = 0;
function addAchieve() {
  const id = achieveCount++;
  const list = document.getElementById('achieve-list');
  const div = document.createElement('div');
  div.className = 'dynamic-entry';
  div.id = `achieve-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="removeEntry('achieve-${id}', achieveItems, ${id}, updatePreview)">✕</button>
    <div class="form-row">
      <div class="form-group"><label>Achievement / Certification</label><input type="text" data-field="title" placeholder="e.g. Google Cloud Certified" oninput="syncAchieve(${id}, this)"/></div>
      <div class="form-group"><label>Year</label><input type="text" data-field="year" placeholder="e.g. 2024" oninput="syncAchieve(${id}, this)"/></div>
    </div>
  `;
  list.appendChild(div);
  achieveItems.push({ id, title: '', year: '' });
}

function syncAchieve(id, el) {
  const item = achieveItems.find(e => e.id === id);
  if (item) { item[el.dataset.field] = el.value; updatePreview(); }
}

// ===== GENERIC REMOVE =====
function removeEntry(domId, arr, id, callback) {
  document.getElementById(domId).remove();
  const idx = arr.findIndex(e => e.id === id);
  if (idx > -1) arr.splice(idx, 1);
  callback();
}

// ===== LIVE PREVIEW =====
function updatePreview() {
  const name = document.getElementById('p-name').value || 'Your Name';
  const title = document.getElementById('p-title').value || 'Professional Title';
  const bio = document.getElementById('p-bio').value || 'Your bio will appear here...';
  const email = document.getElementById('p-email').value;
  const phone = document.getElementById('p-phone').value;
  const location = document.getElementById('p-location').value;
  const linkedin = document.getElementById('p-linkedin').value;
  const github = document.getElementById('p-github').value;

  // Avatar
  document.getElementById('prev-avatar').textContent = name.charAt(0).toUpperCase() || '?';
  document.getElementById('prev-name').textContent = name;
  document.getElementById('prev-role').textContent = title;
  document.getElementById('prev-bio').textContent = bio;

  // Contacts
  let contacts = [];
  if (email) contacts.push(`✉ ${email}`);
  if (phone) contacts.push(`📞 ${phone}`);
  if (location) contacts.push(`📍 ${location}`);
  if (linkedin) contacts.push(`in ${linkedin}`);
  if (github) contacts.push(`⌥ ${github}`);
  document.getElementById('prev-contacts').innerHTML = contacts.map(c => `<span>${c}</span>`).join('');

  // Skills
  const skillsEl = document.getElementById('prev-skills');
  skillsEl.innerHTML = skills.length
    ? skills.map(s => `<span class="skill-pill">${s}</span>`).join('')
    : '<span style="color:var(--muted);font-size:0.85rem">No skills added yet</span>';

  // Education
  const eduEl = document.getElementById('prev-edu');
  eduEl.innerHTML = eduItems.length
    ? eduItems.map(e => `
        <div class="prev-edu-item">
          <strong>${e.degree || 'Degree'}</strong>
          <span>${e.college || 'College'} ${e.year ? '· '+e.year : ''} ${e.cgpa ? '· '+e.cgpa : ''}</span>
        </div>`).join('')
    : '<span style="color:var(--muted);font-size:0.85rem">No education added yet</span>';

  // Projects
  const projEl = document.getElementById('prev-projects');
  projEl.innerHTML = projectItems.length
    ? projectItems.map(p => `
        <div class="prev-proj-item">
          <strong>${p.name || 'Project Name'}</strong>
          <span>${p.tech ? '🛠 '+p.tech : ''}</span>
          <span>${p.desc || ''}</span>
        </div>`).join('')
    : '<span style="color:var(--muted);font-size:0.85rem">No projects added yet</span>';

  // Achievements
  const achEl = document.getElementById('prev-achieves');
  achEl.innerHTML = achieveItems.length
    ? achieveItems.map(a => `<div class="prev-edu-item"><strong>✦ ${a.title || 'Achievement'}</strong> <span>${a.year || ''}</span></div>`).join('')
    : '<span style="color:var(--muted);font-size:0.85rem">None added yet</span>';
}

// ===== SAVE/LOAD LOCAL STORAGE =====
function saveToLocal() {
  const data = {
    name: document.getElementById('p-name').value,
    title: document.getElementById('p-title').value,
    bio: document.getElementById('p-bio').value,
    email: document.getElementById('p-email').value,
    phone: document.getElementById('p-phone').value,
    location: document.getElementById('p-location').value,
    linkedin: document.getElementById('p-linkedin').value,
    github: document.getElementById('p-github').value,
    skills, eduItems, projectItems, achieveItems
  };
  localStorage.setItem('portfolioData', JSON.stringify(data));
  showToast('Data saved! ✓');
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:2rem;right:2rem;background:var(--accent);color:#fff;padding:0.8rem 1.5rem;border-radius:99px;font-size:0.9rem;z-index:999;animation:slideUp 0.3s ease`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// Load data on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('portfolioData');
  if (saved) {
    try {
      const d = JSON.parse(saved);
      document.getElementById('p-name').value = d.name || '';
      document.getElementById('p-title').value = d.title || '';
      document.getElementById('p-bio').value = d.bio || '';
      document.getElementById('p-email').value = d.email || '';
      document.getElementById('p-phone').value = d.phone || '';
      document.getElementById('p-location').value = d.location || '';
      document.getElementById('p-linkedin').value = d.linkedin || '';
      document.getElementById('p-github').value = d.github || '';
      skills = d.skills || [];
      renderSkillTags();
      updatePreview();
    } catch(e) {}
  }
});
