"use client";

import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";
import { cn } from "@/lib/cn";

interface SteppedInputContextValue {
  value: bigint;
  displayValue: number;
  format: Intl.NumberFormatOptions;
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

const defaultFormatOptions: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
};

type SnapToTickMode = "up" | "down" | "nearest";

/**
 * Rounds a value to the tick grid based on the specified mode.
 * @param value - The value to snap
 * @param tickSize - The tick size to snap to
 * @param mode - How to round: 'up' (ceiling), 'down' (floor), or 'nearest'
 * @param min - Optional minimum value (snapped value won't go below this)
 */
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

  // Ensure we don't snap below minimum
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
  formatValue?: (value: bigint) => number;
  parseValue?: (value: number) => bigint;
  disabled?: boolean;
  className?: string;
  format?: Intl.NumberFormatOptions;
  children: React.ReactNode;
  /**
   * Snap values to the tick grid on change.
   * - 'up': Round up to the next tick
   * - 'down': Round down to the previous tick
   * - 'nearest': Round to the nearest tick
   * - false/undefined: No snapping (default)
   */
  snapToTick?: SnapToTickMode | false;
}

function Root({
  value,
  onChange,
  min,
  max,
  getTickSize,
  formatValue: formatValueFn = (v) => Number(v),
  parseValue: parseValueFn = (v) => BigInt(Math.round(v)),
  disabled = false,
  className,
  format = defaultFormatOptions,
  children,
  snapToTick = false,
}: RootProps): React.ReactElement {
  const displayValue = formatValueFn(value);
  const step = formatValueFn(getTickSize(value));

  const handleValueChange = React.useCallback(
    (val: number | null) => {
      if (val === null || val === undefined) return;

      let newValue = parseValueFn(val);

      // Clamp to min first (before snapping)
      if (min !== undefined && newValue < min) {
        newValue = min;
      }

      // Clamp to max
      if (max !== undefined && newValue > max) {
        newValue = max;
      }

      // Apply tick snapping if enabled
      // Use the tick size from the CURRENT value (before the change) to avoid
      // snapping issues when crossing thresholds
      if (snapToTick) {
        const tickSize = getTickSize(value);
        newValue = snapValueToTick(newValue, tickSize, snapToTick, min);
      }

      onChange(newValue);
    },
    [parseValueFn, snapToTick, getTickSize, min, max, onChange, value],
  );

  const contextValue: SteppedInputContextValue = React.useMemo(
    () => ({
      value,
      displayValue,
      format,
      disabled,
    }),
    [value, displayValue, format, disabled],
  );

  return (
    <SteppedInputContext.Provider value={contextValue}>
      <NumberField.Root
        value={displayValue}
        onValueChange={handleValueChange}
        min={min !== undefined ? formatValueFn(min) : -Infinity}
        max={max !== undefined ? formatValueFn(max) : Infinity}
        step={step}
        format={format}
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
        "flex size-10 items-center justify-center rounded-l-md border",
        "border-r-0 border-input bg-muted text-foreground select-none",
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
        "flex size-10 items-center justify-center rounded-r-md border",
        "border-l-0 border-input bg-muted text-foreground select-none",
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
      readOnly
      className={cn(
        "h-10 w-auto grow cursor-default border border-input px-4",
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
    displayValue: number;
  }) => React.ReactNode;
  className?: string;
}

function Value({ children, className }: ValueProps): React.ReactElement {
  const { value, displayValue } = useSteppedInput();
  return (
    <div
      className={cn(
        "relative flex h-10 grow items-center border border-input",
        "px-4",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-inset",
        className,
      )}
    >
      <NumberField.Input readOnly className="sr-only" />
      <div className="w-full text-center text-2 text-foreground tabular-nums">
        {children({ value, displayValue })}
      </div>
    </div>
  );
}

export function CursorGrowIcon(
  props: React.ComponentProps<"svg">,
): React.ReactElement {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Drag to adjust</title>
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
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
