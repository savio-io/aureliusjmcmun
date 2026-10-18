export const PORTRAIT_COLOR_DURATION_MS = 2000;

export function scrollProgress(scrollY: number, scrollHeight: number, viewportHeight: number) {
  const distance = scrollHeight - viewportHeight;
  return distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
}
