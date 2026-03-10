import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        tiktok: {
          red: '#FE2C55',
          blue: '#25F4EE',
          dark: '#121212',
          card: '#1E1E1E',
          border: '#2A2A2A',
          text: '#E8E8E8',
          muted: '#8A8A8A',
        }
      }
    },
  },
  plugins: [],
}
export default config
