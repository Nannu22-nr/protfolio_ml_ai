/** Tiny 3D helpers used by the canvas visuals (no external 3D library needed). */
export interface V3 {
  x: number;
  y: number;
  z: number;
}

export interface Projected {
  x: number;
  y: number;
  /** Perspective scale: > 1 is closer to the camera, < 1 is farther away. */
  s: number;
  /** Rotated depth (smaller = closer). */
  z: number;
}

export function rotateY(v: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
}

export function rotateX(v: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
}

export function rotateZ(v: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z };
}

/** Rotate around Y, then X, then project with a simple pinhole camera. */
export function project(v: V3, yaw: number, pitch: number, cx: number, cy: number, scale: number, fov = 3.2): Projected {
  const r = rotateX(rotateY(v, yaw), pitch);
  const s = fov / (fov + r.z);
  return { x: cx + r.x * scale * s, y: cy + r.y * scale * s, s, z: r.z };
}

export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
