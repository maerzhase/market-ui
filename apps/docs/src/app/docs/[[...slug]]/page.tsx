import { findNeighbour } from "fumadocs-core/page-tree";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/docs/mdx-components";
import { DocsTableOfContents } from "@/components/layout/docs-toc";
import { source } from "@/lib/source";

export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDX = page.data.body;
	const neighbours = findNeighbour(source.getPageTree(), page.url);

	return (
		<div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_16rem]">
			<article className="min-w-0">
				<header className="mb-10 space-y-3 border-b border-border pb-6">
					<p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
						Documentation
					</p>
					<h1 className="text-4xl font-semibold tracking-tight text-foreground">
						{page.data.title}
					</h1>
					{page.data.description ? (
						<p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
							{page.data.description}
						</p>
					) : null}
				</header>

				<div className="docs-prose min-w-0">
					<MDX components={mdxComponents} />
				</div>

				{(neighbours.previous || neighbours.next) ? (
					<footer className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
						{neighbours.previous ? (
							<a
								href={neighbours.previous.url}
								className="rounded-xl border border-border bg-card px-4 py-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
							>
								<div className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
									Previous
								</div>
								<div className="mt-1 font-medium text-foreground">
									{neighbours.previous.name}
								</div>
							</a>
						) : (
							<div />
						)}
						{neighbours.next ? (
							<a
								href={neighbours.next.url}
								className="rounded-xl border border-border bg-card px-4 py-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40 sm:text-right"
							>
								<div className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
									Next
								</div>
								<div className="mt-1 font-medium text-foreground">
									{neighbours.next.name}
								</div>
							</a>
						) : null}
					</footer>
				) : null}
			</article>

			<DocsTableOfContents toc={page.data.toc} />
		</div>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
