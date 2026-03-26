import { Meter } from "@base-ui/react/meter";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Countdown } from "@/components/primitives/countdown";
import { cn } from "@/lib";

const meta: Meta<typeof Countdown> = {
  title: "Primitives/Countdown",
  component: Countdown,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center gap-4 rounded-lg p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    showWhenExpired: {
      control: "boolean",
    },
  },
};

export default meta;

export const Live: StoryObj<typeof Countdown> = {
  render: (args) => (
    <Countdown {...args} to={new Date(Date.now() + 3600000 * 2 + 45000)} />
  ),
};

export const ShortTime: StoryObj<typeof Countdown> = {
  render: () => <Countdown to={new Date(Date.now() + 60000)} />,
};

export const DaysLeft: StoryObj<typeof Countdown> = {
  render: () => <Countdown to={new Date(Date.now() + 86400000 * 5)} />,
};

export const ShowWhenExpired: StoryObj<typeof Countdown> = {
  render: () => (
    <Countdown to={new Date(Date.now() - 3600000)} showWhenExpired />
  ),
};

export const CustomRender: StoryObj<typeof Countdown> = {
  render: () => (
    <Countdown to={new Date(Date.now() + 86400000)}>
      {({ timeString }) => (
        <span className="font-mono text-xl text-success">{timeString}</span>
      )}
    </Countdown>
  ),
};

export const SemanticLabels: StoryObj<typeof Countdown> = {
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-6 rounded-lg p-8">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Open:</span>
        <Countdown to={new Date(Date.now() + 3600000)}>
          {({ timeString, isExpired }) => (
            <span className="font-mono text-base text-success">
              {isExpired ? "Closed" : `Open - ${timeString} left`}
            </span>
          )}
        </Countdown>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Upcoming:</span>
        <Countdown to={new Date(Date.now() + 86400000 * 3)}>
          {({ timeString, isExpired }) => (
            <span className="font-mono text-base text-warning">
              {isExpired ? "Live now!" : `Opens in ${timeString}`}
            </span>
          )}
        </Countdown>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Closed:</span>
        <Countdown to={new Date(Date.now() - 3600000)} showWhenExpired>
          {({ timeString }) => (
            <span className="font-mono text-base text-destructive">
              Closed - {timeString} ago
            </span>
          )}
        </Countdown>
      </div>
    </>
  ),
};

export const LiveToClosed: StoryObj<typeof Countdown> = {
  render: () => {
    const [targetDate] = React.useState(() => new Date(Date.now() + 10000));

    return (
      <>
        <p className="mb-2 text-sm text-muted-foreground">
          Watch the transition (expires in ~10s):
        </p>
        <Countdown to={targetDate}>
          {({ timeString, isExpired }) => (
            <span
              className={cn(
                "font-mono text-xl transition-colors",
                isExpired ? "text-destructive" : "text-success",
              )}
            >
              {isExpired
                ? `Closed - ${timeString} ago`
                : `Live - ${timeString} left`}
            </span>
          )}
        </Countdown>
      </>
    );
  },
};

export const WithProgress: StoryObj<typeof Countdown> = {
  render: () => (
    <Countdown to={new Date(Date.now() + 60 * 1 * 1000)} stopOnExpired>
      {({ timeString, remainingMs, isExpired }) => {
        const total = 60 * 1 * 1000;
        const progress = isExpired
          ? 100
          : ((total - (remainingMs ?? 0)) / total) * 100;

        return (
          <Meter.Root value={progress} className="w-full">
            <div className="mb-1 flex justify-between gap-4 text-sm">
              <Meter.Label className="text-muted-foreground">
                Time remaining
              </Meter.Label>
              <span className="font-mono">{timeString}</span>
            </div>
            <Meter.Track className="h-2 overflow-hidden rounded-full bg-muted">
              <Meter.Indicator className="h-full bg-success transition-all duration-1000" />
            </Meter.Track>
          </Meter.Root>
        );
      }}
    </Countdown>
  ),
};
