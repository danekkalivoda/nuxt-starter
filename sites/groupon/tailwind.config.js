/** @type {import('tailwindcss').Config} */
import { sharedConfig } from "../default/shared.tailwind.config";
export const config = {
    content: [
      ...sharedConfig.content,
      "./components/**/*.{js,vue,ts}",
      "./sites/default/**/*.{js,vue,ts}",
      "./sites/groupon/**/*.{js,vue,ts}",
    ],
    theme: {
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
          brand: {
              50: "#F1FDE1", //
              100: "#E5FCE7",
              200: "#75FF30",
              300: "#4FE81C",
              400: "#34D01A", //
              500: "#00A60E",
              600: "#008A22",
              700: "#006E2E",
              800: "#005825",
              900: "#003C1A", //
          },
        },
        fontFamily: {
          sans: [
              '"Nunito sans"',
              "ui-sans-serif",
              "system-ui",
              "-apple-system",
              "BlinkMacSystemFont",
              '"Segoe UI"',
              "Roboto",
              '"Helvetica Neue"',
              "Arial",
              '"Noto Sans"',
              "sans-serif",
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
              '"Noto Color Emoji"',
          ],
        },
      },
    },
    variants: sharedConfig.variants,
    safelist: sharedConfig.safelist,
    plugins: sharedConfig.plugins
};
export default config
