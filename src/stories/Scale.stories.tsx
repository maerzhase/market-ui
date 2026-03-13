import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "@/components/primitives/Button";
import { Scale } from "@/components/primitives/Scale";
import { Text } from "@/components/primitives/Text";

const meta: Meta<typeof Scale.Linear> = {
  title: "Trading UI/Scale",
  component: Scale.Linear,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-background p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatDollars = (cents: bigint) => {
  const dollars = Number(cents) / 100;
  return dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const formatEth = (wei: bigint) => {
  const eth = Number(wei) / 1e18;
  return `${eth.toFixed(4)} ETH`;
};

const formatPercent = (value: number) => `${value.toFixed(0)}%`;

// ─── Stories ────────────────────────────────────────────────────────────────

export const BasicBigInt: StoryObj<typeof Scale.Linear> = {
  render: () => {
    const [selected, setSelected] = React.useState<bigint | null>(null);

    return (
      <div className="w-80">
        <Text size="2" color="secondary" className="mb-4">
          BigInt scale: $100 - $500, tick size: $10
        </Text>
        <Scale.Linear
          domain={[10000n, 50000n]} // $100 - $500 in cents
          getTickSize={() => 1000n} // $10 in cents
          className="flex gap-2"
        >
          <Scale.Tick position={0}>
            {({ value }) => {
              const v = value as bigint;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="flex-1"
                >
                  {formatDollars(v)}
                </Button>
              );
            }}
          </Scale.Tick>
          <Scale.Tick position={0.5}>
            {({ value }) => {
              const v = value as bigint;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="flex-1"
                >
                  {formatDollars(v)}
                </Button>
              );
            }}
          </Scale.Tick>
          <Scale.Tick position={1}>
            {({ value }) => {
              const v = value as bigint;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="flex-1"
                >
                  {formatDollars(v)}
                </Button>
              );
            }}
          </Scale.Tick>
        </Scale.Linear>
        {selected && (
          <Text size="1" color="tertiary" className="mt-2">
            Selected: {formatDollars(selected)}
          </Text>
        )}
      </div>
    );
  },
};

export const BasicNumber: StoryObj<typeof Scale.Linear> = {
  render: () => {
    const [selected, setSelected] = React.useState<number | null>(null);

    return (
      <div className="w-80">
        <Text size="2" color="secondary" className="mb-4">
          Number scale: 0% - 100%, tick size: 10%
        </Text>
        <Scale.Linear
          domain={[0, 100]}
          getTickSize={() => 10}
          className="flex gap-2"
        >
          <Scale.Tick position={0}>
            {({ value }) => {
              const v = value as number;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="flex-1"
                >
                  {formatPercent(v)}
                </Button>
              );
            }}
          </Scale.Tick>
          <Scale.Tick position={0.5}>
            {({ value }) => {
              const v = value as number;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="flex-1"
                >
                  {formatPercent(v)}
                </Button>
              );
            }}
          </Scale.Tick>
          <Scale.Tick position={1}>
            {({ value }) => {
              const v = value as number;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="flex-1"
                >
                  {formatPercent(v)}
                </Button>
              );
            }}
          </Scale.Tick>
        </Scale.Linear>
        {selected !== null && (
          <Text size="1" color="tertiary" className="mt-2">
            Selected: {formatPercent(selected)}
          </Text>
        )}
      </div>
    );
  },
};

export const UsingTicksHelper: StoryObj<typeof Scale.Linear> = {
  render: () => {
    const [selected, setSelected] = React.useState<bigint | null>(null);

    return (
      <div className="w-80">
        <Text size="2" color="secondary" className="mb-4">
          Using Scale.Ticks to generate 4 evenly-spaced options
        </Text>
        <Scale.Linear
          domain={[10000n, 50000n]}
          getTickSize={() => 1000n}
          className="flex gap-2"
        >
          <Scale.Ticks count={4}>
            {({ value }) => {
              const v = value as bigint;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="flex-1"
                >
                  {formatDollars(v)}
                </Button>
              );
            }}
          </Scale.Ticks>
        </Scale.Linear>
        {selected && (
          <Text size="1" color="tertiary" className="mt-2">
            Selected: {formatDollars(selected)}
          </Text>
        )}
      </div>
    );
  },
};

