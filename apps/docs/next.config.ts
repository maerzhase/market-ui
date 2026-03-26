import { createMDX } from "fumadocs-mdx/next";
import { readFileSync } from "fs";
import type { NextConfig } from "next";
import { join } from "path";

const uiPkg = JSON.parse(
  readFileSync(join(__dirname, "../../packages/ui/package.json"), "utf-8"),
);

const nextConfig: NextConfig = {
  transpilePackages: ["@m3000/market"],
  env: {
    NEXT_PUBLIC_PACKAGE_VERSION: uiPkg.version,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
