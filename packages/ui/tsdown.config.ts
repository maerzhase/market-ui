import type { UserConfig } from "tsdown";

const config: UserConfig = {
  entry: ["src/index.ts"],
  unbundle: true,
  format: "esm",
  dts: true,
  clean: true,
  outDir: "dist",
  platform: "browser",
  external: ["react", "react-dom", "react/jsx-runtime"],
};

export default config;
