document.addEventListener('DOMContentLoaded', () => {
  // Intro enter button & fade
  const enterBtn = document.getElementById('enter-btn');
  const intro = document.getElementById('intro');
  const main = document.getElementById('main-content');

  if (!enterBtn || !intro || !main) {
    console.error('Missing intro or main content elements');
  } else {
    enterBtn.addEventListener('click', () => {
      intro.classList.add('fade-out');
      // after animation, hide and reveal main
      setTimeout(() => {
        intro.style.display = 'none';
        main.style.display = 'block';
        main.style.opacity = 0;
        // gentle fade-in for main
        let t = 0;
        const fadeInterval = setInterval(() => {
          t += 0.06;
          main.style.opacity = Math.min(t, 1);
          if (t >= 1) clearInterval(fadeInterval);
        }, 16);
        window.scrollTo(0, 0);
      }, 900); // matches CSS fade duration
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  // Certificates slider
  const track = document.querySelector('.cert-track');
  const leftBtn = document.querySelector('.slider-btn.left');
  const rightBtn = document.querySelector('.slider-btn.right');
  const cards = document.querySelectorAll('.cert-card');

  if (track && leftBtn && rightBtn && cards.length) {
    let index = 0;

    // compute how many items fit (visibleCount)
    function visibleCount() {
      const viewport = document.querySelector('.cert-viewport');
      const sample = cards[0];
      const cardWidth = sample.getBoundingClientRect().width + 14; // includes gap
      return Math.max(1, Math.floor(viewport.clientWidth / cardWidth));
    }

    function updateSlider() {
      const sample = cards[0];
      const cardWidth = sample.getBoundingClientRect().width + 14;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    leftBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateSlider();
    });

    rightBtn.addEventListener('click', () => {
      const maxIndex = Math.max(0, cards.length - visibleCount());
      index = Math.min(maxIndex, index + 1);
      updateSlider();
    });

    // handle window resize to keep index valid
    window.addEventListener('resize', () => {
      const maxIndex = Math.max(0, cards.length - visibleCount());
      index = Math.min(index, maxIndex);
      updateSlider();
    });
  }

  // Certificate modal (click card to open full view)
  const certModal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const img = card.querySelector('img');
      const caption = card.querySelector('figcaption')?.textContent || img.alt || '';
      modalImg.src = img.src;
      modalCaption.textContent = caption;
      certModal.classList.add('show');
      certModal.setAttribute('aria-hidden','false');
    });
  });

  // close modal
  const closeModal = () => {
    certModal.classList.remove('show');
    certModal.setAttribute('aria-hidden','true');
    modalImg.src = '';
  };
  modalClose.addEventListener('click', closeModal);
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeModal();
  });

  // optional: keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && certModal.classList.contains('show')) closeModal();
  });
});




