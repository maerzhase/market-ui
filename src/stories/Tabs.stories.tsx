import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tab, Tabs, TabsList, TabsPanel } from "@/components/primitives/Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Trading UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    layout: {
      control: "select",
      options: ["default", "centered"],
    },
    variant: {
      control: "select",
      options: ["default", "underline"],
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Activity</Tab>
        <Tab value="tab3">Settings</Tab>
      </TabsList>
      <TabsPanel value="tab1" className="pt-4">
        <p className="text-foreground">Overview content goes here.</p>
      </TabsPanel>
      <TabsPanel value="tab2" className="pt-4">
        <p className="text-foreground">Activity content goes here.</p>
      </TabsPanel>
      <TabsPanel value="tab3" className="pt-4">
        <p className="text-foreground">Settings content goes here.</p>
      </TabsPanel>
    </Tabs>
  ),
};

export const Underline: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="tab1" variant="underline" className="w-96">
      <TabsList>
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Activity</Tab>
        <Tab value="tab3">Settings</Tab>
      </TabsList>
      <TabsPanel value="tab1" className="pt-4">
        <p className="text-foreground">
          Overview content with underline indicator.
        </p>
      </TabsPanel>
      <TabsPanel value="tab2" className="pt-4">
        <p className="text-foreground">
          Activity content with underline indicator.
        </p>
      </TabsPanel>
      <TabsPanel value="tab3" className="pt-4">
        <p className="text-foreground">
          Settings content with underline indicator.
        </p>
      </TabsPanel>
    </Tabs>
  ),
};

export const Centered: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="tab1" layout="centered" className="w-96">
      <TabsList>
        <Tab value="tab1">Bids</Tab>
        <Tab value="tab2">Rankings</Tab>
        <Tab value="tab3">Your Bids</Tab>
      </TabsList>
      <TabsPanel value="tab1" className="pt-4">
        <p className="text-foreground">Bids content (centered layout).</p>
      </TabsPanel>
      <TabsPanel value="tab2" className="pt-4">
        <p className="text-foreground">Rankings content (centered layout).</p>
      </TabsPanel>
      <TabsPanel value="tab3" className="pt-4">
        <p className="text-foreground">Your Bids content (centered layout).</p>
      </TabsPanel>
    </Tabs>
  ),
};

export const CenteredUnderline: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs
      defaultValue="tab1"
      layout="centered"
      variant="underline"
      className="w-96"
    >
      <TabsList>
        <Tab value="tab1">Bids</Tab>
        <Tab value="tab2">Rankings</Tab>
        <Tab value="tab3">Your Bids</Tab>
      </TabsList>
      <TabsPanel value="tab1" className="pt-4">
        <p className="text-foreground">Bids content (centered + underline).</p>
      </TabsPanel>
      <TabsPanel value="tab2" className="pt-4">
        <p className="text-foreground">
          Rankings content (centered + underline).
        </p>
      </TabsPanel>
      <TabsPanel value="tab3" className="pt-4">
        <p className="text-foreground">
          Your Bids content (centered + underline).
        </p>
      </TabsPanel>
    </Tabs>
  ),
};

export const TwoTabs: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="details" variant="underline" className="w-80">
      <TabsList>
        <Tab value="details">Details</Tab>
        <Tab value="history">History</Tab>
      </TabsList>
      <TabsPanel value="details" className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reserve Price</span>
            <span className="text-foreground">0.01 ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Editions</span>
            <span className="text-foreground">20</span>
          </div>
        </div>
      </TabsPanel>
      <TabsPanel value="history" className="pt-4">
        <p className="text-muted-foreground">No history yet.</p>
      </TabsPanel>
    </Tabs>
  ),
};

export const ManyTabs: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[600px]">
      <TabsList>
        <Tab value="tab1">Home</Tab>
        <Tab value="tab2">Explore</Tab>
        <Tab value="tab3">Collections</Tab>
        <Tab value="tab4">Activity</Tab>
        <Tab value="tab5">Profile</Tab>
        <Tab value="tab6">Settings</Tab>
      </TabsList>
      <TabsPanel value="tab1" className="pt-4">
        <p className="text-foreground">Home content</p>
      </TabsPanel>
      <TabsPanel value="tab2" className="pt-4">
        <p className="text-foreground">Explore content</p>
      </TabsPanel>
      <TabsPanel value="tab3" className="pt-4">
        <p className="text-foreground">Collections content</p>
      </TabsPanel>
      <TabsPanel value="tab4" className="pt-4">
        <p className="text-foreground">Activity content</p>
      </TabsPanel>
      <TabsPanel value="tab5" className="pt-4">
        <p className="text-foreground">Profile content</p>
      </TabsPanel>
      <TabsPanel value="tab6" className="pt-4">
        <p className="text-foreground">Settings content</p>
      </TabsPanel>
    </Tabs>
  ),
};

export const InCard: StoryObj<typeof Tabs> = {
  render: () => (
    <div className="w-96 rounded-lg border border-border bg-background p-4">
      <h3 className="mb-4 font-medium text-foreground">Auction Details</h3>
      <Tabs defaultValue="info" variant="underline">
        <TabsList>
          <Tab value="info">Info</Tab>
          <Tab value="bids">Bids</Tab>
          <Tab value="rules">Rules</Tab>
        </TabsList>
        <TabsPanel value="info" className="pt-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success">Live</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Left</span>
              <span className="text-foreground">2h 30m</span>
            </div>
          </div>
        </TabsPanel>
        <TabsPanel value="bids" className="pt-4">
          <p className="text-sm text-muted-foreground">25 bids placed</p>
        </TabsPanel>
        <TabsPanel value="rules" className="pt-4">
          <p className="text-sm text-muted-foreground">
            Top 20 bidders win and pay the lowest winning bid.
          </p>
        </TabsPanel>
      </Tabs>
    </div>
  ),
};
