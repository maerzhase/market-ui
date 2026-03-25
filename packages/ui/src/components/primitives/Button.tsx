import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { IconLoader2 } from "@tabler/icons-react";
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
  | "xs"
  | "sm"
  | "lg"
  | "xl"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"
  | "card";

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
    "focus-visible:ring-ring focus-visible:ring-offset-background",
    // Disabled - prevent interaction
    "disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed",
    // aria-invalid
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30",
  ].join(" "),
  {
    variants: {
      color: {
        primary: [
          "border border-solid",
          "border-primary bg-primary text-primary-foreground",
          "hover:border-primary-hover hover:bg-primary-hover",
          "active:opacity-90",
          "shadow-[0_1px_2px_0_rgb(0,0,0,0.08)]",
          "disabled:opacity-50 aria-disabled:opacity-50",
        ].join(" "),

        secondary: [
          "border border-solid",
          "border-border bg-transparent text-foreground",
          "hover:border-input hover:bg-accent",
          "active:border-input active:bg-accent-active",
          "data-[state=active]:border-input data-[state=active]:bg-accent-active",
          "shadow-[0_1px_2px_0_rgb(0,0,0,0.04)]",
          "disabled:opacity-50 aria-disabled:opacity-50",
        ].join(" "),

        tertiary: [
          "border border-solid",
          "border-border bg-muted text-muted-foreground",
          "hover:border-input hover:bg-accent-hover hover:text-foreground",
          "active:bg-accent-active active:text-foreground",
          "data-[state=active]:bg-accent-active data-[state=active]:text-foreground",
          "disabled:opacity-50 aria-disabled:opacity-50",
        ].join(" "),

        ghost: [
          "border border-transparent bg-transparent",
          "text-muted-foreground",
          "hover:bg-accent hover:text-foreground",
          "active:bg-accent-active active:text-foreground",
          "data-[state=active]:bg-accent-active data-[state=active]:text-foreground",
          "disabled:text-disabled-foreground",
          "aria-disabled:text-disabled-foreground",
        ].join(" "),

        destructive: [
          "border border-solid",
          "border-destructive bg-destructive text-destructive-foreground",
          "hover:border-destructive-hover hover:bg-destructive-hover",
          "active:opacity-90",
          "shadow-[0_1px_2px_0_rgb(0,0,0,0.08)]",
          "disabled:opacity-50 aria-disabled:opacity-50",
        ].join(" "),

        link: [
          "border-transparent bg-transparent",
          "text-foreground underline-offset-4",
          "hover:underline",
          "h-auto px-0 py-0",
          "disabled:text-disabled-foreground disabled:no-underline",
          "aria-disabled:text-disabled-foreground aria-disabled:no-underline",
        ].join(" "),
      },

      size: {
        default: "h-9 rounded-md px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded px-2 text-xs has-[>svg]:px-1.5",
        sm: "h-8 gap-1 rounded-md px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-5 text-[15px] has-[>svg]:px-4",
        xl: "h-12 rounded-lg px-6 text-[15px] font-semibold has-[>svg]:px-5",
        icon: "size-9 rounded-md",
        "icon-xs": "size-6 rounded",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-10 rounded-lg",
        card: "min-h-[4rem] rounded-md px-4 py-3",
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
        <IconLoader2 aria-hidden className="size-4 animate-spin" />
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
