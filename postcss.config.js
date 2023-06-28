module.exports = {
    plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: { config: "assets/css/tailwind.config.js" },
        autoprefixer: {},
    },
};
