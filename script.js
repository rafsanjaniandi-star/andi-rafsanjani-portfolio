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
