(function () {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('gallery-lightbox');
  if (!items.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.gallery-lightbox-img');
  const lightboxCaption = lightbox.querySelector('.gallery-lightbox-caption');
  const closeBtn = lightbox.querySelector('.gallery-lightbox-close');
  const prevBtn = lightbox.querySelector('.gallery-lightbox-prev');
  const nextBtn = lightbox.querySelector('.gallery-lightbox-next');

  let currentIndex = 0;
  let lastFocused = null;

  function show(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.dataset.caption || '';
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-lightbox-active');
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-lightbox-active');
    lightboxImg.src = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => open(index));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
})();
