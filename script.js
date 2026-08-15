const nav = document.querySelector('.nav');
const menuBtn = document.getElementById('menuBtn');

menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxArt = document.getElementById('lightboxArt');
const lightboxTitle = document.getElementById('lightboxTitle');

document.querySelectorAll('.photo').forEach(photo => {
  photo.addEventListener('click', () => {
    lightboxArt.className = 'lightbox-art ' + [...photo.classList].filter(x => x.startsWith('p')).join(' ');
    lightboxTitle.textContent = photo.dataset.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Contact form demo — replace with Formspree/EmailJS/backend later.
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const name = new FormData(e.currentTarget).get('name');
  note.textContent = `Thanks, ${name}. The form is ready to connect to an email service.`;
  e.currentTarget.reset();
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Subtle reveal animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section > *, .reel-card, .photo').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  observer.observe(el);
});
