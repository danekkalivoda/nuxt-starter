/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import { sharedConfig } from "../default/shared.tailwind.config";
export const config = {
  content: [
    ...sharedConfig.content,
    "./components/**/*.{js,vue,ts}",
    "./sites/default/**/*.{js,vue,ts}",
    "./sites/groupon/**/*.{js,vue,ts}",
  ],
  theme: {
    ...sharedConfig.theme,
    screens: sharedConfig.theme.screens,
    extend: {
      ...sharedConfig.theme.extend,
      colors: {
        gray: {
          50: "#FAF9FC", //
          100: "#F8F7FA",
          200: "#E4E4E6",
          300: "#D0D0D2", //
          400: "#BCBBBF",
          500: "#989598", //
          600: "#747073", //
          700: "#615C66",
          800: "#453D48", //
          900: "#230F33",
        },
        brand: colors.red,
      },
    },
  },
  variants: sharedConfig.variants,
  safelist: sharedConfig.safelist,
  plugins: sharedConfig.plugins,
};
export default config;
