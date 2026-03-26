import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/cn";

const textVariants = cva("font-sans", {
  variants: {
    size: {
      "1": "text-xs leading-[18px]",
      "2": "text-sm leading-[21px]",
      "3": "text-base leading-6",
      "4": "text-xl leading-7",
      "5": "text-2xl leading-8",
      "6": "text-[28px] leading-9",
      "7": "text-[32px] leading-10",
      "8": "text-[36px] leading-[44px]",
      "9": "text-5xl leading-[56px]",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      primary: "text-foreground",
      secondary: "text-muted-foreground",
      tertiary: "text-muted-foreground",
      disabled: "text-disabled-foreground",
      current: "text-current",
      success: "text-success",
      error: "text-destructive",
    },
    tabularNums: {
      true: "tabular-nums",
    },
  },
  defaultVariants: {
    size: "2",
    weight: "regular",
    color: "primary",
  },
}) as (props?: {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  weight?: "regular" | "medium" | "semibold";
  align?: "left" | "center" | "right";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "disabled"
    | "current"
    | "success"
    | "error";
  tabularNums?: true;
  className?: string;
}) => string;

type TextVariants = typeof textVariants;

export interface TextProps
  extends VariantProps<TextVariants>,
    Omit<useRender.ComponentProps<"span">, "color"> {}

export type TextElement = React.ComponentRef<"span">;

export function Text({
  className,
  align,
  size,
  weight,
  color,
  tabularNums,
  render,
  ref,
  ...props
}: TextProps): React.ReactElement {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: cn(
      textVariants({ align, size, weight, color, tabularNums }),
      className,
    ),
  };

  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(defaultProps, props),
    ref: ref,
  });

  return element;
}

export { textVariants };
export type { VariantProps };
