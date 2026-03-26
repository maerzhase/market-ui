/**
 * Build script for copying components from packages/ui to the registry folder.
 * Transforms imports to use local paths instead of @m3000/market paths.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const ROOT = join(import.meta.dirname, "..");
const UI_SRC = join(ROOT, "..", "..", "packages", "ui", "src");
const REGISTRY = join(ROOT, "registry", "new-york");

type ComponentMapping = {
  source: string;
  dest: string;
  files: string[];
};

const COMPONENT_MAPPINGS: ComponentMapping[] = [
  // Lib utilities
  {
    source: "lib",
    dest: "lib",
    files: ["cn.ts"],
  },

  // Primitives
  {
    source: "components/primitives",
    dest: "price",
    files: ["Price.tsx"],
  },
  {
    source: "components/primitives/countdown",
    dest: "countdown",
    files: ["Countdown.tsx"],
  },
  {
    source: "hooks",
    dest: "countdown",
    files: ["useCountdown.ts"],
  },
  {
    source: "components/primitives/ranked-list",
    dest: "ranking",
    files: ["Ranking.tsx"],
  },
  {
    source: "components/primitives",
    dest: "receipt",
    files: ["Receipt.tsx"],
  },
  {
    source: "components/primitives",
    dest: "button",
    files: ["Button.tsx"],
  },
  {
    source: "components/primitives",
    dest: "text",
    files: ["Text.tsx"],
  },
  {
    source: "components/primitives",
    dest: "separator",
    files: ["Separator.tsx"],
  },
  {
    source: "components/primitives",
    dest: "skeleton",
    files: ["Skeleton.tsx"],
  },
  {
    source: "components/primitives",
    dest: "tag",
    files: ["Tag.tsx"],
  },
  {
    source: "components/primitives",
    dest: "tabs",
    files: ["Tabs.tsx"],
  },
  {
    source: "components/primitives",
    dest: "feedback",
    files: ["Feedback.tsx"],
  },
  {
    source: "components/primitives",
    dest: "scale",
    files: ["Scale.tsx"],
  },
  {
    source: "components/primitives",
    dest: "stepped-input",
    files: ["SteppedInput.tsx"],
  },
  {
    source: "components/primitives/framed-image",
    dest: "framed-image",
    files: ["FramedImage.tsx"],
  },
  {
    source: "components/primitives",
    dest: "framed-image",
    files: ["MorphDialog.tsx"],
  },

  // Blocks
  {
    source: "components/blocks/auction",
    dest: "auction",
    files: [
      "Auction.tsx",
      "AuctionContext.tsx",
      "AuctionLayout.tsx",
      "AuctionArtwork.tsx",
      "AuctionInfo.tsx",
      "AuctionRankings.tsx",
      "AuctionBidForm.tsx",
      "AuctionBidInput.tsx",
      "AuctionStatusTag.tsx",
      "AuctionYourBids.tsx",
      "AuctionYourBidCard.tsx",
      "AuctionSuggestedBids.tsx",
    ],
  },
];

/**
 * Transform imports in a file:
 * - @/lib -> @/lib (keep as alias, user needs to configure)
 * - @/components/primitives/X -> relative or @/components/ui/X
 */
function transformImports(content: string, destDir: string): string {
  let transformed = content;

  // Transform @/lib imports to relative
  transformed = transformed.replace(/from ["']@\/lib["']/g, 'from "@/lib/cn"');

  // Transform @/components/primitives imports
  transformed = transformed.replace(
    /from ["']@\/components\/primitives["']/g,
    'from "@/components/ui"',
  );

  // Transform specific component imports
  transformed = transformed.replace(
    /from ["']@\/components\/primitives\/([^"']+)["']/g,
    'from "@/components/ui/$1"',
  );

  // Transform @/hooks imports
  transformed = transformed.replace(/from ["']@\/hooks["']/g, 'from "@/hooks"');

  transformed = transformed.replace(
    /from ["']@\/hooks\/([^"']+)["']/g,
    'from "@/hooks/$1"',
  );

  // Transform @/types imports
  transformed = transformed.replace(/from ["']@\/types["']/g, 'from "@/types"');

  return transformed;
}

/**
 * Convert PascalCase/camelCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function copyAndTransform(mapping: ComponentMapping) {
  const srcDir = join(UI_SRC, mapping.source);
  const destDir = join(REGISTRY, mapping.dest);

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  for (const file of mapping.files) {
    const srcPath = join(srcDir, file);
    const destFileName = toKebabCase(file);
    const destPath = join(destDir, destFileName);

    if (!existsSync(srcPath)) {
      console.warn(`  Warning: Source file not found: ${srcPath}`);
      continue;
    }

    const content = readFileSync(srcPath, "utf-8");
    const transformed = transformImports(content, mapping.dest);

    writeFileSync(destPath, transformed);
    console.log(`  Copied: ${file} -> ${mapping.dest}/${destFileName}`);
  }
}

console.log("Building registry...\n");

for (const mapping of COMPONENT_MAPPINGS) {
  console.log(`Processing: ${mapping.source}`);
  copyAndTransform(mapping);
}

console.log("\nRegistry build complete!");
console.log("\nRun 'pnpm dlx shadcn@latest build' to generate JSON files.");
