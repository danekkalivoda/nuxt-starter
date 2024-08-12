import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import svgToDataUri from "mini-svg-data-uri";
export const sharedConfig = {
  content: [
    "./recruitis-shared/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      screens: {
        xl: "1280px",
        '2xl': "1536px",
        '3xl': "1536px",
        '4xl': "1536px",
      },
    },
    screens: {
      xs: "414px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      "can-hover": { raw: "(hover: hover)" },
      touch: { raw: "(hover: none)" },
    },
    extend: {
      spacing: {
        0: "0px",
        px: "1px",
        0.5: "2px",
        1: "4px",
        1.5: "6px",
        2: "8px",
        2.5: "10px",
        3: "12px",
        3.5: "14px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        44: "176px",
        48: "192px",
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
        72: "288px",
        80: "320px",
        96: "384px",
        128: "512px",
        192: "768px",
        200: "800px",
      },
      ringWidth: () => ({
        3: "3px",
      }),
      minHeight: (theme) => ({
        ...theme("spacing"),
        ...theme("width"),
        screen: "100vh",
      }),
      minWidth: (theme) => ({
        ...theme("spacing"),
        ...theme("width"),
      }),
      maxWidth: (theme) => ({
        ...theme("spacing"),
        ...theme("width"),
      }),
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
      },
      keyframes: {
        skeleton: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
          },
        },
      },
      animation: {
        skeleton: "skeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: (theme) => ({
        "multiselect-caret": `url("${svgToDataUri(
          /* `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>` */
          `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'><path fill='${theme(
            "colors.gray.500",
          )}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/></svg>`,
        )}")`,
        "multiselect-spinner": `url("${svgToDataUri(
          `<svg viewBox='0 0 512 512' fill='${theme(
            "colors.brand.500",
          )}' xmlns='http://www.w3.org/2000/svg'><path d='M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'></path></svg>`,
        )}")`,
        "multiselect-remove": `url("${svgToDataUri(
          `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='currentColor'><path d='M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z'></path><path d='M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z'></path></svg>`,
        )}")`,
      }),
      containers: {
        "4xs": "4rem",
        "3xs": "12rem",
        "2xs": "16rem",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray[800]"),
            "--tw-prose-headings": theme("colors.black"),
            color: theme("colors.gray[800]"),
            /* fontSize: "0.875rem", */ // 14px
          },
        },
        /*         xs: {
      css: {
        fontSize: "0.625rem", // 10px
      },
    },
    sm: {
      css: {
        fontSize: "0.75rem", // 12px
      },
    }, */
      }),
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  safelist: [
    {
      pattern: /w-(px|16|24|28|32|36|40|48|52|56|64)/,
    },
    {
      pattern: /min-w-(16|24|28|32|36|40|48|52|56|64)/,
    },
    {
      pattern: /max-w-(px|16|24|28|32|36|40|48|52|56|64)/,
    },
    "-mx-8",
  ],
  plugins: [forms({ strategy: "class" }), typography, containerQueries],
};
