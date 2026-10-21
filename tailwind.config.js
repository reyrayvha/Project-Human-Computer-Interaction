/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3F7A1F",
        "primary-hover": "#2F6016",
        "primary-tint": "#E6F0DC",
        leaf: "#8CC43F",
        "logo-green": "#588A2A",
        "logo-slate": "#263235",
        ink: "#263235",
        "ink-muted": "#55626A",
        bg: "#F3F5F2",
        card: "#FFFFFF",
        border: "#DCE2DA",
        success: "#1F7A4D",
        "success-tint": "#E1F2E9",
        warning: "#A85F00",
        "warning-tint": "#FDF0DA",
        danger: "#B3261E",
        "danger-tint": "#FBE4E2",
        info: "#1F5F8B",
        "info-tint": "#E0EEF7",
        // aliases matching stitch class names
        "surface-card": "#FFFFFF",
        "surface-bg": "#F3F5F2",
        "primary-container": "#3F7A1F",
        "on-primary": "#FFFFFF",
        "on-error": "#FFFFFF",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Public Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Public Sans"', 'sans-serif'],
        stat: ['"Plus Jakarta Sans"', '"Public Sans"', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', '"Public Sans"', 'monospace'],
      },
      borderRadius: {
        control: '6px',
        card: '10px',
        dialog: '14px',
        chip: '999px',
      },
      spacing: {
        'unit': '8px',
        'card-padding': '20px',
        'page-gutter': '24px',
        'gutter': '24px',
        'space-xs': '4px',
        'space-sm': '8px',
        'space-md': '16px',
        'space-lg': '24px',
        'space-card': '20px',
      }
    },
  },
  plugins: [],
}
