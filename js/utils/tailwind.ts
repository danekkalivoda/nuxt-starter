import resolveConfig from "tailwindcss/resolveConfig.js";
import tailwindConfig from "tailwind-config";
export const twConfig = resolveConfig(tailwindConfig);

export const grayLine =
    "text-gray-400 before:rounded-full before:w-1 before:h-1 before:bg-gray-200 before:block inline-flex items-center gap-2 first:before:hidden";
