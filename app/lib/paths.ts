// GitHub Pages serves this project as a subpath (e.g. /gufa-portfolio/), set
// via GH_PAGES_BASE_PATH at build time (see next.config.ts). Plain <img> tags
// don't get this prefix automatically the way next/image does, so any path
// pointing at a /public asset must be run through this helper.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
