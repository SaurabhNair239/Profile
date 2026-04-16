/* ============================================
   ui.js — Scroll Reveal & Counter Animations
   ============================================ */

(function () {

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── Animated Stat Counters ── */
  function animateCount(el, target) {
    let current = 0;
    const step  = Math.ceil(target / 50);

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  const statsStrip = document.querySelector('.hero-stats');

  if (statsStrip) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('[data-count]').forEach(el => {
            animateCount(el, parseInt(el.dataset.count, 10));
          });
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(statsStrip);
  }

})();
