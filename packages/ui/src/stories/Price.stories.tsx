import type { Meta, StoryObj } from "@storybook/react";
import { Price } from "@/components/primitives";

const meta: Meta<typeof Price> = {
  title: "Primitives/Price",
  component: Price,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center gap-4 p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Basic: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={12345} decimals={2} />
      <span className="text-xs text-muted-foreground">
        12345 smallest units (2 decimals) → 123.45
      </span>
    </div>
  ),
};

export const WithSymbolSuffix: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={500000000000000000n} decimals={18} maxDecimals={4}>
        <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
      </Price>
      <span className="text-xs text-muted-foreground">0.5 ETH (suffix)</span>
    </div>
  ),
};

export const WithSymbolPrefix: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={12345} decimals={2}>
        <Price.Symbol>$</Price.Symbol>
        <Price.Value />
      </Price>
      <span className="text-xs text-muted-foreground">$123.45 (prefix)</span>
    </div>
  ),
};

export const EthLarge: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={2450000000000000000n} decimals={18} maxDecimals={4}>
        <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
      </Price>
      <span className="text-xs text-muted-foreground">2.45 ETH</span>
    </div>
  ),
};

export const Usdc: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={15000000} decimals={6} maxDecimals={2}>
        <Price.Value /> <Price.Symbol>USDC</Price.Symbol>
      </Price>
      <span className="text-xs text-muted-foreground">15 USDC (6 decimals)</span>
    </div>
  ),
};

export const DecimalOnly: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={1000000} decimals={6} />
      <span className="text-xs text-muted-foreground">No symbol: 1</span>
    </div>
  ),
};

export const FractionalEth: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={420000000000000n} decimals={18} maxDecimals={6}>
        <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
      </Price>
      <span className="text-xs text-muted-foreground">
        0.00042 ETH (very small)
      </span>
    </div>
  ),
};

export const StringInput: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value="9876543210" decimals={9} maxDecimals={4}>
        <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
      </Price>
      <span className="text-xs text-muted-foreground">
        String input: 9.8766 ETH (ceiled)
      </span>
    </div>
  ),
};

export const MaxDecimals: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Price value={123456789n} decimals={9}>
          <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
        </Price>
        <span className="text-xs text-muted-foreground">
          Full precision: 0.123456789 ETH
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <Price value={123456789n} decimals={9} maxDecimals={4}>
          <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
        </Price>
        <span className="text-xs text-muted-foreground">
          maxDecimals=4: 0.1235 ETH (ceiled)
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <Price value={123456789n} decimals={9} maxDecimals={2}>
          <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
        </Price>
        <span className="text-xs text-muted-foreground">
          maxDecimals=2: 0.13 ETH (ceiled)
        </span>
      </div>
    </div>
  ),
};

export const Abbreviation: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Price value={1500000n} decimals={2} abbreviate>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Price>
        <span className="text-xs text-muted-foreground">$15K</span>
      </div>
      <div className="flex flex-col gap-1">
        <Price value={250000000n} decimals={2} abbreviate>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Price>
        <span className="text-xs text-muted-foreground">$2.5M</span>
      </div>
      <div className="flex flex-col gap-1">
        <Price
          value={2500000000000000000000n}
          decimals={18}
          abbreviate
          maxDecimals={1}
        >
          <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
        </Price>
        <span className="text-xs text-muted-foreground">2.5K ETH</span>
      </div>
      <div className="flex flex-col gap-1">
        <Price value={50} decimals={2} abbreviate>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Price>
        <span className="text-xs text-muted-foreground">
          $0.5 (too small to abbreviate)
        </span>
      </div>
    </div>
  ),
};

export const StyledSymbol: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={500000000000000000n} decimals={18} maxDecimals={4}>
        <Price.Value />{" "}
        <Price.Symbol className="text-muted-foreground">ETH</Price.Symbol>
      </Price>
      <span className="text-xs text-muted-foreground">
        Symbol with custom styling
      </span>
    </div>
  ),
};

export const ZeroValue: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={0n} decimals={18}>
        <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
      </Price>
      <span className="text-xs text-muted-foreground">Zero: 0 ETH</span>
    </div>
  ),
};

export const Locales: StoryObj<typeof Price> = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Default (no locale)</span>
        <Price value={123456789n} decimals={2} maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Price>
        <span className="text-xs text-muted-foreground">$1234567.89</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">English (en-US)</span>
        <Price value={123456789n} decimals={2} maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value locale="en-US" />
        </Price>
        <span className="text-xs text-muted-foreground">$1,234,567.89</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">German (de-DE)</span>
        <Price value={123456789n} decimals={2} maxDecimals={2}>
          <Price.Value locale="de-DE" /> <Price.Symbol>EUR</Price.Symbol>
        </Price>
        <span className="text-xs text-muted-foreground">1.234.567,89 EUR</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">French (fr-FR)</span>
        <Price value={123456789n} decimals={2} maxDecimals={2}>
          <Price.Value locale="fr-FR" /> <Price.Symbol>EUR</Price.Symbol>
        </Price>
        <span className="text-xs text-muted-foreground">
          1 234 567,89 EUR (thin space grouping)
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Japanese (ja-JP)</span>
        <Price value={123456789n} decimals={2} maxDecimals={2}>
          <Price.Symbol>¥</Price.Symbol>
          <Price.Value locale="ja-JP" />
        </Price>
        <span className="text-xs text-muted-foreground">¥1,234,567.89</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Swiss German (de-CH)</span>
        <Price value={123456789n} decimals={2} maxDecimals={2}>
          <Price.Symbol>CHF </Price.Symbol>
          <Price.Value locale="de-CH" />
        </Price>
        <span className="text-xs text-muted-foreground">
          CHF 1'234'567.89 (apostrophe grouping)
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Indian (en-IN)</span>
        <Price value={123456789n} decimals={2} maxDecimals={2}>
          <Price.Symbol>₹</Price.Symbol>
          <Price.Value locale="en-IN" />
        </Price>
        <span className="text-xs text-muted-foreground">
          ₹12,34,567.89 (lakh grouping)
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">
          German + Abbreviation (de-DE)
        </span>
        <Price value={250000000n} decimals={2} abbreviate maxDecimals={1}>
          <Price.Value locale="de-DE" /> <Price.Symbol>EUR</Price.Symbol>
        </Price>
        <span className="text-xs text-muted-foreground">2,5M EUR</span>
      </div>
    </div>
  ),
};
