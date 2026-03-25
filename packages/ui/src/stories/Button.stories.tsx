import { IconArrowRight, IconPlus, IconStarFilled } from "@tabler/icons-react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/primitives";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "xl",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
        "card",
      ],
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

export const Destructive: StoryObj<typeof Button> = {
  args: {
    children: "Delete",
    color: "destructive",
  },
};

export const Link: StoryObj<typeof Button> = {
  args: {
    children: "Learn more",
    color: "link",
  },
};

export const Sizes: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const IconSizes: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="icon-xs" color="secondary" aria-label="Add">
        <IconPlus aria-hidden className="size-3.5" />
      </Button>
      <Button size="icon-sm" color="secondary" aria-label="Add">
        <IconPlus aria-hidden className="size-4" />
      </Button>
      <Button size="icon" color="secondary" aria-label="Add">
        <IconPlus aria-hidden className="size-4" />
      </Button>
      <Button size="icon-lg" color="secondary" aria-label="Add">
        <IconPlus aria-hidden className="size-5" />
      </Button>
    </div>
  ),
};

export const CardSize: StoryObj<typeof Button> = {
  render: () => (
    <div className="w-64">
      <Button size="card" color="tertiary" className="w-full justify-start">
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">Card Button</span>
          <span className="text-xs text-muted-foreground">
            With description text
          </span>
        </div>
      </Button>
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
  render: () => (
    <div className="flex flex-wrap gap-2">
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
      <Button color="destructive" disabled>
        Destructive
      </Button>
      <Button color="link" disabled>
        Link
      </Button>
    </div>
  ),
};

export const Active: StoryObj<typeof Button> = {
  args: {
    children: "Active",
    active: true,
    color: "tertiary",
  },
};

export const WithIcon: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <IconArrowRight aria-hidden className="size-4" />
        With Icon
      </Button>
      <Button size="xs">
        <IconArrowRight aria-hidden className="size-3" />
        XS with Icon
      </Button>
    </div>
  ),
};

export const AllColors: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="tertiary">Tertiary</Button>
        <Button color="ghost">Ghost</Button>
        <Button color="destructive">Destructive</Button>
        <Button color="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-2">
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
        <Button color="destructive" disabled>
          Destructive
        </Button>
        <Button color="link" disabled>
          Link
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
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
        <Button color="destructive" loading>
          Destructive
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button color="primary" active>
          Primary
        </Button>
        <Button color="secondary" active>
          Secondary
        </Button>
        <Button color="tertiary" active>
          Tertiary
        </Button>
        <Button color="ghost" active>
          Ghost
        </Button>
      </div>
    </div>
  ),
};

export const AllSizes: StoryObj<typeof Button> = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Text Buttons</p>
        <div className="flex items-end gap-2">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="default">Default</Button>
          <Button size="lg">LG</Button>
          <Button size="xl">XL</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Icon Buttons</p>
        <div className="flex items-end gap-2">
          <Button size="icon-xs" color="secondary" aria-label="Action">
            <IconStarFilled aria-hidden className="size-3.5" />
          </Button>
          <Button size="icon-sm" color="secondary" aria-label="Action">
            <IconStarFilled aria-hidden className="size-4" />
          </Button>
          <Button size="icon" color="secondary" aria-label="Action">
            <IconStarFilled aria-hidden className="size-4" />
          </Button>
          <Button size="icon-lg" color="secondary" aria-label="Action">
            <IconStarFilled aria-hidden className="size-5" />
          </Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Card Button</p>
        <div className="w-64">
          <Button size="card" color="tertiary" className="w-full justify-start">
            <div className="flex flex-col items-start">
              <span className="font-medium">Select Option</span>
              <span className="text-xs text-muted-foreground">
                Additional details here
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  ),
};
