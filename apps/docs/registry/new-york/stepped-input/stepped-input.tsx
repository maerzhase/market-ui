"use client";

import { NumberField } from "@base-ui/react/number-field";
import { IconArrowsHorizontal } from "@tabler/icons-react";
import * as React from "react";
import { cn } from "@/lib/cn";

interface SteppedInputContextValue {
  value: bigint;
  inputValue: number;
  step: number;
  disabled: boolean;
}

const SteppedInputContext =
  React.createContext<SteppedInputContextValue | null>(null);

function useSteppedInput(): SteppedInputContextValue {
  const context = React.useContext(SteppedInputContext);
  if (!context) {
    throw new Error("useSteppedInput must be used within SteppedInput.Root");
  }
  return context;
}

type SnapToTickMode = "up" | "down" | "nearest";

function getScale(decimals: number): number {
  return 10 ** decimals;
}

function toInputValue(value: bigint, decimals: number): number {
  return Number(value) / getScale(decimals);
}

function fromInputValue(value: number, decimals: number): bigint {
  return BigInt(Math.round(value * getScale(decimals)));
}

function snapValueToTick(
  value: bigint,
  tickSize: bigint,
  mode: SnapToTickMode,
  min?: bigint,
): bigint {
  if (tickSize <= 0n) return value;

  const remainder = value % tickSize;
  if (remainder === 0n) return value;

  let snapped: bigint;
  switch (mode) {
    case "up":
      snapped = value - remainder + tickSize;
      break;
    case "down":
      snapped = value - remainder;
      break;
    case "nearest":
      snapped =
        remainder * 2n >= tickSize
          ? value - remainder + tickSize
          : value - remainder;
      break;
  }

  if (min !== undefined && snapped < min) {
    snapped = min;
  }

  return snapped;
}

interface RootProps {
  value: bigint;
  onChange: (value: bigint) => void;
  min?: bigint;
  max?: bigint;
  getTickSize: (currentValue: bigint) => bigint;
  decimals?: number;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  snapToTick?: SnapToTickMode | false;
}

function Root({
  value,
  onChange,
  min,
  max,
  getTickSize,
  decimals = 0,
  disabled = false,
  className,
  children,
  snapToTick = false,
}: RootProps): React.ReactElement {
  const inputValue = toInputValue(value, decimals);
  const step = toInputValue(getTickSize(value), decimals);

  const handleValueChange = React.useCallback(
    (val: number | null) => {
      if (val === null || val === undefined) return;

      let newValue = fromInputValue(val, decimals);

      if (min !== undefined && newValue < min) {
        newValue = min;
      }

      if (max !== undefined && newValue > max) {
        newValue = max;
      }

      if (snapToTick) {
        const tickSize = getTickSize(value);
        newValue = snapValueToTick(newValue, tickSize, snapToTick, min);
      }

      onChange(newValue);
    },
    [decimals, snapToTick, getTickSize, min, max, onChange, value],
  );

  const contextValue: SteppedInputContextValue = React.useMemo(
    () => ({
      value,
      inputValue,
      step,
      disabled,
    }),
    [value, inputValue, step, disabled],
  );

  return (
    <SteppedInputContext.Provider value={contextValue}>
      <NumberField.Root
        value={inputValue}
        onValueChange={handleValueChange}
        min={min !== undefined ? toInputValue(min, decimals) : -Infinity}
        max={max !== undefined ? toInputValue(max, decimals) : Infinity}
        step={step}
        className={cn("w-full", className)}
        disabled={disabled}
      >
        {children}
      </NumberField.Root>
    </SteppedInputContext.Provider>
  );
}

interface GroupProps {
  children: React.ReactNode;
  className?: string;
}

function Group({ children, className }: GroupProps): React.ReactElement {
  return (
    <NumberField.Group className={cn("flex", className)}>
      {children}
    </NumberField.Group>
  );
}

interface DecrementProps {
  className?: string;
  children?: React.ReactNode;
}

function Decrement({
  className,
  children,
}: DecrementProps): React.ReactElement {
  return (
    <NumberField.Decrement
      className={cn(
        "flex size-10 items-center justify-center rounded-l-md border-y border-l",
        "border-input bg-muted text-foreground select-none",
        "hover:bg-accent-hover",
        "active:bg-accent-active",
        "disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled-foreground",
        className,
      )}
    >
      {children ?? "-"}
    </NumberField.Decrement>
  );
}

interface IncrementProps {
  className?: string;
  children?: React.ReactNode;
}

function Increment({
  className,
  children,
}: IncrementProps): React.ReactElement {
  return (
    <NumberField.Increment
      className={cn(
        "flex size-10 items-center justify-center rounded-r-md border-y border-r",
        "border-input bg-muted text-foreground select-none",
        "hover:bg-accent-hover",
        "active:bg-accent-active",
        "disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled-foreground",
        className,
      )}
    >
      {children ?? "+"}
    </NumberField.Increment>
  );
}

interface ScrubAreaProps {
  children: React.ReactNode;
  className?: string;
}

function ScrubArea({
  children,
  className,
}: ScrubAreaProps): React.ReactElement {
  return (
    <NumberField.ScrubArea
      className={cn(
        "relative flex w-full items-center",
        "disabled:cursor-not-allowed",
        className,
      )}
    >
      {children}
    </NumberField.ScrubArea>
  );
}

interface InputProps {
  className?: string;
}

function Input({ className }: InputProps): React.ReactElement {
  return (
    <NumberField.Input
      className={cn(
        "h-10 w-auto grow border border-input bg-background px-4",
        "text-center text-2 text-foreground tabular-nums",
        "focus:ring-2 focus:ring-ring focus:outline-none focus:ring-inset",
        "disabled:cursor-not-allowed disabled:border-disabled disabled:text-disabled-foreground",
        className,
      )}
    />
  );
}

interface ValueProps {
  children: (context: {
    value: bigint;
    inputValue: number;
    step: number;
    disabled: boolean;
  }) => React.ReactNode;
  className?: string;
}

function Value({ children, className }: ValueProps): React.ReactElement {
  const { value, inputValue, step, disabled } = useSteppedInput();
  return (
    <div
      className={cn(
        "relative flex h-10 grow items-center border border-input bg-background",
        "px-4",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-inset",
        className,
      )}
    >
      <NumberField.Input readOnly className="sr-only" />
      <div className="w-full text-center text-2 text-foreground tabular-nums">
        {children({ value, inputValue, step, disabled })}
      </div>
    </div>
  );
}

export function CursorGrowIcon(
  props: React.ComponentProps<"svg">,
): React.ReactElement {
  return <IconArrowsHorizontal aria-label="Drag to adjust" {...props} />;
}

interface SteppedInputComponent {
  Root: typeof Root;
  Group: typeof Group;
  Decrement: typeof Decrement;
  Increment: typeof Increment;
  ScrubArea: typeof ScrubArea;
  ScrubAreaCursor: typeof NumberField.ScrubAreaCursor;
  Input: typeof Input;
  Value: typeof Value;
}

const SteppedInput = {
  Root,
  Group,
  Decrement,
  Increment,
  ScrubArea,
  ScrubAreaCursor: NumberField.ScrubAreaCursor,
  Input,
  Value,
} as SteppedInputComponent;

export { SteppedInput };
