// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "blocks/auction.mdx": () => import("../content/docs/blocks/auction.mdx?collection=docs"), "primitives/countdown.mdx": () => import("../content/docs/primitives/countdown.mdx?collection=docs"), "primitives/price.mdx": () => import("../content/docs/primitives/price.mdx?collection=docs"), "primitives/ranking.mdx": () => import("../content/docs/primitives/ranking.mdx?collection=docs"), "primitives/receipt.mdx": () => import("../content/docs/primitives/receipt.mdx?collection=docs"), }),
};
export default browserCollections;