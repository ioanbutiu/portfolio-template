'use client'

// This component injects a script that runs before React hydration
// to prevent dark mode flickering when the page loads
export function ThemeScript() {
  const themeScript = `
    (function () {
      function getThemePreference() {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
          return localStorage.getItem('theme');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      const theme = getThemePreference();
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `
  
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}