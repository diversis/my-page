import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E0F4F5",
          100: "#D1EEF0",
          200: "#B2E3E6",
          300: "#93D8DC",
          400: "#74CDD2",
          500: "#56C2C8",
          600: "#3CB3B9",
          700: "#32959A",
          800: "#23686C",
          900: "#143C3E",
        },
        accent: {
          50: "#FCF3D9",
          100: "#F9E8B4",
          200: "#F6DC8E",
          300: "#F3D068",
          400: "#EEBE2F",
          500: "#E2AE12",
          600: "#BD910F",
          700: "#96740D",
          800: "#71570A",
          900: "#4B3A07",
        },
        secondary: {
          50: "#EAD9FC",
          100: "#D5B4F9",
          200: "#C08EF6",
          300: "#AB68F3",
          400: "#9642F0",
          500: "#811DED",
          600: "#630FBD",
          700: "#4F0C97",
          800: "#3B0971",
          900: "#28064B",
        },
        tertiary: {
          50: "#DFEAF6",
          100: "#CFE0F2",
          200: "#AFCBE9",
          300: "#8FB6E0",
          400: "#6FA1D8",
          500: "#4F8DCF",
          600: "#3578C0",
          700: "#275A90",
          800: "#1F4670",
          900: "#163250",
        },
        error: {
          50: "#F9DCE0",
          100: "#F6CBD0",
          200: "#F0A8B1",
          300: "#EA8591",
          400: "#E46271",
          500: "#DE3F52",
          600: "#D12338",
          700: "#9E1E2E",
          800: "#6C1825",
          900: "#59121C",
        },
        surface: {
          50: "#E9ECEC",
          100: "#D3D9D9",
          200: "#BEC6C6",
          300: "#A8B3B3",
          400: "#92A0A0",
          500: "#7C8D8D",
          600: "#687878",
          700: "#4C5757",
          800: "#2F3737",
          900: "#1C2121",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',

        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'cursor-pulse': "cursor-pulse 2s cubic-bezier(0.650, -0.600, 0.585, 1.540) 5s"
      },
      keyframes: {
        'cursor-pulse': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(40)', opacity: '1' },
          '100%': { transform: 'scale(100)', opacity: '0.5' }
        }
      }
    },
  },
  plugins: [],
}
export default config
