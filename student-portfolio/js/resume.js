// resume.js — Resume builder logic with PDF export

let rSkills = [];
let rEduItems = [];
let rExpItems = [];
let rProjItems = [];
let rAchieveItems = [];

// ===== SKILLS =====
function rAddSkill() {
  const input = document.getElementById('r-skill-input');
  const val = input.value.trim();
  if (!val) return;
  if (!rSkills.includes(val)) rSkills.push(val);
  input.value = '';
  renderRSkillTags();
  renderResume();
}

function rRemoveSkill(s) {
  rSkills = rSkills.filter(x => x !== s);
  renderRSkillTags();
  renderResume();
}

function renderRSkillTags() {
  const wrap = document.getElementById('r-skills-tags');
  wrap.innerHTML = rSkills.map(s =>
    `<div class="tag">${s} <span onclick="rRemoveSkill('${s}')">✕</span></div>`
  ).join('');
}

// ===== EDUCATION =====
let rEduCount = 0;
function rAddEdu() {
  const id = rEduCount++;
  const list = document.getElementById('r-edu-list');
  const div = document.createElement('div');
  div.className = 'dynamic-entry';
  div.id = `redu-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="rRemoveEntry('redu-${id}', rEduItems, ${id})">✕</button>
    <div class="form-row">
      <div class="form-group"><label>Degree</label><input type="text" data-field="degree" placeholder="e.g. B.Tech CSE" oninput="rSyncEdu(${id}, this)"/></div>
      <div class="form-group"><label>Institution</label><input type="text" data-field="college" placeholder="e.g. RGPV" oninput="rSyncEdu(${id}, this)"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Year</label><input type="text" data-field="year" placeholder="2021 – 2025" oninput="rSyncEdu(${id}, this)"/></div>
      <div class="form-group"><label>CGPA / %</label><input type="text" data-field="cgpa" placeholder="8.5 CGPA" oninput="rSyncEdu(${id}, this)"/></div>
    </div>
  `;
  list.appendChild(div);
  rEduItems.push({ id, degree: '', college: '', year: '', cgpa: '' });
}
function rSyncEdu(id, el) {
  const item = rEduItems.find(e => e.id === id);
  if (item) { item[el.dataset.field] = el.value; renderResume(); }
}

// ===== EXPERIENCE =====
let rExpCount = 0;
function rAddExp() {
  const id = rExpCount++;
  const list = document.getElementById('r-exp-list');
  const div = document.createElement('div');
  div.className = 'dynamic-entry';
  div.id = `rexp-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="rRemoveEntry('rexp-${id}', rExpItems, ${id})">✕</button>
    <div class="form-row">
      <div class="form-group"><label>Job Title / Role</label><input type="text" data-field="role" placeholder="e.g. Frontend Intern" oninput="rSyncExp(${id}, this)"/></div>
      <div class="form-group"><label>Company / Organization</label><input type="text" data-field="company" placeholder="e.g. TechCorp Pvt Ltd" oninput="rSyncExp(${id}, this)"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Duration</label><input type="text" data-field="duration" placeholder="June 2024 – Aug 2024" oninput="rSyncExp(${id}, this)"/></div>
      <div class="form-group"><label>Location</label><input type="text" data-field="location" placeholder="e.g. Remote / Bhopal" oninput="rSyncExp(${id}, this)"/></div>
    </div>
    <div class="form-group"><label>Key Responsibilities / Achievements</label><textarea data-field="desc" placeholder="- Built REST APIs with Node.js&#10;- Improved page load speed by 40%" oninput="rSyncExp(${id}, this)"></textarea></div>
  `;
  list.appendChild(div);
  rExpItems.push({ id, role: '', company: '', duration: '', location: '', desc: '' });
}
function rSyncExp(id, el) {
  const item = rExpItems.find(e => e.id === id);
  if (item) { item[el.dataset.field] = el.value; renderResume(); }
}

