import type * as React from "react"
import { cn } from "@/lib/cn"
import { Text, type TextProps } from "./Text"

type TagVariantsProps = {
  type?: "informative" | "interactive"
}

const tagVariants = (props: TagVariantsProps) => {
  const baseClasses = `
    inline-flex rounded-xs border-1 border-solid border-grey-200
    bg-grey-200 px-1 leading-none
    dark:border-fx-800 dark:bg-grey-800
  `
  const typeClasses = {
    informative: "",
    interactive: `
      underline
      hover:bg-grey-100
      focus-visible:ring focus-visible:outline-none
      dark:hover:bg-grey-900
    `,
  }
  return `${baseClasses} ${typeClasses[props.type ?? "informative"]}`
}

type BaseTagProps = Omit<TextProps, "render"> & TagVariantsProps

type TagInformativeProps = BaseTagProps & {
  type?: "informative"
} & Omit<React.ComponentProps<"span">, "color">

type TagButtonProps = BaseTagProps & {
  type: "interactive"
} & Omit<React.ComponentProps<"button">, "type">

export type TagProps = TagInformativeProps | TagButtonProps
export type TagElement = HTMLSpanElement | HTMLButtonElement

export function Tag({
  className,
  type = "informative",
  children,
  ...rest
}: TagProps): React.ReactElement {
  return (
    <Text
      render={type === "interactive" ? <button type="button" /> : <span />}
      className={cn(tagVariants({ type }), className)}
      {...rest}
    >
      {children}
    </Text>
  )
}


