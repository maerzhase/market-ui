import type { Meta, StoryObj } from "@storybook/react";
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
        >
          <title>Plus icon</title>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </Button>
      <Button size="icon-sm" color="secondary" aria-label="Add">
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
          <title>Plus icon</title>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </Button>
      <Button size="icon" color="secondary" aria-label="Add">
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
          <title>Plus icon</title>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </Button>
      <Button size="icon-lg" color="secondary" aria-label="Add">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
        >
          <title>Plus icon</title>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
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
  args: {
    children: "Disabled",
    disabled: true,
  },
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
      <Button size="xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              role="img"
            >
              <title>Star</title>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </Button>
          <Button size="icon-sm" color="secondary" aria-label="Action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              role="img"
            >
              <title>Star</title>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </Button>
          <Button size="icon" color="secondary" aria-label="Action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              role="img"
            >
              <title>Star</title>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </Button>
          <Button size="icon-lg" color="secondary" aria-label="Action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              role="img"
            >
              <title>Star</title>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
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