// ===== PROJECTS =====
let rProjCount = 0;
function rAddProject() {
  const id = rProjCount++;
  const list = document.getElementById('r-proj-list');
  const div = document.createElement('div');
  div.className = 'dynamic-entry';
  div.id = `rproj-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="rRemoveEntry('rproj-${id}', rProjItems, ${id})">✕</button>
    <div class="form-row">
      <div class="form-group"><label>Project Name</label><input type="text" data-field="name" placeholder="e.g. Portfolio Website" oninput="rSyncProj(${id}, this)"/></div>
      <div class="form-group"><label>Tech Stack</label><input type="text" data-field="tech" placeholder="HTML, CSS, JS" oninput="rSyncProj(${id}, this)"/></div>
    </div>
    <div class="form-group"><label>Description</label><textarea data-field="desc" placeholder="Brief description of what you built..." oninput="rSyncProj(${id}, this)"></textarea></div>
  `;
  list.appendChild(div);
  rProjItems.push({ id, name: '', tech: '', desc: '' });
}
function rSyncProj(id, el) {
  const item = rProjItems.find(e => e.id === id);
  if (item) { item[el.dataset.field] = el.value; renderResume(); }
}

// ===== ACHIEVEMENTS =====
let rAchieveCount = 0;
function rAddAchieve() {
  const id = rAchieveCount++;
  const list = document.getElementById('r-achieve-list');
  const div = document.createElement('div');
  div.className = 'dynamic-entry';
  div.id = `rach-${id}`;
  div.innerHTML = `
    <button class="remove-btn" onclick="rRemoveEntry('rach-${id}', rAchieveItems, ${id})">✕</button>
    <div class="form-row">
      <div class="form-group"><label>Title</label><input type="text" data-field="title" placeholder="Google Cloud Certified" oninput="rSyncAchieve(${id}, this)"/></div>
      <div class="form-group"><label>Year</label><input type="text" data-field="year" placeholder="2024" oninput="rSyncAchieve(${id}, this)"/></div>
    </div>
  `;
  list.appendChild(div);
  rAchieveItems.push({ id, title: '', year: '' });
}
function rSyncAchieve(id, el) {
  const item = rAchieveItems.find(e => e.id === id);
  if (item) { item[el.dataset.field] = el.value; renderResume(); }
}

function rRemoveEntry(domId, arr, id) {
  document.getElementById(domId).remove();
  const idx = arr.findIndex(e => e.id === id);
  if (idx > -1) arr.splice(idx, 1);
  renderResume();
}

