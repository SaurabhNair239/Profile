/* ============================================
   typing.js — Typewriter Role Animation
   ============================================ */

(function () {
  const roles = [
    'AI Developer',
    'Data Scientist',
    'ML Engineer',
    'Data Engineer',
    'AI Practitioner',
  ];

  const el  = document.getElementById('typeText');
  let ri    = 0;   // role index
  let ci    = 0;   // char index
  let deleting = false;

  function tick() {
    const current = roles[ri];

    if (!deleting) {
      // Type forward
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 1800); // pause before deleting
        return;
      }
    } else {
      // Delete backward
      el.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }

    setTimeout(tick, deleting ? 55 : 90);
  }

  tick();
})();
