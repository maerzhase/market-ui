import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/cn";

type ButtonColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "destructive"
  | "link";
type ButtonSize =
  | "default"
  | "sm"
  | "lg"
  | "xl"
  | "icon"
  | "icon-sm"
  | "icon-lg";

interface ButtonVariantProps {
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
}

const buttonVariants = cva(
  [
    // Base layout & typography
    "inline-flex cursor-pointer items-center justify-center gap-1.5",
    "font-sans text-sm leading-none font-medium whitespace-nowrap",
    "shrink-0 select-none",
    // Transitions
    "transition-all duration-150 ease-out",
    // SVG children
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Focus ring
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-grey-1000 focus-visible:ring-offset-background-primary",
    "dark:focus-visible:ring-grey-50 dark:focus-visible:ring-offset-background-primary",
    // Disabled
    "disabled:pointer-events-none",
    "disabled:border-border-subtle disabled:bg-background-ui disabled:text-text-disabled",
    // aria-invalid
    "aria-invalid:border-error-solid aria-invalid:ring-2 aria-invalid:ring-error-solid/30",
  ].join(" "),
  {
    variants: {
      color: {
        primary: [
          "border border-solid",
          "border-solid bg-solid text-background-primary",
          "hover:border-solid-hover hover:bg-solid-hover",
          "active:opacity-90",
          "shadow-[0_1px_2px_0_rgb(0,0,0,0.08)]",
        ].join(" "),

        secondary: [
          "border border-solid",
          "border-border-ui bg-transparent text-text-primary",
          "hover:border-border-strong hover:bg-background-ui",
          "active:border-border-strong active:bg-background-ui-active",
          "shadow-[0_1px_2px_0_rgb(0,0,0,0.04)]",
        ].join(" "),

        tertiary: [
          "border border-solid",
          "border-border-subtle bg-background-ui text-text-secondary",
          "hover:border-border-ui hover:bg-background-ui-hover hover:text-text-primary",
          "active:bg-background-ui-active active:text-text-primary",
        ].join(" "),

        ghost: [
          "border border-transparent bg-transparent",
          "text-text-secondary",
          "hover:bg-background-ui hover:text-text-primary",
          "active:bg-background-ui-active active:text-text-primary",
          "disabled:border-transparent disabled:bg-transparent",
        ].join(" "),

        destructive: [
          "border border-solid",
          "border-error-solid bg-error-solid text-white",
          "hover:opacity-90",
          "active:opacity-80",
          "shadow-[0_1px_2px_0_rgb(0,0,0,0.08)]",
        ].join(" "),

        link: [
          "border-transparent bg-transparent",
          "text-text-primary underline-offset-4",
          "hover:underline",
          "h-auto px-0 py-0",
        ].join(" "),
      },

      size: {
        default: `h-9 rounded-md px-4 py-2 has-[>svg]:px-3`,
        sm: `h-8 gap-1 rounded-md px-3 text-xs has-[>svg]:px-2.5`,
        lg: `h-10 rounded-lg px-5 text-[15px] has-[>svg]:px-4`,
        xl: `h-12 rounded-lg px-6 text-[15px] font-semibold has-[>svg]:px-5`,
        icon: "size-9 rounded-md",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "default",
    },
  },
) as (props?: ButtonVariantProps) => string;

type ButtonVariants = typeof buttonVariants;

export type ButtonProps = React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<ButtonVariants> & {
    loading?: boolean;
    active?: boolean;
  };

export type ButtonElement = React.ComponentRef<"button">;

export function Button({
  className,
  color,
  size,
  disabled,
  loading,
  children,
  active,
  ...props
}: ButtonProps): React.ReactElement {
  const _disabled = disabled || loading;

  const _children = loading ? (
    <>
      <span className="invisible contents">{children}</span>
      <span className="absolute inset-0 flex items-center justify-center">
        <svg
          className="size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <title>Loading</title>
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeDasharray="60"
            strokeDashoffset="20"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </>
  ) : (
    children
  );

  return (
    <ButtonPrimitive
      data-state={active ? "active" : undefined}
      disabled={_disabled}
      focusableWhenDisabled
      className={cn(
        buttonVariants({ color, size }),
        {
          relative: loading,
        },
        className,
      )}
      {...props}
    >
      {_children}
    </ButtonPrimitive>
  );
}

export { buttonVariants };
