export type Theme = 'dark' | 'light'

export const THEME_KEY = 'theme'

export function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light'
}

// Runs inline in <head> before the first paint so a stored light theme never flashes dark.
export function themeInitScript(): string {
  return `(function(){var t='dark';try{var s=localStorage.getItem('${THEME_KEY}');if(s==='light'||s==='dark'){t=s}}catch(e){}document.documentElement.setAttribute('data-theme',t)})();`
}
