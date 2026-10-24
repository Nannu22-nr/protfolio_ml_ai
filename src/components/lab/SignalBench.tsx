"use client";

import { useMemo, useState } from "react";

const N = 240;
const W = 600;
const H = 180;

/** Deterministic pseudo-random generator so the synthetic signal is stable between renders. */
function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function movingAverage(x: number[], k: number) {
  const half = Math.floor(k / 2);
  return x.map((_, i) => {
    let sum = 0;
    let count = 0;
    for (let j = i - half; j <= i + half; j++) {
      const v = x[j];
      if (v !== undefined) {
        sum += v;
        count++;
      }
    }
    return sum / count;
  });
}

function rms(a: number[], b: number[]) {
  const total = a.reduce((acc, v, i) => acc + (v - (b[i] ?? 0)) ** 2, 0);
  return Math.sqrt(total / a.length);
}

function toPath(values: number[]) {
  return values
    .map((v, i) => {
      const x = (i / (N - 1)) * W;
      const y = H / 2 - v * 38;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * Real computation on SYNTHETIC data: a clean sine mixture plus seeded noise, smoothed with a moving average.
 * Demonstrates the filtering trade-off used in biosignal preprocessing. It is not model inference.
 */
export function SignalBench() {
  const [windowSize, setWindowSize] = useState(7);
  const [noise, setNoise] = useState(0.6);

  const { clean, noisy } = useMemo(() => {
    const rand = lcg(42);
    const c: number[] = [];
    const n: number[] = [];
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const v = Math.sin(2 * Math.PI * 3 * t) + 0.5 * Math.sin(2 * Math.PI * 7 * t);
      c.push(v);
      n.push(v + (rand() - 0.5) * 2 * noise * 1.6);
    }
    return { clean: c, noisy: n };
  }, [noise]);

  const smoothed = useMemo(() => movingAverage(noisy, windowSize), [noisy, windowSize]);
  const rawErr = rms(noisy, clean);
  const smoothErr = rms(smoothed, clean);

  return (
    <div className="border border-line bg-navy-800 p-4 sm:p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm text-slate-300">
          <span className="flex justify-between">
            <span>Smoothing window</span>
            <span className="font-mono text-signal">{windowSize} samples</span>
          </span>
          <input
            type="range"
            min={1}
            max={41}
            step={2}
            value={windowSize}
            onChange={(e) => setWindowSize(Number(e.target.value))}
            className="mt-3 h-11 w-full accent-teal-400"
          />
        </label>
        <label className="block text-sm text-slate-300">
          <span className="flex justify-between">
            <span>Noise level</span>
            <span className="font-mono text-signal">{noise.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={0}
            max={1.5}
            step={0.05}
            value={noise}
            onChange={(e) => setNoise(Number(e.target.value))}
            className="mt-3 h-11 w-full accent-teal-400"
          />
        </label>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 block w-full bg-ink"
        role="img"
        aria-label={`Synthetic signal: noisy trace, moving-average output and the clean reference. RMS error ${rawErr.toFixed(2)} before and ${smoothErr.toFixed(2)} after smoothing.`}
      >
        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="#1e293b" />
        <path d={toPath(noisy)} fill="none" stroke="#64748b" strokeWidth="1" strokeOpacity="0.8" />
        <path d={toPath(clean)} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
        <path d={toPath(smoothed)} fill="none" stroke="#2dd4bf" strokeWidth="1.8" />
      </svg>

      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] text-slate-400">
        <li><span className="text-slate-500">━</span> noisy input</li>
        <li><span className="text-slate-200">┅</span> clean reference</li>
        <li><span className="text-signal">━</span> smoothed output</li>
      </ul>

      <dl className="mt-5 grid grid-cols-2 gap-px border border-line bg-line text-sm">
        <div className="bg-ink p-3">
          <dt className="text-slate-500">RMS error, raw</dt>
          <dd className="mt-1 font-mono text-white">{rawErr.toFixed(3)}</dd>
        </div>
        <div className="bg-ink p-3">
          <dt className="text-slate-500">RMS error, smoothed</dt>
          <dd className="mt-1 font-mono text-signal">{smoothErr.toFixed(3)}</dd>
        </div>
      </dl>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-label text-slate-500">
        Synthetic data · moving-average filter · not model inference. Try a very large window: it removes noise but also distorts the real signal.
      </p>
    </div>
  );
}
