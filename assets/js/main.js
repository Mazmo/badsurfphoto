const toggle=document.querySelector('.nav-toggle');const nav=document.querySelector('.site-nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open')}))}

const filters=document.querySelectorAll('.filter-btn');const items=document.querySelectorAll('.gallery-item');filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;items.forEach(item=>item.hidden=f!=='all'&&!item.dataset.category.includes(f))}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('[data-email-link]').forEach(el=>{const email=['badsurfphoto','gmail.com'].join('@');el.href='mailto:'+email});

/* Medição sem cookies: contagem agregada de cliques de contacto (sem IP, sem dados pessoais). Um clique não é uma conversa nem uma reserva. */
(function(){try{
const en=document.documentElement.lang==='en';
const srcOf=()=>{const r=document.referrer;let q='';try{q=(new URLSearchParams(location.search).get('utm_source')||'').toLowerCase()}catch(e){}
if(/chatgpt|openai/.test(q))return'chatgpt';if(!r)return'direto';let h='';try{h=new URL(r).hostname.replace(/^www\./,'')}catch(e){return'outro'}
if(h===location.hostname.replace(/^www\./,''))return'interno';
if(/(^|\.)chatgpt\.com$|chat\.openai\.com$/.test(h))return'chatgpt';if(/perplexity\.ai$/.test(h))return'perplexity';
if(/(^|\.)google\./.test(h))return'google';if(/bing\.com$/.test(h))return'bing';if(/duckduckgo\.com$/.test(h))return'duckduckgo';
if(/instagram\.com$/.test(h))return'instagram';if(/facebook\.com$|fb\.com$/.test(h))return'facebook';return'outro'};
const send=ev=>{const body=JSON.stringify({brand:'badsurf',event:ev,page:location.pathname,lang:en?'en':'pt',src:srcOf()});
fetch('https://agenda.badsurfphoto.workers.dev/api/track',{method:'POST',keepalive:true,headers:{'content-type':'application/json'},body}).catch(()=>{})};
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;const u=a.getAttribute('href')||'';
if(/^https:\/\/wa\.me\//.test(u))send('whatsapp_click');else if(/^mailto:/.test(u)||a.hasAttribute('data-email-link'))send('email_click');else if(/^\/(en\/book|marcar)\/?$/.test(u))send('booking_click')},true);
}catch(e){}})();
