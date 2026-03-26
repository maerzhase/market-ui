"use client";

import * as React from "react";
import { Price, PriceInput } from "@m3000/market";

export function SteppedInputCustomValueExample() {
  const [value, setValue] = React.useState(1825000000000000000n);

  return (
    <div className="w-full max-w-sm">
      <PriceInput.Root
        value={value}
        onChange={setValue}
        min={1500000000000000000n}
        max={2500000000000000000n}
        getTickSize={() => 25000000000000000n}
        decimals={18}
      >
        <PriceInput.Group>
          <PriceInput.Decrement />
          <PriceInput.ScrubArea>
            <PriceInput.Value>
              {({ value: currentValue }) => (
                <Price
                  value={currentValue}
                  decimals={18}
                  minDecimals={4}
                  maxDecimals={4}
                  className="inline-flex items-baseline gap-1"
                >
                  <Price.Value className="font-medium" locale="en-US" />
                  <Price.Symbol className="text-sm text-muted-foreground">
                    ETH
                  </Price.Symbol>
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
