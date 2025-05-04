/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Светлая тема
        'light-bg': '#FFFFFF',
        'light-text': '#1A1A1A',
        'light-accent': '#6366F1',
        'light-muted': '#E5E7EB',
        'light-card': '#F9FAFB',
        
        // Темная тема
        'dark-bg': '#111827',
        'dark-text': '#F9FAFB',
        'dark-accent': '#818CF8',
        'dark-muted': '#374151',
        'dark-card': '#1F2937',
        
        // Ночной режим
        'night-bg': '#0F172A',
        'night-text': '#E2E8F0',
        'night-accent': '#60A5FA',
        'night-muted': '#1E293B',
        'night-card': '#1E293B',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
} 