export const DynamicTickSize: StoryObj<typeof Scale.Linear> = {
  render: () => {
    const [selected, setSelected] = React.useState<bigint | null>(null);

    // Tick size changes at $1000: $10 below, $100 above
    const getTickSize = (value: bigint) => {
      return value > 100000n ? 10000n : 1000n; // $100 vs $10 in cents
    };

    return (
      <div className="w-96">
        <Text size="2" color="secondary" className="mb-2">
          Dynamic tick size: $10 below $1,000, $100 above
        </Text>
        <Text size="1" color="tertiary" className="mb-4">
          Scale: $100 - $2,000
        </Text>
        <Scale.Linear
          domain={[10000n, 200000n]} // $100 - $2000
          getTickSize={getTickSize}
          className="flex flex-wrap gap-2"
        >
          <Scale.Ticks count={5}>
            {({ value, position }) => {
              const v = value as bigint;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  size="sm"
                >
                  <div className="flex flex-col items-center">
                    <span>{formatDollars(v)}</span>
                    <span className="text-xs opacity-60">
                      {(position * 100).toFixed(0)}%
                    </span>
                  </div>
                </Button>
              );
            }}
          </Scale.Ticks>
        </Scale.Linear>
        {selected && (
          <Text size="1" color="tertiary" className="mt-2">
            Selected: {formatDollars(selected)}
          </Text>
        )}
      </div>
    );
  },
};

export const SnapModes: StoryObj<typeof Scale.Linear> = {
  render: () => {
    // Show how different snap modes affect the values
    // With min=100, max=195, tick=10, position=0.5 → raw value = 147.5
    // - nearest: 150
    // - up: 150
    // - down: 140

    return (
      <div className="w-96 space-y-6">
        <Text size="2" color="secondary">
          Scale: $100 - $195 (odd range), tick: $10, position: 0.5
        </Text>
        <Text size="1" color="tertiary">
          Raw interpolated value would be $147.50
        </Text>

        <div>
          <Text size="1" weight="medium" className="mb-2">
            snapMode=&quot;nearest&quot; (default) → rounds to $150
          </Text>
          <Scale.Linear
            domain={[10000n, 19500n]}
            getTickSize={() => 1000n}
            snapMode="nearest"
            className="flex gap-2"
          >
            <Scale.Tick position={0.5}>
              {({ value }) => (
                <Button color="tertiary">
                  {formatDollars(value as bigint)}
                </Button>
              )}
            </Scale.Tick>
          </Scale.Linear>
        </div>

        <div>
          <Text size="1" weight="medium" className="mb-2">
            snapMode=&quot;up&quot; → rounds up to $150
          </Text>
          <Scale.Linear
            domain={[10000n, 19500n]}
            getTickSize={() => 1000n}
            snapMode="up"
            className="flex gap-2"
          >
            <Scale.Tick position={0.5}>
              {({ value }) => (
                <Button color="tertiary">
                  {formatDollars(value as bigint)}
                </Button>
              )}
            </Scale.Tick>
          </Scale.Linear>
        </div>

        <div>
          <Text size="1" weight="medium" className="mb-2">
            snapMode=&quot;down&quot; → rounds down to $140
          </Text>
          <Scale.Linear
            domain={[10000n, 19500n]}
            getTickSize={() => 1000n}
            snapMode="down"
            className="flex gap-2"
          >
            <Scale.Tick position={0.5}>
              {({ value }) => (
                <Button color="tertiary">
                  {formatDollars(value as bigint)}
                </Button>
              )}
            </Scale.Tick>
          </Scale.Linear>
        </div>

        <div>
          <Text size="1" weight="medium" className="mb-2">
            snapMode=false → no snapping, $147
          </Text>
          <Scale.Linear
            domain={[10000n, 19500n]}
            getTickSize={() => 1000n}
            snapMode={false}
            className="flex gap-2"
          >
            <Scale.Tick position={0.5}>
              {({ value }) => (
                <Button color="tertiary">
                  {formatDollars(value as bigint)}
                </Button>
              )}
            </Scale.Tick>
          </Scale.Linear>
        </div>
      </div>
    );
  },
};

export const EthereumBidSuggestions: StoryObj<typeof Scale.Linear> = {
  render: () => {
    const [selected, setSelected] = React.useState<bigint | null>(null);
    const WEI_PER_ETH = BigInt(10 ** 18);

    // Min: 0.01 ETH, Max: 1 ETH
    const min = WEI_PER_ETH / 100n;
    const max = WEI_PER_ETH;

    // Tick: 0.01 ETH below 0.1 ETH, 0.1 ETH above
    const getTickSize = (value: bigint) => {
      return value > WEI_PER_ETH / 10n
        ? WEI_PER_ETH / 10n // 0.1 ETH
        : WEI_PER_ETH / 100n; // 0.01 ETH
    };

    return (
      <div className="w-96">
        <Text size="3" weight="medium" className="mb-2">
          ETH Bid Suggestions
        </Text>
        <Text size="2" color="secondary" className="mb-4">
          Reserve: 0.01 ETH, Max suggestion: 1 ETH
        </Text>
        <Scale.Linear
          domain={[min, max]}
          getTickSize={getTickSize}
          snapMode="up"
          className="flex flex-col gap-2"
        >
          <Scale.Ticks count={4}>
            {({ value, position }) => {
              const v = value as bigint;
              return (
                <Button
                  color={selected === v ? "primary" : "secondary"}
                  onClick={() => setSelected(v)}
                  className="w-full justify-between"
                >
                  <span className="font-mono">{formatEth(v)}</span>
                  <span className="text-xs opacity-60">
                    {(position * 100).toFixed(0)}% of range
                  </span>
                </Button>
              );
            }}
          </Scale.Ticks>
        </Scale.Linear>
        {selected && (
          <div className="mt-4 rounded-md border border-border p-3">
            <Text size="1" color="tertiary">
              Selected bid:
            </Text>
            <Text size="3" weight="medium" className="font-mono">
              {formatEth(selected)}
            </Text>
          </div>
        )}
      </div>
    );
  },
};

