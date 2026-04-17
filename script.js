// ── Navbar: scroll behavior ──
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 60
    ? 'rgba(10,10,10,0.98)'
    : 'rgba(10,10,10,0.9)';
});

// ── Menu mobile ──
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ── Reveal on scroll ──
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 110);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ── Formulário de contato ──
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = form.querySelector('[name="nome"]').value;
    const mensagem = form.querySelector('[name="mensagem"]').value;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(() => {
      const texto = encodeURIComponent(
        `Olá! Sou ${nome}, acabei de preencher o formulário do site.\n\n${mensagem}`
      );
      window.location.href = `https://wa.me/5521982616432?text=${texto}`;
    }).catch(() => {
      window.location.href = `https://wa.me/5521982616432`;
    });
  });
}