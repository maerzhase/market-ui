import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import type * as React from "react";
import { cn } from "@/lib/cn";

type SeparatorVariantsProps = {
  color?: "default" | "subtle";
  orientation?: "horizontal" | "vertical";
};

const separatorVariants = (props: SeparatorVariantsProps) => {
  const colorClasses = {
    default: "bg-border",
    subtle: "bg-separator",
  };
  const orientationClasses = {
    horizontal: "h-px",
    vertical: "w-px",
  };
  return `${colorClasses[props.color ?? "default"]} ${orientationClasses[props.orientation ?? "horizontal"]}`;
};

type SeparatorOwnProps = Omit<SeparatorVariantsProps, "orientation">;

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive>,
    SeparatorOwnProps {}

function Separator({
  className,
  color,
  orientation,
  ref,
  ...props
}: SeparatorProps): React.ReactElement {
  return (
    <SeparatorPrimitive
      ref={ref}
      className={cn(separatorVariants({ color, orientation }), className)}
      orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
