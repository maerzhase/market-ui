/** @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/index.css",
  tailwindFunctions: ["cn", "cva", "clsx"],
};
