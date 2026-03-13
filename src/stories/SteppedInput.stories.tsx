import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  CursorGrowIcon,
  SteppedInput,
} from "@/components/primitives/SteppedInput";

const meta: Meta<typeof SteppedInput.Root> = {
  title: "Trading UI/SteppedInput",
  component: SteppedInput.Root,
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
};

export default meta;

export const Basic: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(100));
    const getTickSize = () => BigInt(10);

    return (
      <SteppedInput.Root
        value={value}
        onChange={setValue}
        getTickSize={getTickSize}
      >
        <SteppedInput.Group>
          <SteppedInput.Decrement />
          <SteppedInput.ScrubArea>
            <SteppedInput.ScrubAreaCursor>
              <CursorGrowIcon />
            </SteppedInput.ScrubAreaCursor>
            <SteppedInput.Input />
          </SteppedInput.ScrubArea>
          <SteppedInput.Increment />
        </SteppedInput.Group>
      </SteppedInput.Root>
    );
  },
};

export const WithMinMax: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(50));
    const getTickSize = () => BigInt(5);

    return (
      <div className="flex flex-col gap-2">
        <span className="text-text-tertiary text-1">Min 0, Max 100</span>
        <SteppedInput.Root
          value={value}
          onChange={setValue}
          min={BigInt(0)}
          max={BigInt(100)}
          getTickSize={getTickSize}
        >
          <SteppedInput.Group>
            <SteppedInput.Decrement />
            <SteppedInput.ScrubArea>
              <SteppedInput.ScrubAreaCursor>
                <CursorGrowIcon />
              </SteppedInput.ScrubAreaCursor>
              <SteppedInput.Input />
            </SteppedInput.ScrubArea>
            <SteppedInput.Increment />
          </SteppedInput.Group>
        </SteppedInput.Root>
      </div>
    );
  },
};

export const DynamicStepSize: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(1000));
    const getTickSize = (currentValue: bigint) => {
      if (currentValue < BigInt(100)) return BigInt(1);
      if (currentValue < BigInt(1000)) return BigInt(10);
      return BigInt(100);
    };

    return (
      <SteppedInput.Root
        value={value}
        onChange={setValue}
        getTickSize={getTickSize}
      >
        <div className="flex flex-col gap-2">
          <span className="text-text-tertiary text-1">
            Step size changes based on value (1, 10, or 100)
          </span>
          <SteppedInput.Group>
            <SteppedInput.Decrement />
            <SteppedInput.ScrubArea>
              <SteppedInput.ScrubAreaCursor>
                <CursorGrowIcon />
              </SteppedInput.ScrubAreaCursor>
              <SteppedInput.Input />
            </SteppedInput.ScrubArea>
            <SteppedInput.Increment />
          </SteppedInput.Group>
        </div>
      </SteppedInput.Root>
    );
  },
};

export const Disabled: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(500));
    const getTickSize = () => BigInt(50);

    return (
      <SteppedInput.Root
        value={value}
        onChange={setValue}
        getTickSize={getTickSize}
        disabled
      >
        <SteppedInput.Group>
          <SteppedInput.Decrement />
          <SteppedInput.ScrubArea>
            <SteppedInput.ScrubAreaCursor>
              <CursorGrowIcon />
            </SteppedInput.ScrubAreaCursor>
            <SteppedInput.Input />
          </SteppedInput.ScrubArea>
          <SteppedInput.Increment />
        </SteppedInput.Group>
      </SteppedInput.Root>
    );
  },
};

const WEI_PER_ETH = BigInt(10 ** 18);

export const EthereumPrice: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(
      (BigInt(245) * WEI_PER_ETH) / BigInt(10),
    );
    const getTickSize = () => WEI_PER_ETH / BigInt(100);

    return (
      <div className="flex flex-col gap-2">
        <span className="text-text-tertiary text-1">ETH Amount (in wei)</span>
        <SteppedInput.Root
          value={value}
          onChange={setValue}
          min={WEI_PER_ETH / BigInt(10)}
          max={WEI_PER_ETH * BigInt(100)}
          getTickSize={getTickSize}
          formatValue={(v) => Number(v) / Number(WEI_PER_ETH)}
          parseValue={(v) => BigInt(Math.round(v * Number(WEI_PER_ETH)))}
          format={{
            style: "currency",
            currency: "ETH",
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          }}
        >
          <SteppedInput.Group>
            <SteppedInput.Decrement />
            <SteppedInput.ScrubArea>
              <SteppedInput.ScrubAreaCursor>
                <CursorGrowIcon />
              </SteppedInput.ScrubAreaCursor>
              <SteppedInput.Input />
            </SteppedInput.ScrubArea>
            <SteppedInput.Increment />
          </SteppedInput.Group>
        </SteppedInput.Root>
      </div>
    );
  },
};

