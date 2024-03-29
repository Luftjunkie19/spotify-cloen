import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
        screens: {
      sm: "0px",
      md: "481px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl":"1560px",
      "4xl":"1920px"
    },
    extend: {
      colors: {
        spotifyGreen: '#1db954',
        spotifyOpacityGreen: 'rgba(29,185,84, 0.75)',
        spotifyDarkGray: '#212121',
        spotifyOpacityDarkGray:'rgba(33,33,33, 0.6)',
        spotifyBlack: '#121212',
        spotifyMediumGray: '#535353',
        spotifyLightGray:'#b3b3b3',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
