// ============================================================
// INVITACIÓN MELISSA & RODRIGO — RSVP
// ============================================================
// 1) Crea tu Google Sheet.
// 2) Crea el Google Apps Script que viene en google-apps-script.gs.
// 3) Despliega el script como Web App.
// 4) Pega aquí la URL que te da Google.
// ============================================================

const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzCtRJ1oLDNpvnHk3LoNBAHMByQ1FdvqjpJQaRbRQY1Q642TdEiVdlmYh1J1Bga4W6c/exec'
};

function updateCD() {
  const t = new Date('2026-12-26T08:00:00');
  const now = new Date();
  const diff = t - now;

  if (diff <= 0) {
    ['cd-d','cd-h','cd-m','cd-s'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  document.getElementById('cd-d').textContent =
    String(Math.floor(diff / 86400000)).padStart(2, '0');

  document.getElementById('cd-h').textContent =
    String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');

  document.getElementById('cd-m').textContent =
    String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');

  document.getElementById('cd-s').textContent =
    String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}

updateCD();
setInterval(updateCD, 1000);
window.addEventListener('load', () => {
  initIntroScreen();
  initRevealAnimations();
  initParallax();
});

function initIntroScreen() {
  const introScreen = document.getElementById('intro-screen');
  const invitationContent = document.getElementById('invitation-content');

  if (!introScreen || !invitationContent) return;

  const openInvitation = () => {
    introScreen.classList.add('is-hidden');
    invitationContent.classList.add('is-visible');
    revealInvitationBlocks();
  };

  introScreen.addEventListener('click', openInvitation);
  introScreen.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openInvitation();
    }
  });
}

function revealInvitationBlocks() {
  const blocks = Array.from(document.querySelectorAll('.reveal'));
  if (!blocks.length) return;

  blocks.forEach((block, index) => {
    block.style.transitionDelay = `${index * 120}ms`;
    setTimeout(() => {
      block.classList.add('is-visible');
    }, 140 + index * 120);
  });
}

let att = 'yes';
let diet = null;

function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (typeof IntersectionObserver === 'undefined') {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const duration = entry.target.dataset.duration || 900;
        entry.target.style.transitionDuration = `${duration}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -70px 0px' });

  elements.forEach((element) => observer.observe(element));
}

function initParallax() {
  const images = document.querySelectorAll('img');
  if (!images.length) return;

  images.forEach((img) => img.classList.add('parallax-img'));

  const handleScroll = () => {
    const offset = window.scrollY;
    images.forEach((img) => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const depth = Math.max(-8, Math.min(8, (offset - rect.top) * 0.01));
        img.style.transform = `translate3d(0, ${depth}px, 0)`;
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function setAtt(value) {
  att = value;

  const yesBtn = document.getElementById('by');
  const noBtn = document.getElementById('bn');

  const applyState = (button, active) => {
    const isActive = Boolean(active);
    button.classList.toggle('on', isActive);
    button.setAttribute('aria-pressed', String(isActive));
    button.style.background = isActive ? '#2F3E2E' : 'transparent';
    button.style.borderColor = '#2F3E2E';
    button.style.color = isActive ? '#F5F0E8' : '#2F3E2E';
    button.style.boxShadow = 'none';
    button.style.opacity = '1';
  };

  if (yesBtn) applyState(yesBtn, value === 'yes');
  if (noBtn) applyState(noBtn, value === 'no');

  const dietSec = document.getElementById('diet-sec');
  if (dietSec) dietSec.style.display = value === 'yes' ? 'block' : 'none';

  if (value === 'no') {
    diet = null;
    ['d0','d1','d2','d3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('on');
        el.style.background = 'transparent';
        el.style.color = '#2F3E2E';
      }
    });
  }
}

  /* Lightbox functions for gallery images */
  function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lb || !img) return;
    img.src = src;
    lb.style.display = 'flex';
    // close on overlay click
    lb.onclick = function(e) {
      if (e.target === lb) closeLightbox();
    };
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lb || !img) return;
    img.src = '';
    lb.style.display = 'none';
  }

function setDiet(value) {
  diet = diet === value ? null : value;

  ['d0','d1','d2','d3'].forEach(id => {
    document.getElementById(id).className =
      'pill' + (diet === id ? ' on' : '');
  });
}

function getDietLabel() {
  const labels = {
    d0: 'Ninguna',
    d1: 'Vegetariano',
    d2: 'Vegano',
    d3: 'Sin gluten'
  };
  return diet ? labels[diet] : '';
}

async function doRsvp() {
  const name = document.getElementById('rn').value.trim();
  const email = document.getElementById('re').value.trim();
  const guests = document.getElementById('rguests')?.value.trim() || '';
  const button = document.getElementById('rsub');
  const message = document.getElementById('ok-msg');

  if (!name || !email) {
    alert('Por favor, rellena tu nombre y email.');
    return;
  }

  if (!email.includes('@')) {
    alert('Por favor, introduce un email válido.');
    return;
  }

  if (!guests) {
    alert('Selecciona cuántas personas nos acompañan.');
    return;
  }

  if (!CONFIG.APPS_SCRIPT_URL ||
      CONFIG.APPS_SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbwaYBftLsN8FBr4-0XAFK6q4sknaw8ddvzbnXGdauG_56EJ7G0IL2XkqgpPtXdjOLNq/exec') {
    alert('Todavía falta conectar el formulario con Google Sheets. Pega la URL de tu Web App en script.js.');
    return;
  }

  button.disabled = true;
  button.textContent = 'Enviando...';

  const data = new URLSearchParams();
  data.append('name', name);
  data.append('email', email);
  data.append('guests', guests);
  data.append('numero_personas', guests);
  data.append('attendance', att === 'yes' ? 'Sí, asistiré' : 'No podré ir');
  data.append('diet', att === 'yes' ? getDietLabel() : '');

  try {
    // mode: no-cors permite enviar el formulario desde una invitación
    // estática sin necesidad de configurar un servidor propio.
    await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: data.toString()
    });

    button.style.display = 'none';
    message.style.display = 'block';

    message.textContent =
      att === 'yes'
        ? '¡Gracias! Estamos muy felices de celebrar contigo'
        : 'Gracias por avisarnos, ' + name + '. ¡Te echaremos mucho de menos!';

    document.getElementById('rn').disabled = true;
    document.getElementById('re').disabled = true;

  } catch (error) {
    console.error(error);
    button.disabled = false;
    button.textContent = 'Confirmar asistencia';
    alert('No hemos podido enviar la confirmación. Inténtalo de nuevo.');
  }
}
