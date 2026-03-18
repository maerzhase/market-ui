import type { Meta, StoryObj } from "@storybook/react";
import { RankedAuctionStatusTag } from "@/components/blocks/ranked-auction/RankedAuctionStatusTag";

const meta: Meta<typeof RankedAuctionStatusTag> = {
  title: "Blocks/RankedAuction/StatusTag",
  component: RankedAuctionStatusTag,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    background: {
      control: "select",
      options: ["filled", "transparent"],
    },
    showCountdown: {
      control: "boolean",
    },
  },
};

export default meta;

export const Live: StoryObj<typeof RankedAuctionStatusTag> = {
  args: {
    opensAt: new Date(Date.now() - 86400000),
    endsAt: new Date(Date.now() + 86400000 * 2),
    background: "filled",
    showCountdown: false,
  },
};

export const LiveWithCountdown: StoryObj<typeof RankedAuctionStatusTag> = {
  args: {
    opensAt: new Date(Date.now() - 86400000),
    endsAt: new Date(Date.now() + 3600000),
    background: "filled",
    showCountdown: true,
  },
};

export const Upcoming: StoryObj<typeof RankedAuctionStatusTag> = {
  args: {
    opensAt: new Date(Date.now() + 86400000),
    endsAt: new Date(Date.now() + 86400000 * 3),
    background: "filled",
    showCountdown: false,
  },
};

export const UpcomingWithCountdown: StoryObj<typeof RankedAuctionStatusTag> = {
  args: {
    opensAt: new Date(Date.now() + 3600000 * 2),
    endsAt: new Date(Date.now() + 86400000 * 3),
    background: "filled",
    showCountdown: true,
  },
};

export const Closed: StoryObj<typeof RankedAuctionStatusTag> = {
  args: {
    opensAt: new Date(Date.now() - 86400000 * 5),
    endsAt: new Date(Date.now() - 86400000),
    background: "filled",
    showCountdown: false,
  },
};

export const TransparentBackground: StoryObj<typeof RankedAuctionStatusTag> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Live (transparent)</p>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() - 86400000)}
          endsAt={new Date(Date.now() + 86400000 * 2)}
          background="transparent"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Upcoming (transparent)
        </p>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() + 86400000)}
          endsAt={new Date(Date.now() + 86400000 * 3)}
          background="transparent"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Closed (transparent)
        </p>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() - 86400000 * 5)}
          endsAt={new Date(Date.now() - 86400000)}
          background="transparent"
        />
      </div>
    </div>
  ),
};

export const AllStates: StoryObj<typeof RankedAuctionStatusTag> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Live auction</p>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() - 86400000)}
          endsAt={new Date(Date.now() + 86400000 * 2)}
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Live auction with countdown
        </p>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() - 86400000)}
          endsAt={new Date(Date.now() + 3600000)}
          showCountdown
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Upcoming auction</p>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() + 86400000)}
          endsAt={new Date(Date.now() + 86400000 * 3)}
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Upcoming auction with countdown
        </p>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() + 3600000 * 2)}
          endsAt={new Date(Date.now() + 86400000 * 3)}
          showCountdown
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Closed auction</p>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() - 86400000 * 5)}
          endsAt={new Date(Date.now() - 86400000)}
        />
      </div>
    </div>
  ),
};

export const InCard: StoryObj<typeof RankedAuctionStatusTag> = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-foreground">Auction #1234</span>
        <RankedAuctionStatusTag
          opensAt={new Date(Date.now() - 86400000)}
          endsAt={new Date(Date.now() + 86400000 * 2)}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        A curated collection of 20 editions
      </p>
    </div>
  ),
};
