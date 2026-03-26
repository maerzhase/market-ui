import type { Meta, StoryObj } from "@storybook/react";
import { Price, Receipt } from "@/components/primitives";

const meta: Meta<typeof Receipt> = {
  title: "Primitives/Receipt",
  component: Receipt,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center gap-4 p-8 tabular-nums">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Basic: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={2}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>
          <span className="text-xl font-semibold">Order Summary</span>
        </Receipt.Header>
        <Receipt.Item label="Item 1" value={1511n} />
        <Receipt.Item label="Item 2" value={2000n} />
        <Receipt.Item label="Item 3" value={500n} />
        <Receipt.Subtotal />
        <Receipt.Tax rate={0.1} />
        <Receipt.Separator />
        <Receipt.Total />
      </Receipt>
    </div>
  ),
};

export const WithSubtotal: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={6}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>
          <span className="text-xl font-semibold">Order Summary</span>
        </Receipt.Header>
        <Receipt.Item label="Item 1" value={1500000n} />
        <Receipt.Item label="Item 2" value={2000000n} />
        <Receipt.Item label="Item 3" value={500000n} />
        <Receipt.Separator />
        <Receipt.Subtotal />
        <Receipt.Total />
      </Receipt>
    </div>
  ),
};

export const WithDiscount: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={6}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>
          <span className="text-xl font-semibold">Order Summary</span>
        </Receipt.Header>
        <Receipt.Item label="Item 1" value={1500000n} />
        <Receipt.Item label="Item 2" value={2000000n} />
        <Receipt.Separator />
        <Receipt.Subtotal />
        <Receipt.Discount label="Promo Code" value={500000n} />
        <Receipt.Total />
      </Receipt>
    </div>
  ),
};

export const WithTax: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={2}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>
          <span className="text-xl font-semibold">Receipt</span>
        </Receipt.Header>
        <Receipt.Item label="Subtotal" value={4000} />
        <Receipt.Tax rate={0.08} />
        <Receipt.Total />
      </Receipt>
    </div>
  ),
};

export const WithFee: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={6}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>
          <span className="text-xl font-semibold">Order Summary</span>
        </Receipt.Header>
        <Receipt.Item label="Item 1" value={1500000n} />
        <Receipt.Item label="Item 2" value={2000000n} />
        <Receipt.Separator />
        <Receipt.Subtotal />
        <Receipt.Fee label="Shipping" value={200000n} />
        <Receipt.Total />
      </Receipt>
    </div>
  ),
};

export const FullReceipt: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={6}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header className="flex items-baseline justify-between">
          <span className="text-xl font-semibold">Order #12345</span>
          <span className="text-xs leading-[18px] text-muted-foreground">
            March 16, 2026
          </span>
        </Receipt.Header>
        <Receipt.Item label="Product A" value={2500000n} />
        <Receipt.Item label="Product B" value={1800000n} />
        <Receipt.Item label="Product C" value={700000n} />
        <Receipt.Separator />
        <Receipt.Subtotal />
        <Receipt.Discount label="Member Discount" value={500000n} />
        <Receipt.Fee label="Shipping" value={200000n} />
        <Receipt.Tax rate={0.08} />
        <Receipt.Separator />
        <Receipt.Total />
        <Receipt.Footer>
          <span className="text-center text-xs text-muted-foreground">
            Thank you for your order!
          </span>
        </Receipt.Footer>
      </Receipt>
    </div>
  ),
};

export const ManualTotals: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={2}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>
          <span className="text-xl font-semibold">Invoice</span>
        </Receipt.Header>
        <Receipt.Item label="Consulting" value={500000} />
        <Receipt.Item label="Development" value={750000} />
        <Receipt.Separator />
        <Receipt.Subtotal value={1250000} />
        <Receipt.Total value={1500000} label="Amount Due" />
      </Receipt>
    </div>
  ),
};

export const EthReceipt: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={18}>
        <Receipt.Price maxDecimals={4}>
          <Price.Value /> <Price.Symbol>ETH</Price.Symbol>
        </Receipt.Price>
        <Receipt.Header>
          <span className="text-xl font-semibold">NFT Purchase</span>
        </Receipt.Header>
        <Receipt.Item label="Base Price" value={500000000000000000n} />
        <Receipt.Item label="Royalty" value={25000000000000000n} />
        <Receipt.Separator />
        <Receipt.Total />
      </Receipt>
    </div>
  ),
};

export const PerItemOverride: StoryObj<typeof Receipt> = {
  render: () => (
    <div className="bg-surface w-80 rounded-lg border border-border p-4">
      <Receipt decimals={6}>
        <Receipt.Price maxDecimals={2}>
          <Price.Symbol>$</Price.Symbol>
          <Price.Value />
        </Receipt.Price>
        <Receipt.Header>
          <span className="text-xl font-semibold">Mixed Override</span>
        </Receipt.Header>
        <Receipt.Item label="Normal item" value={1500000n} />
        <Receipt.Item label="High precision" value={1234567n} maxDecimals={6} />
        <Receipt.Separator />
        <Receipt.Total />
      </Receipt>
    </div>
  ),
};
