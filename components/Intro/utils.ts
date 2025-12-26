// Helpers to compute per-character colors for a 3-stop gradient (left -> mid -> right)
export function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
export function rgbToHex(r: number, g: number, b: number) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
export function lerp(a: number, b: number, t: number) { return Math.round(a + (b - a) * t); }

export function threeStopGradientColors(n: number, left = '#31081f', mid = '#DB0000', right = '#31081f') {
  if (n <= 1) return [mid];
  const leftRGB = hexToRgb(left);
  const midRGB = hexToRgb(mid);
  const rightRGB = hexToRgb(right);
  const colors: string[] = [];
  for (let i = 0; i < n; i++) {
    const pos = i / (n - 1);
    if (pos <= 0.5) {
      const t = pos / 0.5;
      const r = lerp(leftRGB.r, midRGB.r, t);
      const g = lerp(leftRGB.g, midRGB.g, t);
      const b = lerp(leftRGB.b, midRGB.b, t);
      colors.push(rgbToHex(r, g, b));
    } else {
      const t = (pos - 0.5) / 0.5;
      const r = lerp(midRGB.r, rightRGB.r, t);
      const g = lerp(midRGB.g, rightRGB.g, t);
      const b = lerp(midRGB.b, rightRGB.b, t);
      colors.push(rgbToHex(r, g, b));
    }
  }
  return colors;
}
