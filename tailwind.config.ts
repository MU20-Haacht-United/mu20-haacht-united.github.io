import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{html,js,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
    './docusaurus.config.ts',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d0181e',
          dark: '#bb151a',
          light: '#dd2e33',
        },
      },
    },
  },
  corePlugins: {
    // Disable preflight to avoid conflicts with Infima/Docusaurus base styles
    preflight: false,
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
