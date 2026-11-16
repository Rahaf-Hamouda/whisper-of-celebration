const DEFAULT_COLORS = [
  '#4b1625',
  '#611f30',
  '#7a2e3e',
  '#96404f',
  '#b45a68',
  '#cf7e88',
  '#f6e8d2',
  '#e2c293',
  '#d3a86c',
  '#b88a4b',
  '#fffdf8',
];

/**
 * قُصاصات احتفالية خفيفة مرسومة على Canvas.
 * لا تعتمد على أي مكتبة خارجية، وتُنظّف نفسها تلقائياً بعد انتهاء الرقصة.
 */
export function triggerConfetti({
  origin,
  colors = DEFAULT_COLORS,
  particleCount = 140,
  duration = 3800,
} = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '9999',
  });

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  document.body.appendChild(canvas);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = window.innerWidth;
  let height = window.innerHeight;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const originX = (origin?.x ?? 0.5) * width;
  const originY = (origin?.y ?? 0.55) * height;

  const emitters = [
    {
      x: originX,
      y: originY,
      angle: -Math.PI / 2,
      spread: 1.15,
      power: 14,
      count: Math.round(particleCount * 0.52),
    },
    {
      x: originX - width * 0.13,
      y: originY + 18,
      angle: -Math.PI / 2.2,
      spread: 0.9,
      power: 11.5,
      count: Math.round(particleCount * 0.24),
    },
    {
      x: originX + width * 0.13,
      y: originY + 18,
      angle: -Math.PI / 1.8,
      spread: 0.9,
      power: 11.5,
      count: Math.round(particleCount * 0.24),
    },
  ];

  const particles = [];

  emitters.forEach((emitter) => {
    for (let i = 0; i < emitter.count; i += 1) {
      const angle = emitter.angle + (Math.random() - 0.5) * emitter.spread;
      const velocity = emitter.power * (0.55 + Math.random() * 0.85);
      const shapeRoll = Math.random();

      particles.push({
        x: emitter.x,
        y: emitter.y,
        vx: Math.cos(angle) * velocity + (Math.random() - 0.5) * 4,
        vy: Math.sin(angle) * velocity,
        gravity: 0.26 + Math.random() * 0.15,
        drag: 0.987,
        width: 5 + Math.random() * 7,
        height: 8 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.26,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.07 + Math.random() * 0.1,
        opacity: 0.82 + Math.random() * 0.18,
        shape:
          shapeRoll > 0.74 ? 'circle' : shapeRoll > 0.32 ? 'rect' : 'ribbon',
      });
    }
  });

  const start = performance.now();
  let frameId = 0;
  let stopped = false;

  const cleanup = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    canvas.remove();
  };

  const draw = (now) => {
    if (stopped) return;
    const elapsed = now - start;
    ctx.clearRect(0, 0, width, height);
    const fade = Math.min(1, Math.max(0, (duration - elapsed) / 650));

    particles.forEach((particle) => {
      particle.vx *= particle.drag;
      particle.vy = particle.vy * particle.drag + particle.gravity;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += particle.rotationSpeed;
      particle.wobble += particle.wobbleSpeed;

      if (particle.y > height + 48) return;

      ctx.save();
      ctx.globalAlpha = particle.opacity * fade;
      ctx.translate(
        particle.x + Math.sin(particle.wobble) * 6,
        particle.y,
      );
      ctx.rotate(particle.rotation);
      ctx.fillStyle = particle.color;

      if (particle.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, particle.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (particle.shape === 'ribbon') {
        ctx.fillRect(
          -particle.width * 0.22,
          -particle.height * 0.9,
          particle.width * 0.44,
          particle.height * 1.8,
        );
      } else {
        ctx.fillRect(
          -particle.width / 2,
          -particle.height / 2,
          particle.width,
          particle.height,
        );
      }

      ctx.restore();
    });

    if (elapsed < duration) {
      frameId = requestAnimationFrame(draw);
    } else {
      cleanup();
    }
  };

  frameId = requestAnimationFrame(draw);
  window.setTimeout(cleanup, duration + 400);
}
