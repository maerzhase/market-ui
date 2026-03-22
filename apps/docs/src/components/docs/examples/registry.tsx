import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ComponentType } from "react";
import { AuctionBidFormExample } from "./auction/bid-form.example";
import { AuctionLayoutExample } from "./auction/layout.example";
import { AuctionRankingsExample } from "./auction/rankings.example";
import { AuctionSuggestedBidsExample } from "./auction/suggested-bids.example";
import { AuctionUsageExample } from "./auction/usage.example";
import { AuctionYourBidsExample } from "./auction/your-bids.example";
import { CountdownCustomRenderExample } from "./countdown/custom-render.example";
import { CountdownExpiredExample } from "./countdown/expired.example";
import { CountdownLiveToClosedExample } from "./countdown/live-to-closed.example";
import { CountdownProgressExample } from "./countdown/progress.example";
import { CountdownSemanticExample } from "./countdown/semantic.example";
import { CountdownUsageExample } from "./countdown/usage.example";
import { FeedbackPositionsExample } from "./feedback/positions.example";
import { FeedbackUsageExample } from "./feedback/usage.example";
import { PriceAbbreviatedExample } from "./price/abbreviated.example";
import { PriceBasicExample } from "./price/basic.example";
import { PriceCryptoExample } from "./price/crypto.example";
import { PriceCustomRenderingExample } from "./price/custom-rendering.example";
import { PriceLocaleExample } from "./price/locale.example";
import { RankingBasicExample } from "./ranked-list/basic.example";
import { RankingEmptyExample } from "./ranked-list/empty.example";
import { RankingUsageExample } from "./ranked-list/usage.example";
import { RankingCustomGroupExample } from "./ranked-list/custom-group.example";
import { RankingDynamicSlotExample } from "./ranked-list/dynamic-slot.example";
import { RankingStaticSlotExample } from "./ranked-list/static-slot.example";
import { ReceiptAdjustmentsExample } from "./receipt/adjustments.example";
import { ReceiptCustomPriceRenderingExample } from "./receipt/custom-price-rendering.example";
import { ReceiptFullExample } from "./receipt/full.example";
import { ReceiptManualValuesExample } from "./receipt/manual-values.example";
import { ReceiptPrecisionOverridesExample } from "./receipt/precision-overrides.example";
import { ReceiptUsageExample } from "./receipt/usage.example";

export interface ExampleDefinition {
  Component: ComponentType;
  code: string;
  className?: string;
  previewClassName?: string;
  maxWidth?: string | number;
  minHeight?: string | number;
  align?: "center" | "start" | "stretch";
  allowPointerEvents?: boolean;
}

export type ExampleRegistry = Record<string, ExampleDefinition>;

const registryDir = path.dirname(fileURLToPath(import.meta.url));

