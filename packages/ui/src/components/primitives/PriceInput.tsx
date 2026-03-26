"use client";

import type * as React from "react";
import { SteppedInput } from "./SteppedInput";

interface PriceInputRootProps {
  value: bigint;
  onChange: (value: bigint) => void;
  min?: bigint;
  max?: bigint;
  getTickSize: (currentValue: bigint) => bigint;
  decimals?: number;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  snapToTick?: "up" | "down" | "nearest" | false;
}

function Root({
  decimals = 2,
  ...props
}: PriceInputRootProps): React.ReactElement {
  return <SteppedInput.Root {...props} decimals={decimals} />;
}

interface PriceInputComponent {
  Root: typeof Root;
  Group: typeof SteppedInput.Group;
  Decrement: typeof SteppedInput.Decrement;
  Increment: typeof SteppedInput.Increment;
  ScrubArea: typeof SteppedInput.ScrubArea;
  ScrubAreaCursor: typeof SteppedInput.ScrubAreaCursor;
  Input: typeof SteppedInput.Input;
  Value: typeof SteppedInput.Value;
}

const PriceInput = {
  Root,
  Group: SteppedInput.Group,
  Decrement: SteppedInput.Decrement,
  Increment: SteppedInput.Increment,
  ScrubArea: SteppedInput.ScrubArea,
  ScrubAreaCursor: SteppedInput.ScrubAreaCursor,
  Input: SteppedInput.Input,
  Value: SteppedInput.Value,
} as PriceInputComponent;

export { PriceInput };