export const CustomValueDisplay: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(
      (BigInt(150) * WEI_PER_ETH) / BigInt(10),
    );
    const getTickSize = () => WEI_PER_ETH / BigInt(100);

    return (
      <SteppedInput.Root
        value={value}
        onChange={setValue}
        min={WEI_PER_ETH / BigInt(10)}
        max={WEI_PER_ETH * BigInt(100)}
        getTickSize={getTickSize}
        formatValue={(v) => Number(v) / Number(WEI_PER_ETH)}
        parseValue={(v) => BigInt(Math.round(v * Number(WEI_PER_ETH)))}
        format={{
          style: "decimal",
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        }}
      >
        <SteppedInput.Group>
          <SteppedInput.Decrement />

          <SteppedInput.ScrubArea>
            <SteppedInput.ScrubAreaCursor>
              <CursorGrowIcon />
            </SteppedInput.ScrubAreaCursor>
            <SteppedInput.Value>
              {({ displayValue }) => (
                <span className="font-mono text-success">
                  {displayValue.toFixed(4)} ETH
                </span>
              )}
            </SteppedInput.Value>
          </SteppedInput.ScrubArea>
          <SteppedInput.Increment />
        </SteppedInput.Group>
      </SteppedInput.Root>
    );
  },
};

export const SnapToTick: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    // Demonstrate snapToTick with different rounding modes
    // Using cents: tick size is $10 (1000 cents)
    const [valueUp, setValueUp] = React.useState(BigInt(1050)); // $10.50 -> snaps to $20
    const [valueDown, setValueDown] = React.useState(BigInt(1050)); // $10.50 -> snaps to $10
    const [valueNearest, setValueNearest] = React.useState(BigInt(1050)); // $10.50 -> snaps to $10

    const getTickSize = () => BigInt(1000); // $10 in cents
    const formatValue = (v: bigint) => Number(v) / 100;
    const parseValue = (v: number) => BigInt(Math.round(v * 100));

    return (
      <div className="flex flex-col gap-6">
        <div className="text-sm text-muted-foreground">
          Tick size: $10. Try dragging to see values snap to the grid.
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            snapToTick=&quot;up&quot; (always round up)
          </span>
          <span className="text-xs text-muted-foreground">
            Current: ${formatValue(valueUp).toFixed(2)}
          </span>
          <SteppedInput.Root
            value={valueUp}
            onChange={setValueUp}
            min={BigInt(1000)}
            getTickSize={getTickSize}
            formatValue={formatValue}
            parseValue={parseValue}
            snapToTick="up"
            format={{ style: "currency", currency: "USD" }}
          >
            <SteppedInput.Group>
              <SteppedInput.Decrement />
              <SteppedInput.ScrubArea>
                <SteppedInput.ScrubAreaCursor>
                  <CursorGrowIcon />
                </SteppedInput.ScrubAreaCursor>
                <SteppedInput.Input />
              </SteppedInput.ScrubArea>
              <SteppedInput.Increment />
            </SteppedInput.Group>
          </SteppedInput.Root>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            snapToTick=&quot;down&quot; (always round down)
          </span>
          <span className="text-xs text-muted-foreground">
            Current: ${formatValue(valueDown).toFixed(2)}
          </span>
          <SteppedInput.Root
            value={valueDown}
            onChange={setValueDown}
            min={BigInt(1000)}
            getTickSize={getTickSize}
            formatValue={formatValue}
            parseValue={parseValue}
            snapToTick="down"
            format={{ style: "currency", currency: "USD" }}
          >
            <SteppedInput.Group>
              <SteppedInput.Decrement />
              <SteppedInput.ScrubArea>
                <SteppedInput.ScrubAreaCursor>
                  <CursorGrowIcon />
                </SteppedInput.ScrubAreaCursor>
                <SteppedInput.Input />
              </SteppedInput.ScrubArea>
              <SteppedInput.Increment />
            </SteppedInput.Group>
          </SteppedInput.Root>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            snapToTick=&quot;nearest&quot; (round to nearest)
          </span>
          <span className="text-xs text-muted-foreground">
            Current: ${formatValue(valueNearest).toFixed(2)}
          </span>
          <SteppedInput.Root
            value={valueNearest}
            onChange={setValueNearest}
            min={BigInt(1000)}
            getTickSize={getTickSize}
            formatValue={formatValue}
            parseValue={parseValue}
            snapToTick="nearest"
            format={{ style: "currency", currency: "USD" }}
          >
            <SteppedInput.Group>
              <SteppedInput.Decrement />
              <SteppedInput.ScrubArea>
                <SteppedInput.ScrubAreaCursor>
                  <CursorGrowIcon />
                </SteppedInput.ScrubAreaCursor>
                <SteppedInput.Input />
              </SteppedInput.ScrubArea>
              <SteppedInput.Increment />
            </SteppedInput.Group>
          </SteppedInput.Root>
        </div>
      </div>
    );
  },
};
