"use client";

import * as React from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type ScaleValue = number | bigint;
type SnapMode = "up" | "down" | "nearest";

interface ScaleContextValue<T extends ScaleValue> {
  domain: [T, T];
  getTickSize: (value: T) => T;
  snapMode: SnapMode | false;
  getValueAtPosition: (position: number) => T;
}

interface TickContext<T extends ScaleValue> {
  /** The position on the scale (0-1) */
  position: number;
  /** The calculated value at this position (snapped to tick grid) */
  value: T;
}

// ─── Context ────────────────────────────────────────────────────────────────

// We use `unknown` for the context and cast at usage sites to support generics
// This is a common pattern when React Context needs to work with generic types
interface ScaleContextValueInternal {
  domain: [ScaleValue, ScaleValue];
  getTickSize: (value: ScaleValue) => ScaleValue;
  snapMode: SnapMode | false;
  getValueAtPosition: (position: number) => ScaleValue;
}

const ScaleContext = React.createContext<ScaleContextValueInternal | null>(
  null,
);

function useScale<T extends ScaleValue>(): ScaleContextValue<T> {
  const context = React.useContext(ScaleContext);
  if (!context) {
    throw new Error("useScale must be used within Scale.Linear");
  }
  // Cast is safe because we know the provider was created with the correct type
  return context as unknown as ScaleContextValue<T>;
}

// ─── Utilities ──────────────────────────────────────────────────────────────

/**
 * Type guard to check if a value is bigint
 */
function isBigInt(value: ScaleValue): value is bigint {
  return typeof value === "bigint";
}

/**
 * Linearly interpolate between min and max based on position (0-1).
 * Works with both number and bigint.
 */
function interpolate<T extends ScaleValue>(
  min: T,
  max: T,
  position: number,
): T {
  // Clamp position to [0, 1]
  const clampedPosition = Math.max(0, Math.min(1, position));

  if (isBigInt(min) && isBigInt(max)) {
    const range = max - min;
    // Use high precision for bigint calculation
    const scaledPosition = BigInt(Math.round(clampedPosition * 1_000_000));
    return (min + (range * scaledPosition) / 1_000_000n) as T;
  }

  // Number math
  const numMin = min as number;
  const numMax = max as number;
  return (numMin + (numMax - numMin) * clampedPosition) as T;
}

/**
 * Snaps a value to the tick grid based on the specified mode.
 * Works with both number and bigint.
 */
function snapToTick<T extends ScaleValue>(
  value: T,
  tickSize: T,
  mode: SnapMode,
  min?: T,
): T {
  if (isBigInt(value) && isBigInt(tickSize)) {
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
    if (min !== undefined && isBigInt(min) && snapped < min) {
      snapped = min;
    }

    return snapped as T;
  }

  // Number math
  const numValue = value as number;
  const numTickSize = tickSize as number;
  const numMin = min as number | undefined;

  if (numTickSize <= 0) return value;

  const remainder = numValue % numTickSize;
  if (Math.abs(remainder) < Number.EPSILON) return value;

  let snapped: number;
  switch (mode) {
    case "up":
      snapped = numValue - remainder + numTickSize;
      break;
    case "down":
      snapped = numValue - remainder;
      break;
    case "nearest":
      snapped =
        remainder * 2 >= numTickSize
          ? numValue - remainder + numTickSize
          : numValue - remainder;
      break;
  }

  // Ensure we don't snap below minimum
  if (numMin !== undefined && snapped < numMin) {
    snapped = numMin;
  }

  return snapped as T;
}

// ─── Linear Component ───────────────────────────────────────────────────────

interface LinearProps<T extends ScaleValue> {
  /** Domain tuple: [min, max] */
  domain: [T, T];
  /** Function to get tick size at a given value */
  getTickSize: (value: T) => T;
  /** How to snap values to the tick grid (default: 'nearest', false to disable) */
  snapMode?: SnapMode | false;
  children: React.ReactNode;
  className?: string;
}

function Linear<T extends ScaleValue>({
  domain,
  getTickSize,
  snapMode = "nearest",
  children,
  className,
}: LinearProps<T>): React.ReactElement {
  const [min, max] = domain;

  const getValueAtPosition = React.useCallback(
    (position: number): T => {
      const rawValue = interpolate(min, max, position);

      if (snapMode === false) {
        return rawValue;
      }

      const tickSize = getTickSize(rawValue);
      return snapToTick(rawValue, tickSize, snapMode, min);
    },
    [min, max, getTickSize, snapMode],
  );

  const contextValue = React.useMemo(
    (): ScaleContextValue<T> => ({
      domain,
      getTickSize,
      snapMode,
      getValueAtPosition,
    }),
    [domain, getTickSize, snapMode, getValueAtPosition],
  );

  return (
    <ScaleContext.Provider
      value={contextValue as unknown as ScaleContextValueInternal}
    >
      <div className={className}>{children}</div>
    </ScaleContext.Provider>
  );
}

// ─── Tick Component ─────────────────────────────────────────────────────────

interface TickProps<T extends ScaleValue> {
  /** Position on the scale (0 = min, 1 = max) */
  position: number;
  /** Render function receiving the tick context */
  children: (context: TickContext<T>) => React.ReactNode;
  className?: string;
}

function Tick<T extends ScaleValue>({
  position,
  children,
  className,
}: TickProps<T>): React.ReactElement {
  const { getValueAtPosition } = useScale<T>();

  const value = React.useMemo(
    () => getValueAtPosition(position),
    [getValueAtPosition, position],
  );

  const context: TickContext<T> = {
    position,
    value,
  };

  return <div className={className}>{children(context)}</div>;
}

// ─── Ticks Component (helper for evenly-spaced ticks) ───────────────────────

interface TicksProps<T extends ScaleValue> {
  /** Number of ticks to generate (evenly spaced from 0 to 1) */
  count: number;
  /** Render function for each tick */
  children: (context: TickContext<T>, index: number) => React.ReactNode;
  className?: string;
}

function Ticks<T extends ScaleValue>({
  count,
  children,
  className,
}: TicksProps<T>): React.ReactElement {
  const positions = React.useMemo(() => {
    if (count <= 1) return [0];
    return Array.from({ length: count }, (_, i) => i / (count - 1));
  }, [count]);

  return (
    <>
      {positions.map((position, index) => (
        <Tick<T> key={position} position={position} className={className}>
          {(context) => children(context, index)}
        </Tick>
      ))}
    </>
  );
}

// ─── Export ─────────────────────────────────────────────────────────────────

interface ScaleComponent {
  Linear: typeof Linear;
  Tick: typeof Tick;
  Ticks: typeof Ticks;
}

const Scale: ScaleComponent = {
  Linear,
  Tick,
  Ticks,
};

export { Scale, useScale };
export type { TickContext as ScaleTickContext, SnapMode, ScaleValue };
