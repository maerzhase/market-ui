import type { UserConfig } from "tsdown";

const isWatch = process.argv.includes("--watch");

const config: UserConfig = {
  entry: ["src/index.ts"],
  unbundle: true,
  inlineOnly: false,
  format: "esm",
  dts: true,
  clean: !isWatch,
  outDir: "dist",
  platform: "browser",
  copy: [
    { from: "src/styles/theme.css" },
    { from: "src/styles/utility.css" },
    { from: "src/styles/globals.css" },
    { from: "src/styles/theme/**/*.css", to: "dist/theme" },
  ],
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "motion",
    "motion/react",
    "@base-ui/react",
    "@base-ui/react/*",
    "@base-ui/utils",
    "@base-ui/utils/*",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "use-sync-external-store",
    "reselect",
    "tabbable",
    "@floating-ui/core",
    "@floating-ui/dom",
    "@floating-ui/react-dom",
    "@floating-ui/utils",
  ],
};

export default config;
