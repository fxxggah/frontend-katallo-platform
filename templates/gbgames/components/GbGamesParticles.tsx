"use client";

import { useEffect, useRef } from "react";

export function GbGamesParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 120;

    type Star = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      alphaDir: number;
      color: string;
    };

    const COLORS = [
      "180,120,255",
      "120,60,220",
      "200,160,255",
      "245,197,66",
      "100,40,200",
    ];

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += s.alphaDir * 0.004;
        if (s.alpha >= 1) s.alphaDir = -1;
        if (s.alpha <= 0.05) s.alphaDir = 1;

        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        // Glow outer
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        grd.addColorStop(0, `rgba(${s.color},${s.alpha * 0.6})`);
        grd.addColorStop(1, `rgba(${s.color},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.55 }}
    />
  );
}