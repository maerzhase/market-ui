import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/primitives/Tag";

const meta: Meta<typeof Tag> = {
  title: "Primitives/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["informative", "interactive"],
    },
  },
};

export default meta;

export const Informative: StoryObj<typeof Tag> = {
  args: {
    children: "NFT",
    type: "informative",
  },
};

export const Interactive: StoryObj<typeof Tag> = {
  render: () => (
    <Tag type="interactive" onClick={() => console.log("Tag clicked")}>
      Click me
    </Tag>
  ),
};

export const StatusTags: StoryObj<typeof Tag> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag>Live</Tag>
      <Tag>Upcoming</Tag>
      <Tag>Closed</Tag>
      <Tag>Sold Out</Tag>
    </div>
  ),
};

export const CategoryTags: StoryObj<typeof Tag> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag>Art</Tag>
      <Tag>Photography</Tag>
      <Tag>Music</Tag>
      <Tag>Collectibles</Tag>
      <Tag>Gaming</Tag>
    </div>
  ),
};

export const InteractiveTags: StoryObj<typeof Tag> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag type="interactive" onClick={() => console.log("Art")}>
        Art
      </Tag>
      <Tag type="interactive" onClick={() => console.log("Photography")}>
        Photography
      </Tag>
      <Tag type="interactive" onClick={() => console.log("Music")}>
        Music
      </Tag>
      <Tag type="interactive" onClick={() => console.log("Collectibles")}>
        Collectibles
      </Tag>
    </div>
  ),
};

export const WithNumbers: StoryObj<typeof Tag> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag>Edition #1</Tag>
      <Tag>Rank #5</Tag>
      <Tag>0.5 ETH</Tag>
      <Tag>20 editions</Tag>
    </div>
  ),
};

export const InContext: StoryObj<typeof Tag> = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Auction #1234</h3>
        <Tag>Live</Tag>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        A curated collection of digital art
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        <Tag>Art</Tag>
        <Tag>Digital</Tag>
        <Tag>Limited</Tag>
      </div>
    </div>
  ),
};

export const AllTypes: StoryObj<typeof Tag> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Informative (default)
        </p>
        <div className="flex gap-2">
          <Tag type="informative">Status</Tag>
          <Tag type="informative">Category</Tag>
          <Tag type="informative">Label</Tag>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Interactive (clickable)
        </p>
        <div className="flex gap-2">
          <Tag type="interactive" onClick={() => console.log("1")}>
            Filter 1
          </Tag>
          <Tag type="interactive" onClick={() => console.log("2")}>
            Filter 2
          </Tag>
          <Tag type="interactive" onClick={() => console.log("3")}>
            Filter 3
          </Tag>
        </div>
      </div>
    </div>
  ),
};
