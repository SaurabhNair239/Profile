/* ============================================
   cursor.js — Custom Neon Cursor
   ============================================ */

(function () {
  const cur  = document.getElementById('cur');
  const curT = document.getElementById('curT');

  /* ── Track mouse position ── */
  document.addEventListener('mousemove', e => {
    cur.style.left  = e.clientX + 'px';
    cur.style.top   = e.clientY + 'px';

    // Slight trail delay on the ring
    setTimeout(() => {
      curT.style.left = e.clientX + 'px';
      curT.style.top  = e.clientY + 'px';
    }, 80);
  });

  /* ── Expand on interactive elements ── */
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width   = '18px';
      cur.style.height  = '18px';
      curT.style.width  = '44px';
      curT.style.height = '44px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width   = '8px';
      cur.style.height  = '8px';
      curT.style.width  = '28px';
      curT.style.height = '28px';
    });
  });
})();
