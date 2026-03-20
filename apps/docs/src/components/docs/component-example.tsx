import { highlight } from "fumadocs-core/highlight";
import { ComponentPreview } from "@/components/ui/component-preview";
import { getExampleDefinition } from "./examples/registry";

export interface ComponentExampleProps {
  name: string;
  className?: string;
  previewClassName?: string;
  maxWidth?: string | number;
  minHeight?: string | number;
  align?: "center" | "start" | "stretch";
  allowPointerEvents?: boolean;
}

export async function ComponentExample({
  name,
  className,
  previewClassName,
  maxWidth,
  minHeight,
  align,
  allowPointerEvents,
}: ComponentExampleProps) {
  const definition = getExampleDefinition(name);

  if (!definition) {
    throw new Error(
      `Unknown docs example "${name}". Add it to the example registry before using <ComponentExample />.`,
    );
  }

  const ExampleComponent = definition.Component;
  const highlightedCode = await highlight(definition.code, { lang: "tsx" });

  return (
    <ComponentPreview
      code={definition.code}
      highlightedCode={highlightedCode}
      className={className ?? definition.className}
      previewClassName={previewClassName ?? definition.previewClassName}
      maxWidth={maxWidth ?? definition.maxWidth}
      minHeight={minHeight ?? definition.minHeight}
      align={align ?? definition.align}
      allowPointerEvents={allowPointerEvents ?? definition.allowPointerEvents}
    >
      <ExampleComponent />
    </ComponentPreview>
  );
}
