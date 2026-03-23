import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

export const source = loader({
	baseUrl: "/docs",
	plugins: [
		{
			name: "auction-coming-soon-badge",
			transformPageTree: {
				file(node, filePath) {
					if (filePath !== "blocks/auction.mdx") {
						return node;
					}

					node.name = (
						jsxs(Fragment, {
							children: [
								node.name,
								jsx("span", {
									className:
										"ml-2 inline-flex rounded-full border border-amber-300/70 bg-amber-100/75 px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] text-amber-800 uppercase align-middle",
									children: "Coming soon",
								}),
							],
						})
					);

					return node;
				},
			},
		},
	],
	source: docs.toFumadocsSource(),
});
