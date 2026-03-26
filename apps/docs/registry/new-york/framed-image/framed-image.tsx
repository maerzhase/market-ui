"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { MorphDialog } from "../MorphDialog";

export interface FramedImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export function FramedImage({
  src,
  alt,
  className,
}: FramedImageProps): React.ReactElement {
  return (
    <MorphDialog
      className={cn(
        "relative h-full min-h-0 w-full min-w-0 flex-1 rounded-md bg-accent",
        className,
      )}
      triggerClassName="h-full w-full"
      popupClassName="flex items-center justify-center"
      popupAriaLabel={alt ?? "Expanded image preview"}
      contentClosesDialog
      trigger={
        <div className="absolute inset-0 flex items-center justify-center p-5">
          {/* biome-ignore lint/performance/noImgElement: shared UI stays framework-agnostic. */}
          <motion.img
            src={src}
            alt={alt ?? ""}
            className="h-full w-full cursor-pointer object-contain"
            whileHover={{ scale: 1.02 }}
          />
        </div>
      }
      content={
        <div className="flex items-center justify-center">
          {/* biome-ignore lint/performance/noImgElement: shared UI stays framework-agnostic. */}
          <img
            src={src}
            alt={alt ?? ""}
            className="block max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      }
    />
  );
}
