import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/components/primitives/Separator";

const meta: Meta<typeof Separator> = {
  title: "Trading UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["default", "subtle"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    label: {
      control: "text",
    },
  },
};

export default meta;

export const Horizontal: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-64">
      <p className="text-foreground">Content above</p>
      <Separator className="my-4" />
      <p className="text-foreground">Content below</p>
    </div>
  ),
};

export const Vertical: StoryObj<typeof Separator> = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-foreground">Left</span>
      <Separator orientation="vertical" className="h-full" />
      <span className="text-foreground">Right</span>
    </div>
  ),
};

export const DefaultColor: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-64">
      <p className="mb-2 text-sm text-muted-foreground">Default color</p>
      <Separator color="default" />
    </div>
  ),
};

export const SubtleColor: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-64">
      <p className="mb-2 text-sm text-muted-foreground">Subtle color</p>
      <Separator color="subtle" />
    </div>
  ),
};

export const AllVariants: StoryObj<typeof Separator> = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Horizontal - Default
        </p>
        <div className="w-64">
          <Separator color="default" orientation="horizontal" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Horizontal - Subtle
        </p>
        <div className="w-64">
          <Separator color="subtle" orientation="horizontal" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Vertical - Default</p>
        <div className="flex h-16 items-center gap-4">
          <span className="text-foreground">A</span>
          <Separator
            color="default"
            orientation="vertical"
            className="h-full"
          />
          <span className="text-foreground">B</span>
          <Separator
            color="default"
            orientation="vertical"
            className="h-full"
          />
          <span className="text-foreground">C</span>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Vertical - Subtle</p>
        <div className="flex h-16 items-center gap-4">
          <span className="text-foreground">A</span>
          <Separator color="subtle" orientation="vertical" className="h-full" />
          <span className="text-foreground">B</span>
          <Separator color="subtle" orientation="vertical" className="h-full" />
          <span className="text-foreground">C</span>
        </div>
      </div>
    </div>
  ),
};

export const InCard: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-background p-4">
      <h3 className="font-medium text-foreground">Card Title</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Some description text
      </p>
      <Separator className="my-4" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Price</span>
        <span className="text-foreground">0.5 ETH</span>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Status</span>
        <span className="text-success">Active</span>
      </div>
    </div>
  ),
};

export const WithLabel: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-80">
      <p className="text-foreground">Content above</p>
      <Separator label="Section" className="my-2" />
      <p className="text-foreground">Content below</p>
    </div>
  ),
};

export const WithLabelSubtle: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-80">
      <p className="text-foreground">Content above</p>
      <Separator label="Group A" color="subtle" className="my-2" />
      <p className="text-foreground">Content below</p>
    </div>
  ),
};

export const VerticalWithLabel: StoryObj<typeof Separator> = {
  render: () => (
    <div className="flex h-32 items-center">
      <span className="text-foreground">Left</span>
      <Separator orientation="vertical" label="A" className="mx-2 h-full" />
      <span className="text-foreground">Right</span>
    </div>
  ),
};

export const LabelsInCard: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-background p-4">
      <h3 className="font-medium text-foreground">Transaction Details</h3>
      <Separator label="From" className="my-2" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Address</span>
        <span className="text-foreground">0x1234...5678</span>
      </div>
      <Separator label="To" className="my-2" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Address</span>
        <span className="text-foreground">0xabcd...efgh</span>
      </div>
      <Separator label="Amount" color="subtle" className="my-2" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Value</span>
        <span className="text-foreground">1.5 ETH</span>
      </div>
    </div>
  ),
};
