// @ts-nocheck
import * as __fd_glob_6 from "../content/docs/primitives/receipt.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/primitives/ranked-list.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/primitives/price.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/primitives/countdown.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/blocks/auction.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, }, {"index.mdx": __fd_glob_1, "blocks/auction.mdx": __fd_glob_2, "primitives/countdown.mdx": __fd_glob_3, "primitives/price.mdx": __fd_glob_4, "primitives/ranked-list.mdx": __fd_glob_5, "primitives/receipt.mdx": __fd_glob_6, });