// ===== RENDER RESUME PREVIEW =====
function renderResume() {
  const name = document.getElementById('r-name').value;
  const title = document.getElementById('r-title').value;
  const email = document.getElementById('r-email').value;
  const phone = document.getElementById('r-phone').value;
  const location = document.getElementById('r-location').value;
  const linkedin = document.getElementById('r-linkedin').value;
  const github = document.getElementById('r-github').value;
  const summary = document.getElementById('r-summary').value;

  if (!name && !email) {
    document.getElementById('resume-preview').innerHTML = `<div style="color:#999;text-align:center;padding:3rem;font-size:0.9rem">Fill the form to see your resume preview here</div>`;
    return;
  }

  let contacts = [];
  if (email) contacts.push(`✉ ${email}`);
  if (phone) contacts.push(`📞 ${phone}`);
  if (location) contacts.push(`📍 ${location}`);
  if (linkedin) contacts.push(`LinkedIn: ${linkedin}`);
  if (github) contacts.push(`GitHub: ${github}`);

  let html = `<div id="resume-content">`;

  // Header
  html += `<div class="res-header">
    <div class="res-name">${name || 'Your Name'}</div>
    ${title ? `<div class="res-title">${title}</div>` : ''}
    <div class="res-contacts">${contacts.map(c => `<span>${c}</span>`).join('')}</div>
  </div>`;

  // Summary
  if (summary) {
    html += `<div class="res-section">
      <div class="res-sec-title">Professional Summary</div>
      <div class="res-summary">${summary}</div>
    </div>`;
  }

  // Education
  if (rEduItems.length) {
    html += `<div class="res-section"><div class="res-sec-title">Education</div>`;
    rEduItems.forEach(e => {
      if (!e.degree && !e.college) return;
      html += `<div class="res-entry">
        <div class="res-entry-header">
          <div class="res-entry-title">${e.degree || ''}</div>
          <div class="res-entry-date">${e.year || ''}</div>
        </div>
        <div class="res-entry-sub">${e.college || ''}${e.cgpa ? ' · ' + e.cgpa : ''}</div>
      </div>`;
    });
    html += `</div>`;
  }

  // Skills
  if (rSkills.length) {
    html += `<div class="res-section">
      <div class="res-sec-title">Technical Skills</div>
      <div class="res-skills-wrap">${rSkills.map(s => `<span class="res-skill">${s}</span>`).join('')}</div>
    </div>`;
  }

  // Experience
  if (rExpItems.length) {
    html += `<div class="res-section"><div class="res-sec-title">Work Experience</div>`;
    rExpItems.forEach(e => {
      if (!e.role && !e.company) return;
      html += `<div class="res-entry">
        <div class="res-entry-header">
          <div class="res-entry-title">${e.role || ''}</div>
          <div class="res-entry-date">${e.duration || ''}</div>
        </div>
        <div class="res-entry-sub">${e.company || ''}${e.location ? ' · ' + e.location : ''}</div>
        ${e.desc ? `<div class="res-entry-desc">${e.desc.replace(/\n/g, '<br/>')}</div>` : ''}
      </div>`;
    });
    html += `</div>`;
  }

  // Projects
  if (rProjItems.length) {
    html += `<div class="res-section"><div class="res-sec-title">Projects</div>`;
    rProjItems.forEach(p => {
      if (!p.name) return;
      html += `<div class="res-entry">
        <div class="res-entry-header">
          <div class="res-entry-title">${p.name}</div>
          ${p.tech ? `<div class="res-entry-date">${p.tech}</div>` : ''}
        </div>
        ${p.desc ? `<div class="res-entry-desc">${p.desc}</div>` : ''}
      </div>`;
    });
    html += `</div>`;
  }

  // Achievements
  if (rAchieveItems.length) {
    html += `<div class="res-section"><div class="res-sec-title">Achievements & Certifications</div>`;
    rAchieveItems.forEach(a => {
      if (!a.title) return;
      html += `<div class="res-achieve-item">${a.title}${a.year ? ' (' + a.year + ')' : ''}</div>`;
    });
    html += `</div>`;
  }

  html += `</div>`;
  document.getElementById('resume-preview').innerHTML = html;
}

// ===== PDF DOWNLOAD =====
function downloadPDF() {
  const name = document.getElementById('r-name').value || 'Resume';
  const content = document.getElementById('resume-content');
  if (!content) { alert('Please fill in your details first!'); return; }

  const btn = document.querySelector('.btn-primary');
  btn.textContent = '⏳ Generating PDF...';
  btn.classList.add('loading');

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(content).save().then(() => {
    btn.textContent = '⬇ Download PDF';
    btn.classList.remove('loading');
  }).catch(() => {
    btn.textContent = '⬇ Download PDF';
    btn.classList.remove('loading');
    alert('PDF generation failed. Try again.');
  });
}

// ===== LOAD FROM LOCAL STORAGE (from portfolio page) =====
function loadFromLocal() {
  const saved = localStorage.getItem('portfolioData');
  if (!saved) { alert('No saved data found. Fill in the Portfolio page first.'); return; }
  try {
    const d = JSON.parse(saved);
    document.getElementById('r-name').value = d.name || '';
    document.getElementById('r-title').value = d.title || '';
    document.getElementById('r-email').value = d.email || '';
    document.getElementById('r-phone').value = d.phone || '';
    document.getElementById('r-location').value = d.location || '';
    document.getElementById('r-linkedin').value = d.linkedin || '';
    document.getElementById('r-github').value = d.github || '';
    document.getElementById('r-summary').value = d.bio || '';
    rSkills = d.skills || [];
    renderRSkillTags();
    renderResume();
    showToast('Data loaded from Portfolio! ✓');
  } catch(e) { alert('Error loading data.'); }
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:2rem;right:2rem;background:#7c6aff;color:#fff;padding:0.8rem 1.5rem;border-radius:99px;font-size:0.9rem;z-index:999`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
