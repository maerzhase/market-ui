import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/components/primitives/Skeleton";
import { Text } from "@/components/primitives/Text";

const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Basic: StoryObj<typeof Skeleton> = {
  render: () => <Skeleton className="h-4 w-32" />,
};

export const TextLine: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="w-64 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};

export const Avatar: StoryObj<typeof Skeleton> = {
  render: () => <Skeleton className="size-12 rounded-full" />,
};

export const Card: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-background p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  ),
};

export const BidCard: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-muted p-4">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="mt-3 flex justify-between">
        <Skeleton className="h-5 w-20" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="mt-4 h-9 w-full rounded-md" />
    </div>
  ),
};

export const TableRow: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="w-96">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-border px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const WithText: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Skeleton wrapping text content
        </p>
        <Text render={<p />} size="3">
          <Skeleton>This text is hidden but defines width</Skeleton>
        </Text>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Skeleton with placeholder text
        </p>
        <Text render={<p />} size="2">
          <Skeleton>0.00420 ETH</Skeleton>
        </Text>
      </div>
    </div>
  ),
};

export const Sizes: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Small (h-3)</p>
        <Skeleton className="h-3 w-24" />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Default (h-4)</p>
        <Skeleton className="h-4 w-32" />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Medium (h-6)</p>
        <Skeleton className="h-6 w-40" />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Large (h-10)</p>
        <Skeleton className="h-10 w-48" />
      </div>
    </div>
  ),
};
