"use client"

import { cn } from "@/lib"
import { NumberField } from "@base-ui/react/number-field"
import * as React from "react"

interface SteppedInputContextValue {
  value: bigint
  displayValue: number
  format: Intl.NumberFormatOptions
  disabled: boolean
}

const SteppedInputContext = React.createContext<SteppedInputContextValue | null>(null)

function useSteppedInput(): SteppedInputContextValue {
  const context = React.useContext(SteppedInputContext)
  if (!context) {
    throw new Error("useSteppedInput must be used within SteppedInput.Root")
  }
  return context
}

const defaultFormatOptions: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
}

interface RootProps {
  value: bigint
  onChange: (value: bigint) => void
  min?: bigint
  max?: bigint
  getTickSize: (currentValue: bigint) => bigint
  formatValue?: (value: bigint) => number
  parseValue?: (value: number) => bigint
  disabled?: boolean
  className?: string
  format?: Intl.NumberFormatOptions
  children: React.ReactNode
}

function Root({
  value,
  onChange,
  min,
  max,
  getTickSize,
  formatValue: formatValueFn = v => Number(v),
  parseValue: parseValueFn = v => BigInt(Math.round(v)),
  disabled = false,
  className,
  format = defaultFormatOptions,
  children,
}: RootProps): React.ReactElement {
  const displayValue = formatValueFn(value)
  const step = formatValueFn(getTickSize(value))

  const contextValue: SteppedInputContextValue = React.useMemo(
    () => ({
      value,
      displayValue,
      format,
      disabled,
    }),
    [value, displayValue, format, disabled]
  )

  return (
    <SteppedInputContext.Provider value={contextValue}>
      <NumberField.Root
        value={displayValue}
        onValueChange={(val) => {
          if (val !== null && val !== undefined) {
            onChange(parseValueFn(val))
          }
        }}
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
  )
}

interface GroupProps {
  children: React.ReactNode
  className?: string
}

function Group({ children, className }: GroupProps): React.ReactElement {
  return (
    <NumberField.Group
      className={cn(
        "flex",
        "disabled:opacity-50",
        className
      )}
    >
      {children}
    </NumberField.Group>
  )
}

interface DecrementProps {
  className?: string
  children?: React.ReactNode
}

function Decrement({ className, children }: DecrementProps): React.ReactElement {
  return (
    <NumberField.Decrement
      className={cn(
        "flex size-10 items-center justify-center rounded-l-md border",
        "border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none",
        "hover:bg-gray-100",
        "active:bg-gray-100",
        `
          disabled:cursor-not-allowed disabled:border-grey-600
          disabled:bg-grey-600 disabled:text-gray-800
        `,
        className
      )}
    >
      {children ?? "-"}
    </NumberField.Decrement>
  )
}

interface IncrementProps {
  className?: string
  children?: React.ReactNode
}

function Increment({ className, children }: IncrementProps): React.ReactElement {
  return (
    <NumberField.Increment
      className={cn(
        "flex size-10 items-center justify-center rounded-r-md border",
        "border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none",
        "hover:bg-gray-100",
        "active:bg-gray-100",
        `
          disabled:cursor-not-allowed disabled:border-grey-600
          disabled:bg-grey-600 disabled:text-gray-800
        `,
        className
      )}
    >
      {children ?? "+"}
    </NumberField.Increment>
  )
}

interface ScrubAreaProps {
  children: React.ReactNode
  className?: string
}

function ScrubArea({ children, className }: ScrubAreaProps): React.ReactElement {
  return (
    <NumberField.ScrubArea
      className={cn(
        "relative flex w-full items-center",
        "disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </NumberField.ScrubArea>
  )
}

interface InputProps {
  className?: string
}

function Input({ className }: InputProps): React.ReactElement {
  return (
    <NumberField.Input
      readOnly
      className={cn(
        "h-10 w-auto grow cursor-default border border-gray-200 px-4",
        "text-center text-base text-text-primary tabular-nums",
        "focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset",
        `
          disabled:cursor-not-allowed disabled:border-grey-600
          disabled:text-grey-600
        `,
        className
      )}
    />
  )
}

interface ValueProps {
  children: (context: { value: bigint; displayValue: number }) => React.ReactNode
  className?: string
}

function Value({ children, className }: ValueProps): React.ReactElement {
  const { value, displayValue } = useSteppedInput()
  return (
    <div
      className={cn(
        "relative flex h-10 grow items-center border border-gray-200",
        "px-4",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-inset",
        `
          disabled:cursor-not-allowed disabled:border-grey-600
          disabled:text-grey-600
        `,
        className
      )}
    >
      <NumberField.Input
        readOnly
        className="sr-only"
      />
      <div
        className="w-full text-center text-base text-text-primary tabular-nums"
      >
        {children({ value, displayValue })}
      </div>
    </div>
  )
}

export function CursorGrowIcon(props: React.ComponentProps<'svg'>): React.ReactElement {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

interface SteppedInputComponent {
  Root: typeof Root
  Group: typeof Group
  Decrement: typeof Decrement
  Increment: typeof Increment
  ScrubArea: typeof ScrubArea
  ScrubAreaCursor: typeof NumberField.ScrubAreaCursor,
  Input: typeof Input
  Value: typeof Value
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
} as SteppedInputComponent

export { SteppedInput }
