/* ============================================
   neural.js — Animated Neural Network Canvas
   ============================================ */

(function () {
  const canvas = document.getElementById('neural-canvas');
  const ctx    = canvas.getContext('2d');

  const NODE_COUNT   = 90;
  const CONNECT_DIST = 170;

  let W, H, nodes = [];
  const mouse = { x: -999, y: -999 };

  /* ── Resize ── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── Node constructor ── */
  function Node() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.vx    = (Math.random() - .5) * .35;
    this.vy    = (Math.random() - .5) * .35;
    this.r     = Math.random() * 2 + 1;
    this.pulse = Math.random() * Math.PI * 2;
  }

  /* ── Init ── */
  function init() {
    resize();
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());
  }

  /* ── Draw loop ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d < CONNECT_DIST) {
          const alpha = (1 - d / CONNECT_DIST) * 0.4;
          const mx    = (nodes[i].x + nodes[j].x) / 2;
          const my    = (nodes[i].y + nodes[j].y) / 2;
          const md    = Math.sqrt((mx - mouse.x) ** 2 + (my - mouse.y) ** 2);
          const boost = md < 200 ? 0.6 * (1 - md / 200) : 0;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${alpha + boost})`;
          ctx.lineWidth   = .6 + boost;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach((n, i) => {
      n.pulse += .03;
      const glowR = n.r + Math.sin(n.pulse) * .5;
      const md    = Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2);
      const near  = md < 120;
      const isPurple = i % 15 === 0;

      // Radial glow when near mouse
      if (near && !isPurple) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR * 8);
        grad.addColorStop(0, 'rgba(0,229,255,0.9)');
        grad.addColorStop(1, 'rgba(0,229,255,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR * 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle   = isPurple ? 'rgba(168,85,247,0.8)' : (near ? 'rgba(0,229,255,1)' : 'rgba(0,229,255,0.7)');
      ctx.shadowBlur  = near ? 15 : 8;
      ctx.shadowColor = isPurple ? 'rgba(168,85,247,.6)' : 'rgba(0,229,255,0.8)';
      ctx.fill();
      ctx.shadowBlur  = 0;

      // Move
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  /* ── Events ── */
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  /* ── Boot ── */
  init();
  draw();
})();
