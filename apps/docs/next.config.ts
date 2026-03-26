import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@m3000/market"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