function normalizeExampleCode(raw: string) {
  return raw.replace(/^["']use client["'];\n\n/, "").trim();
}

function readCode(relativePath: string) {
  return normalizeExampleCode(
    readFileSync(path.join(registryDir, relativePath), "utf8")
  );
}

export const exampleRegistry: ExampleRegistry = {
  "price/basic": {
    Component: PriceBasicExample,
    code: readCode("./price/basic.example.tsx"),
  },
  "price/custom-rendering": {
    Component: PriceCustomRenderingExample,
    code: readCode("./price/custom-rendering.example.tsx"),
  },
  "price/abbreviated": {
    Component: PriceAbbreviatedExample,
    code: readCode("./price/abbreviated.example.tsx"),
  },
  "price/crypto": {
    Component: PriceCryptoExample,
    code: readCode("./price/crypto.example.tsx"),
  },
  "price/locale": {
    Component: PriceLocaleExample,
    code: readCode("./price/locale.example.tsx"),
  },
  "ranking/usage": {
    Component: RankingUsageExample,
    code: readCode("./ranked-list/usage.example.tsx"),
    maxWidth: 640,
  },
  "ranking/basic": {
    Component: RankingBasicExample,
    code: readCode("./ranked-list/basic.example.tsx"),
    maxWidth: 640,
  },
  "ranking/empty": {
    Component: RankingEmptyExample,
    code: readCode("./ranked-list/empty.example.tsx"),
    maxWidth: 640,
  },
  "ranking/custom-group": {
    Component: RankingCustomGroupExample,
    code: readCode("./ranked-list/custom-group.example.tsx"),
    maxWidth: 640,
  },
  "ranking/static-slot": {
    Component: RankingStaticSlotExample,
    code: readCode("./ranked-list/static-slot.example.tsx"),
    maxWidth: 640,
  },
  "ranking/dynamic-slot": {
    Component: RankingDynamicSlotExample,
    code: readCode("./ranked-list/dynamic-slot.example.tsx"),
    maxWidth: 640,
  },
  "countdown/usage": {
    Component: CountdownUsageExample,
    code: readCode("./countdown/usage.example.tsx"),
  },
  "countdown/custom-render": {
    Component: CountdownCustomRenderExample,
    code: readCode("./countdown/custom-render.example.tsx"),
  },
  "countdown/live-to-closed": {
    Component: CountdownLiveToClosedExample,
    code: readCode("./countdown/live-to-closed.example.tsx"),
  },
  "countdown/progress": {
    Component: CountdownProgressExample,
    code: readCode("./countdown/progress.example.tsx"),
  },
  "countdown/semantic": {
    Component: CountdownSemanticExample,
    code: readCode("./countdown/semantic.example.tsx"),
  },
  "countdown/expired": {
    Component: CountdownExpiredExample,
    code: readCode("./countdown/expired.example.tsx"),
  },
  "feedback/usage": {
    Component: FeedbackUsageExample,
    code: readCode("./feedback/usage.example.tsx"),
    minHeight: 160,
    allowPointerEvents: true,
  },
  "feedback/positions": {
    Component: FeedbackPositionsExample,
    code: readCode("./feedback/positions.example.tsx"),
    maxWidth: 560,
    minHeight: 220,
    previewClassName: "pt-12 pb-8",
  },
  "receipt/usage": {
    Component: ReceiptUsageExample,
    code: readCode("./receipt/usage.example.tsx"),
    maxWidth: 420,
  },
  "receipt/adjustments": {
    Component: ReceiptAdjustmentsExample,
    code: readCode("./receipt/adjustments.example.tsx"),
    maxWidth: 420,
  },
  "receipt/manual-values": {
    Component: ReceiptManualValuesExample,
    code: readCode("./receipt/manual-values.example.tsx"),
    maxWidth: 420,
  },
  "receipt/custom-price-rendering": {
    Component: ReceiptCustomPriceRenderingExample,
    code: readCode("./receipt/custom-price-rendering.example.tsx"),
    maxWidth: 420,
  },
  "receipt/precision-overrides": {
    Component: ReceiptPrecisionOverridesExample,
    code: readCode("./receipt/precision-overrides.example.tsx"),
    maxWidth: 420,
  },
  "receipt/full": {
    Component: ReceiptFullExample,
    code: readCode("./receipt/full.example.tsx"),
    maxWidth: 420,
  },
  "auction/usage": {
    Component: AuctionUsageExample,
    code: readCode("./auction/usage.example.tsx"),
    maxWidth: "100%",
    minHeight: 560,
    align: "stretch",
    allowPointerEvents: true,
  },
  "auction/layout": {
    Component: AuctionLayoutExample,
    code: readCode("./auction/layout.example.tsx"),
    maxWidth: "100%",
    minHeight: 420,
    align: "stretch",
  },
  "auction/rankings": {
    Component: AuctionRankingsExample,
    code: readCode("./auction/rankings.example.tsx"),
    maxWidth: "100%",
    minHeight: 420,
    align: "stretch",
    allowPointerEvents: true,
  },
  "auction/bid-form": {
    Component: AuctionBidFormExample,
    code: readCode("./auction/bid-form.example.tsx"),
    maxWidth: 520,
    minHeight: 180,
    align: "start",
    allowPointerEvents: true,
  },
  "auction/your-bids": {
    Component: AuctionYourBidsExample,
    code: readCode("./auction/your-bids.example.tsx"),
    maxWidth: 520,
    minHeight: 320,
    align: "start",
    allowPointerEvents: true,
  },
  "auction/suggested-bids": {
    Component: AuctionSuggestedBidsExample,
    code: readCode("./auction/suggested-bids.example.tsx"),
    maxWidth: 520,
    minHeight: 160,
    align: "start",
    allowPointerEvents: true,
  },
};

export function getExampleDefinition(name: string) {
  return exampleRegistry[name];
}
