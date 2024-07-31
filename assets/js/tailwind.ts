import resolveConfig from "tailwindcss/resolveConfig";

let tailwindConfig = require("@sites/default/tailwind.config.js");
if (process.env.NUXT_PROJECT_NAME) {
  tailwindConfig = require(
    "@sites/" + process.env.NUXT_PROJECT_NAME + "/tailwind.config.js",
  );
}
export const fullConfig = resolveConfig(tailwindConfig);
