/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import { sharedConfig } from "./shared.tailwind.config";
export const config = {
    content: [
      ...sharedConfig.content,
      "./components/**/*.{js,vue,ts}",
      "./sites/default/**/*.{js,vue,ts}",
    ],
    theme: {
      screens: sharedConfig.theme.screens,
      extend: {
        ...sharedConfig.theme.extend,
        colors: {
          gray: colors.gray,
          brand: {
            50: "#e2f7f9",
            100: "#cef1f5",
            200: "#a8e7ed",
            300: "#82dce6",
            400: "#5cd2de",
            500: "#36c7d6",
            600: "#24a3b0",
            700: "#1a7881",
            800: "#114d53",
            900: "#072224",
            950: "#060818",
          },
        },
        fontFamily: {
          sans: [
            '"Inter"',
            "sans-serif",
          ],
          brand: [
            '"Inter"',
            "sans-serif",
          ],
          'display':  [
            '"Inter"',
            "sans-serif",
          ]
        },
      },
    },
    variants: sharedConfig.variants,
    safelist: sharedConfig.safelist,
    plugins: sharedConfig.plugins
};
export default config