export const WithExternalRankCalculation: StoryObj<typeof Scale.Linear> = {
  render: () => {
    const [selected, setSelected] = React.useState<bigint | null>(null);

    // Mock rank calculation - higher bid = better rank
    // This shows how to combine Scale with external rank logic
    const getRank = (value: bigint) => {
      const cents = Number(value);
      // Simulate: $500 = rank 1, $100 = rank 20
      const rank = Math.max(1, Math.round(21 - (cents / 10000) * 4));
      return {
        rank,
        isWinning: rank <= 10, // Top 10 are winners
      };
    };

    return (
      <div className="w-96">
        <Text size="2" color="secondary" className="mb-4">
          Scale + external rank calculation (10 winning spots)
        </Text>
        <Scale.Linear
          domain={[10000n, 50000n]}
          getTickSize={() => 1000n}
          className="flex flex-col gap-2"
        >
          <Scale.Ticks count={4}>
            {({ value }) => {
              const v = value as bigint;
              const { rank, isWinning } = getRank(v);
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="w-full justify-between"
                >
                  <span>{formatDollars(v)}</span>
                  <span
                    className={isWinning ? "text-success" : "text-destructive"}
                  >
                    Rank #{rank} {isWinning ? "(winning)" : "(outbid)"}
                  </span>
                </Button>
              );
            }}
          </Scale.Ticks>
        </Scale.Linear>
      </div>
    );
  },
};

export const CustomCardStyling: StoryObj<typeof Scale.Linear> = {
  render: () => {
    const [selected, setSelected] = React.useState<bigint | null>(null);

    return (
      <div className="w-80">
        <Text size="2" color="secondary" className="mb-4">
          Custom card-style rendering
        </Text>
        <Scale.Linear
          domain={[10000n, 50000n]}
          getTickSize={() => 5000n}
          className="grid grid-cols-3 gap-3"
        >
          <Scale.Ticks count={3}>
            {({ value, position }) => {
              const v = value as bigint;
              return (
                <button
                  type="button"
                  onClick={() => setSelected(v)}
                  className={`rounded-lg border-2 p-3 text-center transition-colors ${
                    selected === v
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-muted hover:border-foreground/50"
                  }`}
                >
                  <div className="text-lg font-semibold">
                    {formatDollars(v)}
                  </div>
                  <div
                    className={`mt-1 text-xs ${
                      selected === v ? "opacity-80" : "text-muted-foreground"
                    }`}
                  >
                    {(position * 100).toFixed(0)}%
                  </div>
                </button>
              );
            }}
          </Scale.Ticks>
        </Scale.Linear>
      </div>
    );
  },
};

export const TemperatureScale: StoryObj<typeof Scale.Linear> = {
  render: () => {
    const [selected, setSelected] = React.useState<number | null>(null);

    return (
      <div className="w-80">
        <Text size="2" color="secondary" className="mb-4">
          Number scale: Temperature 0°C - 40°C
        </Text>
        <Scale.Linear
          domain={[0, 40]}
          getTickSize={() => 5}
          className="flex gap-2"
        >
          <Scale.Ticks count={5}>
            {({ value }) => {
              const v = value as number;
              const isCold = v < 15;
              const isHot = v > 30;
              return (
                <Button
                  color={selected === v ? "primary" : "tertiary"}
                  onClick={() => setSelected(v)}
                  className="flex-1"
                >
                  <span
                    className={
                      isCold ? "text-blue-400" : isHot ? "text-red-400" : ""
                    }
                  >
                    {v}°C
                  </span>
                </Button>
              );
            }}
          </Scale.Ticks>
        </Scale.Linear>
        {selected !== null && (
          <Text size="1" color="tertiary" className="mt-2">
            Selected: {selected}°C
          </Text>
        )}
      </div>
    );
  },
};
