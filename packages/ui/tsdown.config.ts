import type { UserConfig } from "tsdown";

const config: UserConfig = {
  entry: ["src/index.ts"],
  unbundle: true,
  inlineOnly: false,
  format: "esm",
  dts: true,
  clean: true,
  outDir: "dist",
  platform: "browser",
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
