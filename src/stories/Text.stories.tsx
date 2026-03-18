import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components/primitives/Text";

const meta: Meta<typeof Text> = {
  title: "Primitives/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "disabled",
        "current",
        "success",
        "error",
      ],
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
    },
    tabularNums: {
      control: "boolean",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Text> = {
  args: {
    children: "Default text",
  },
};

export const Sizes: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text size="1">Size 1 - Smallest text</Text>
      <Text size="2">Size 2 - Default text</Text>
      <Text size="3">Size 3 - Slightly larger</Text>
      <Text size="4">Size 4 - Medium text</Text>
      <Text size="5">Size 5 - Large text</Text>
      <Text size="6">Size 6 - Extra large</Text>
      <Text size="7">Size 7 - Heading</Text>
      <Text size="8">Size 8 - Display</Text>
      <Text size="9">Size 9 - Hero</Text>
    </div>
  ),
};

export const Weights: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text weight="regular">Regular weight (default)</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
    </div>
  ),
};

export const Colors: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text color="primary">Primary color (default)</Text>
      <Text color="secondary">Secondary color</Text>
      <Text color="tertiary">Tertiary color</Text>
      <Text color="disabled">Disabled color</Text>
      <Text color="success">Success color</Text>
      <Text color="error">Error color</Text>
    </div>
  ),
};

export const Alignment: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex w-64 flex-col gap-2 border border-border p-2">
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
    </div>
  ),
};

export const TabularNumbers: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div>
        <p className="mb-1 text-xs text-muted-foreground">
          Without tabular nums:
        </p>
        <div className="flex flex-col">
          <Text>0.001 ETH</Text>
          <Text>0.111 ETH</Text>
          <Text>1.234 ETH</Text>
        </div>
      </div>
      <div>
        <p className="mb-1 text-xs text-muted-foreground">With tabular nums:</p>
        <div className="flex flex-col">
          <Text tabularNums>0.001 ETH</Text>
          <Text tabularNums>0.111 ETH</Text>
          <Text tabularNums>1.234 ETH</Text>
        </div>
      </div>
    </div>
  ),
};

export const AsHeading: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Text
        render={<h1 />}
        size="8"
        weight="semibold"
        aria-label="Heading level 1"
      >
        Heading 1
      </Text>
      <Text
        render={<h2 />}
        size="7"
        weight="semibold"
        aria-label="Heading level 2"
      >
        Heading 2
      </Text>
      <Text
        render={<h3 />}
        size="6"
        weight="medium"
        aria-label="Heading level 3"
      >
        Heading 3
      </Text>
      <Text
        render={<h4 />}
        size="5"
        weight="medium"
        aria-label="Heading level 4"
      >
        Heading 4
      </Text>
      <Text render={<p />} size="2">
        Paragraph text that follows the headings.
      </Text>
    </div>
  ),
};

export const AsParagraph: StoryObj<typeof Text> = {
  render: () => (
    <div className="max-w-md">
      <Text render={<p />} size="2" color="primary">
        This is a paragraph of text rendered using the Text component. It
        supports multiple sizes, weights, and colors. The text automatically
        wraps and maintains proper line height for readability.
      </Text>
    </div>
  ),
};

export const PriceDisplay: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-2">
        <Text size="5" weight="semibold" tabularNums>
          0.500
        </Text>
        <Text size="3" color="secondary">
          ETH
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <Text size="2" color="success" tabularNums>
          +12.5%
        </Text>
        <Text size="1" color="tertiary">
          24h change
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <Text size="2" color="error" tabularNums>
          -5.2%
        </Text>
        <Text size="1" color="tertiary">
          7d change
        </Text>
      </div>
    </div>
  ),
};

export const AuctionInfo: StoryObj<typeof Text> = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-background p-4">
      <Text render={<h3 />} size="4" weight="medium" aria-label="Auction title">
        Ranked Auction #42
      </Text>
      <Text render={<p />} size="2" color="secondary" className="mt-1">
        Bid on one of 20 curated editions. Top 20 bidders win and pay the lowest
        winning bid.
      </Text>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <Text size="2" color="tertiary">
            Reserve Price
          </Text>
          <Text size="2" weight="medium" tabularNums>
            0.01 ETH
          </Text>
        </div>
        <div className="flex justify-between">
          <Text size="2" color="tertiary">
            Current Floor
          </Text>
          <Text size="2" weight="medium" tabularNums>
            0.05 ETH
          </Text>
        </div>
        <div className="flex justify-between">
          <Text size="2" color="tertiary">
            Status
          </Text>
          <Text size="2" color="success" weight="medium">
            Live
          </Text>
        </div>
      </div>
    </div>
  ),
};

export const AllCombinations: StoryObj<typeof Text> = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(["regular", "medium", "semibold"] as const).map((weight) => (
        <div key={weight} className="space-y-2">
          <p className="text-xs text-muted-foreground capitalize">{weight}</p>
          {(["primary", "secondary", "success", "error"] as const).map(
            (color) => (
              <Text key={color} weight={weight} color={color} size="2">
                {color}
              </Text>
            ),
          )}
        </div>
      ))}
    </div>
  ),
};
