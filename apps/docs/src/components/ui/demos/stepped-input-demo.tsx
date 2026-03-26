"use client";

import * as React from "react";
import { Price, PriceInput } from "@m3000/market";

export function SteppedInputDemo() {
  const [value, setValue] = React.useState(125000n);

  return (
    <div className="w-full max-w-sm">
      <PriceInput.Root
        value={value}
        onChange={setValue}
        min={100000n}
        max={250000n}
        getTickSize={(currentValue) => (currentValue < 150000n ? 2500n : 5000n)}
        snapToTick="nearest"
      >
        <PriceInput.Group>
          <PriceInput.Decrement />
          <PriceInput.ScrubArea>
            <PriceInput.Value>
              {({ value: currentValue }) => (
                <Price
                  value={currentValue}
                  decimals={2}
                  maxDecimals={2}
                  className="inline-flex items-baseline gap-1"
                >
                  <Price.Symbol className="text-sm text-muted-foreground">
                    $
                  </Price.Symbol>
                  <Price.Value className="font-medium" locale="en-US" />
                </Price>
              )}
            </PriceInput.Value>
          </PriceInput.ScrubArea>
          <PriceInput.Increment />
        </PriceInput.Group>
      </PriceInput.Root>
    </div>
  );
}
