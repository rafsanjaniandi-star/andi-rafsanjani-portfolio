const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav a')];

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, {rootMargin:'-35% 0px -55% 0px', threshold:0});

sections.forEach(section => activeObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();

/* V6 — Certification Hub */
const certificates = [
  {name:'Palo Alto Networks Security Operation Fundamental', category:'Security', issuer:'Palo Alto Networks', url:'https://drive.google.com/file/d/1G-QB2xMYXHsvjF6GT1HqlFg8ApKtohZg/view?usp=sharing', badge:'PALO ALTO'},
  {name:'Palo Alto Cloud Security Fundamentals', category:'Security', issuer:'Palo Alto Networks', url:'https://drive.google.com/file/d/1LFUXKM7EDoxw4Z0B6HL9HJEfiO9i2u37/view?usp=sharing', badge:'PALO ALTO'},
  {name:'Webinar IT Networking', category:'Network', issuer:'IT Networking', url:'https://drive.google.com/file/d/13hSIN6LOv7tgGuDjrPIknBFxHEm7fZfO/view?usp=sharing', badge:'NETWORK'},
  {name:'Webinar IT Cyber Security', category:'Security', issuer:'IT Cyber Security', url:'https://drive.google.com/file/d/13gyR4TUxTOc15w6dayOjtp6ePJ6CpZYh/view?usp=sharing', badge:'SECURITY'},
  {name:'Introduction to Network', category:'Network', issuer:'Networking', url:'https://drive.google.com/file/d/12EV_jsMUyz06GysXU0MrgM4HZFmtGUL4/view?usp=sharing', badge:'NETWORK'},
  {name:'AML Awareness', category:'Security', issuer:'Security Awareness', url:'https://drive.google.com/file/d/1KfFrA-gsAmL3nfI1kntJaSm9fsr4KRfN/view?usp=sharing', badge:'AML'},
  {name:'Sertifikat Algoritma', category:'Technology', issuer:'Technology Learning', url:'https://drive.google.com/file/d/12X3c9IgNBMAEW0t3OLAT4qQsMA9_WooS/view?usp=sharing', badge:'ALGO'},
  {name:'Awareness Phising', category:'Security', issuer:'Security Awareness', url:'https://drive.google.com/file/d/12GNtGITx8vIwD5qzLcvCzL_CBRd7T5yD/view?usp=sharing', badge:'SECURITY'},
  {name:'CcNAv7', category:'Network', issuer:'Networking', url:'https://drive.google.com/file/d/12Gas7ybPQM3gpFrRBbkjSNHOvo88pH-q/view?usp=sharing', badge:'NETWORK'},
  {name:'Sertifikat IDN 2025', category:'Technology', issuer:'ID-Networkers', url:'https://drive.google.com/file/d/13HtEGiWh2IrDdr9Z-3l8f8uSpEo8oAuV/view?usp=sharing', badge:'IDN'},
  {name:'Cerfificate - Media Sosial', category:'Other', issuer:'Learning Certificate', url:'https://drive.google.com/file/d/1bP9WUmBrTmpnV1LNZpuKRgGSduSU_FRA/view?usp=sharing', badge:'OTHER'}
];

const certGrid = document.querySelector('.cert-grid');
if (certGrid) {
  const section = document.querySelector('#certifications');
  const filters = document.createElement('div');
  filters.className = 'cert-filters reveal';
  const categories = ['All','Security','Network','Technology','Other'];
  filters.innerHTML = categories.map((cat, i) =>
    `<button type="button" class="cert-filter ${i === 0 ? 'active' : ''}" data-filter="${cat}">${cat}</button>`
  ).join('');
  certGrid.before(filters);

  const credly = document.createElement('a');
  credly.className = 'credly-link reveal';
  credly.href = 'https://www.credly.com/users/andi-rafsanjani';
  credly.target = '_blank';
  credly.rel = 'noopener';
  credly.innerHTML = '<span class="credly-mark">🏆</span><div><strong>Credly Digital Badges</strong><small>View my verified digital credentials →</small></div>';
  certGrid.after(credly);

  const renderCerts = (filter = 'All') => {
    certGrid.innerHTML = certificates
      .filter(c => filter === 'All' || c.category === filter)
      .map(c =>
        `<a class="cert-card reveal" href="${c.url}" target="_blank" rel="noopener" aria-label="View ${c.name}">
          <span>${c.badge}</span>
          <div><h3>${c.name}</h3><p>${c.issuer} · ${c.category} · View certificate →</p></div>
        </a>`
      ).join('');
    certGrid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  filters.addEventListener('click', e => {
    const btn = e.target.closest('.cert-filter');
    if (!btn) return;
    filters.querySelectorAll('.cert-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCerts(btn.dataset.filter);
  });

  renderCerts();
  section?.querySelector('.small-note')?.remove();
}
