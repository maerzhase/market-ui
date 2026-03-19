import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { Header } from "@/components/layout/header";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header variant="docs" />
			<DocsLayout
				{...baseOptions}
				containerProps={{
					className: "[--fd-banner-height:--spacing(14)]",
				}}
				tree={source.getPageTree()}
				nav={{
					...baseOptions.nav,
					enabled: false,
					title: () => null,
				}}
				searchToggle={{
					enabled: false,
				}}
				themeSwitch={{
					enabled: false,
				}}
				sidebar={{
					collapsible: false,
					tabs: false,
				}}
			>
				{children}
			</DocsLayout>
		</>
	);
}
