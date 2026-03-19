import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import type * as React from "react";
import { cn } from "@/lib/cn";
import { Text } from "./Text";

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

type SeparatorOwnProps = SeparatorVariantsProps & {
  label?: React.ReactNode;
};

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive>,
    SeparatorOwnProps {}

function Separator({
  className,
  color,
  orientation,
  label,
  ref,
  ...props
}: SeparatorProps): React.ReactElement {
  const colorClass = color ?? "default";
  const orientationValue = orientation ?? "horizontal";
  const lineColorClass =
    colorClass === "default" ? "bg-border" : "bg-separator";

  if (label) {
    if (orientationValue === "vertical") {
      return (
        <div
          className={cn(
            "flex min-h-0 min-w-px flex-col items-center justify-center gap-2",
            className,
          )}
          aria-hidden
        >
          <div className={cn("min-h-0 w-px flex-1", lineColorClass)} />
          <Text size="1" color="secondary" className="shrink-0">
            {label}
          </Text>
          <div className={cn("min-h-0 w-px flex-1", lineColorClass)} />
        </div>
      );
    }

    return (
      <div
        className={cn("flex min-w-0 items-center gap-3 py-2", className)}
        aria-hidden
      >
        <div className={cn("h-px min-w-0 flex-1", lineColorClass)} />
        <Text size="1" color="secondary" className="shrink-0">
          {label}
        </Text>
        <div className={cn("h-px min-w-0 flex-1", lineColorClass)} />
      </div>
    );
  }

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
