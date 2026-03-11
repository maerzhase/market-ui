import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "@/components/primitives";

const meta: Meta<typeof Button> = {
  title: "Trading UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "md"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    active: {
      control: "boolean",
    },
  },
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: "Button",
    color: "primary",
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    children: "Button",
    color: "secondary",
  },
};

export const Tertiary: StoryObj<typeof Button> = {
  args: {
    children: "Button",
    color: "tertiary",
  },
};

export const Ghost: StoryObj<typeof Button> = {
  args: {
    children: "Button",
    color: "ghost",
  },
};

export const Sizes: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Button size="default">Default Button</Button>
      <Button size="md">Medium Button</Button>
    </div>
  ),
};

export const Loading: StoryObj<typeof Button> = {
  args: {
    children: "Loading",
    loading: true,
  },
};

export const Disabled: StoryObj<typeof Button> = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const Active: StoryObj<typeof Button> = {
  args: {
    children: "Active",
    active: true,
  },
};

export const WithIcon: StoryObj<typeof Button> = {
  render: () => (
    <Button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
      >
        <title>Arrow icon</title>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
      With Icon
    </Button>
  ),
};

export const AllColors: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="tertiary">Tertiary</Button>
        <Button color="ghost">Ghost</Button>
      </div>
      <div className="flex gap-2">
        <Button color="primary" disabled>
          Primary
        </Button>
        <Button color="secondary" disabled>
          Secondary
        </Button>
        <Button color="tertiary" disabled>
          Tertiary
        </Button>
        <Button color="ghost" disabled>
          Ghost
        </Button>
      </div>
      <div className="flex gap-2">
        <Button color="primary" loading>
          Primary
        </Button>
        <Button color="secondary" loading>
          Secondary
        </Button>
        <Button color="tertiary" loading>
          Tertiary
        </Button>
        <Button color="ghost" loading>
          Ghost
        </Button>
      </div>
    </div>
  ),
};
