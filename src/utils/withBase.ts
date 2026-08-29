/** Prefix an internal path with the configured Astro base (e.g. /ak-blog/). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  if (!path || /^https?:\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  if (path === '/') return normalizedBase;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}
