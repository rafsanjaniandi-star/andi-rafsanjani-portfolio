/* V8 — Certifications grouped like Skills + preserve floating-card formation */
const v8Certificates = [
{name:'Palo Alto Networks Security Operation Fundamental',group:'SECURITY & AWARENESS',issuer:'Palo Alto Networks',url:'https://drive.google.com/file/d/1G-QB2xMYXHsvjF6GT1HqlFg8ApKtohZg/view?usp=sharing',badge:'PALO ALTO'},
{name:'Palo Alto Cloud Security Fundamentals',group:'SECURITY & AWARENESS',issuer:'Palo Alto Networks',url:'https://drive.google.com/file/d/1LFUXKM7EDoxw4Z0B6HL9HJEfiO9i2u37/view?usp=sharing',badge:'PALO ALTO'},
{name:'Webinar IT Cyber Security',group:'SECURITY & AWARENESS',issuer:'IT Cyber Security',url:'https://drive.google.com/file/d/13gyR4TUxTOc15w6dayOjtp6ePJ6CpZYh/view?usp=sharing',badge:'SECURITY'},
{name:'AML Awareness',group:'SECURITY & AWARENESS',issuer:'Security Awareness',url:'https://drive.google.com/file/d/1KfFrA-gsAmL3nfI1kntJaSm9fsr4KRfN/view?usp=sharing',badge:'AML'},
{name:'Awareness Phising',group:'SECURITY & AWARENESS',issuer:'Security Awareness',url:'https://drive.google.com/file/d/12GNtGITx8vIwD5qzLcvCzL_CBRd7T5yD/view?usp=sharing',badge:'SECURITY'},
{name:'Webinar IT Networking',group:'NETWORKING',issuer:'IT Networking',url:'https://drive.google.com/file/d/13hSIN6LOv7tgGuDjrPIknBFxHEm7fZfO/view?usp=sharing',badge:'NETWORK'},
{name:'Introduction to Network',group:'NETWORKING',issuer:'Networking',url:'https://drive.google.com/file/d/12EV_jsMUyz06GysXU0MrgM4HZFmtGUL4/view?usp=sharing',badge:'NETWORK'},
{name:'CcNAv7',group:'NETWORKING',issuer:'Networking',url:'https://drive.google.com/file/d/12Gas7ybPQM3gpFrRBbkjSNHOvo88pH-q/view?usp=sharing',badge:'NETWORK'},
{name:'Sertifikat Algoritma',group:'TECHNOLOGY',issuer:'Technology Learning',url:'https://drive.google.com/file/d/12X3c9IgNBMAEW0t3OLAT4qQsMA9_WooS/view?usp=sharing',badge:'ALGO'},
{name:'Sertifikat IDN 2025',group:'TECHNOLOGY',issuer:'ID-Networkers',url:'https://drive.google.com/file/d/13HtEGiWh2IrDdr9Z-3l8f8uSpEo8oAuV/view?usp=sharing',badge:'IDN'},
{name:'Cerfificate - Media Sosial',group:'OTHER',issuer:'Learning Certificate',url:'https://drive.google.com/file/d/1bP9WUmBrTmpnV1LNZpuKRgGSduSU_FRA/view?usp=sharing',badge:'OTHER'}
];

document.addEventListener('DOMContentLoaded',()=>{
 const menuToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
 menuToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
 document.querySelectorAll('.nav a').forEach(l=>l.addEventListener('click',()=>{nav.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');}));
 const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
 const sections=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('.nav a')];
 const activeObserver=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')===`#${e.target.id}`));}),{rootMargin:'-35% 0px -55% 0px'});
 sections.forEach(s=>activeObserver.observe(s));
 const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

 const grid=document.querySelector('.cert-grid');

 if(grid){
  const section=document.querySelector('#certifications');

  section?.querySelectorAll(
    '.cert-filters-v7,.cert-filters,.credly-card-v7,.credly-link'
  ).forEach(e=>e.remove());

  grid.innerHTML='';

  const groups=[
   {
    name:'SECURITY & AWARENESS',
    icon:'🛡️',
    items:v8Certificates.filter(c=>c.group==='SECURITY & AWARENESS')
   },
   {
    name:'NETWORKING',
    icon:'🌐',
    items:v8Certificates.filter(c=>c.group==='NETWORKING')
   },
   {
    name:'TECHNOLOGY',
    icon:'💻',
    items:v8Certificates.filter(c=>c.group==='TECHNOLOGY')
   },
   {
    name:'OTHER',
    icon:'📱',
    items:v8Certificates.filter(c=>c.group==='OTHER')
   }
  ];

  groups.forEach(group=>{
   const wrap=document.createElement('div');
   wrap.className='cert-group-v9';

   const title=document.createElement('h3');
   title.className='cert-group-heading-v9';

   const icon=document.createElement('span');
   icon.className='cert-group-icon-v9';
   icon.textContent=group.icon;

   const label=document.createElement('span');
   label.textContent=group.name;

   title.append(icon,label);

   const list=document.createElement('div');
   list.className='cert-name-list-v9';

   group.items.forEach(c=>{
    const a=document.createElement('a');

    a.className='cert-name-v9';
    a.href=c.url;
    a.target='_blank';
    a.rel='noopener noreferrer';
    a.textContent=c.name;

    list.appendChild(a);
   });

   wrap.append(title,list);
   grid.appendChild(wrap);
  });

  const credly=document.createElement('a');

  credly.className='credly-card-v8';
  credly.href='https://www.credly.com/users/andi-rafsanjani';
  credly.target='_blank';
  credly.rel='noopener noreferrer';

  credly.innerHTML=
   '<span class="credly-icon-v8">🏆</span>'+
   '<span>'+
   '<strong>Credly Digital Badges</strong>'+
   '<small>View my verified digital credentials →</small>'+
   '</span>';

  grid.appendChild(credly);

  grid.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
 }
