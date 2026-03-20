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
import { CountdownBasicExample } from "./countdown/basic.example";
import { CountdownExpiredExample } from "./countdown/expired.example";
import { CountdownSemanticExample } from "./countdown/semantic.example";
import { CountdownUsageExample } from "./countdown/usage.example";
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
import { ReceiptBasicExample } from "./receipt/basic.example";
import { ReceiptFullExample } from "./receipt/full.example";
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
	return raw
		.replace(/^["']use client["'];\n\n/, "")
		.trim();
}

function readCode(relativePath: string) {
	return normalizeExampleCode(
		readFileSync(path.join(registryDir, relativePath), "utf8"),
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
	"countdown/basic": {
		Component: CountdownBasicExample,
		code: readCode("./countdown/basic.example.tsx"),
	},
	"countdown/semantic": {
		Component: CountdownSemanticExample,
		code: readCode("./countdown/semantic.example.tsx"),
	},
	"countdown/expired": {
		Component: CountdownExpiredExample,
		code: readCode("./countdown/expired.example.tsx"),
	},
	"receipt/usage": {
		Component: ReceiptUsageExample,
		code: readCode("./receipt/usage.example.tsx"),
		maxWidth: 420,
	},
	"receipt/basic": {
		Component: ReceiptBasicExample,
		code: readCode("./receipt/basic.example.tsx"),
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
