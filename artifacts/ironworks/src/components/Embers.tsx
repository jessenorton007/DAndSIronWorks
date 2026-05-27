import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  life: number;
  maxLife: number;
  opacity: number;
}

export function Embers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * -1.5 - 0.5,
        speedX: Math.random() * 2 - 1,
        life: 0,
        maxLife: Math.random() * 200 + 100,
        opacity: Math.random() * 0.5 + 0.3
      };
    };

    for (let i = 0; i < 90; i++) {
      particles.push({
        ...createParticle(),
        y: Math.random() * canvas.height
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.speedX + Math.sin(p.life * 0.05) * 0.5;
        p.y += p.speedY;
        p.life++;

        if (p.y < 0 || p.life >= p.maxLife) {
          particles[index] = createParticle();
        }

        const fade = Math.sin((p.life / p.maxLife) * Math.PI);
        const currentOpacity = p.opacity * fade;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(255, 140, 26, ${currentOpacity})`);
        gradient.addColorStop(1, `rgba(255, 77, 0, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
      style={{ opacity: 0.85 }}
    />
  );
}
