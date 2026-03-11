import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { CursorGrowIcon, SteppedInput } from "@/components/primitives/SteppedInput"

const meta: Meta<typeof SteppedInput.Root> = {
  title: "Trading UI/SteppedInput",
  component: SteppedInput.Root,
  parameters: {
    layout: "centered",
  },
  decorators: [
    Story => (
      <div className="flex flex-col items-center gap-4 rounded-lg p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Basic: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(100))
    const getTickSize = () => BigInt(10)

    return (
      <SteppedInput.Root value={value} onChange={setValue} getTickSize={getTickSize}>
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
    )
  },
}

export const WithMinMax: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(50))
    const getTickSize = () => BigInt(5)

    return (
      <div className="flex flex-col gap-2">
        <span className="text-1 text-text-tertiary">Min 0, Max 100</span>
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
    )
  },
}

export const DynamicStepSize: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(1000))
    const getTickSize = (currentValue: bigint) => {
      if (currentValue < BigInt(100)) return BigInt(1)
      if (currentValue < BigInt(1000)) return BigInt(10)
      return BigInt(100)
    }

    return (
      <SteppedInput.Root value={value} onChange={setValue} getTickSize={getTickSize}>
        <div className="flex flex-col gap-2">
          <span className="text-1 text-text-tertiary">
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
    )
  },
}

export const Disabled: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(500))
    const getTickSize = () => BigInt(50)

    return (
      <SteppedInput.Root value={value} onChange={setValue} getTickSize={getTickSize} disabled>
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
    )
  },
}

const WEI_PER_ETH = BigInt(10 ** 18)

export const EthereumPrice: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(245) * WEI_PER_ETH / BigInt(10))
    const getTickSize = () => WEI_PER_ETH / BigInt(100)

    return (
      <div className="flex flex-col gap-2">
        <span className="text-1 text-text-tertiary">ETH Amount (in wei)</span>
        <SteppedInput.Root
          value={value}
          onChange={setValue}
          min={WEI_PER_ETH / BigInt(10)}
          max={WEI_PER_ETH * BigInt(100)}
          getTickSize={getTickSize}
          formatValue={v => Number(v) / Number(WEI_PER_ETH)}
          parseValue={v => BigInt(Math.round(v * Number(WEI_PER_ETH)))}
          format={{ style: "currency", currency: "ETH", minimumFractionDigits: 4, maximumFractionDigits: 4 }}
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
    )
  },
}

export const CustomValueDisplay: StoryObj<typeof SteppedInput.Root> = {
  render: () => {
    const [value, setValue] = React.useState(BigInt(150) * WEI_PER_ETH / BigInt(10))
    const getTickSize = () => WEI_PER_ETH / BigInt(100)

    return (
      <SteppedInput.Root
        value={value}
        onChange={setValue}
        min={WEI_PER_ETH / BigInt(10)}
        max={WEI_PER_ETH * BigInt(100)}
        getTickSize={getTickSize}
        formatValue={v => Number(v) / Number(WEI_PER_ETH)}
        parseValue={v => BigInt(Math.round(v * Number(WEI_PER_ETH)))}
        format={{ style: "decimal", minimumFractionDigits: 4, maximumFractionDigits: 4 }}
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
    )
  },
}
