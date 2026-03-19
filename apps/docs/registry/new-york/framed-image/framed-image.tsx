"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { cn, springs, transitions } from "@/lib/cn";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "relative h-full min-h-0 w-full min-w-0 flex-1 rounded-md bg-accent",
          className,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-5">
          <motion.div
            layout
            transition={springs.quick}
            className={cn(
              "flex items-center justify-center",
              isExpanded ? "fixed inset-0 z-50" : "h-full w-full",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              layout
              src={src}
              alt={alt ?? ""}
              className="cursor-pointer object-contain"
              style={
                isExpanded
                  ? { maxHeight: "90vh", maxWidth: "90vw", borderRadius: 8 }
                  : { maxHeight: "100%", maxWidth: "100%", borderRadius: 4 }
              }
              onClick={isExpanded ? handleCollapse : handleExpand}
              whileHover={isExpanded ? undefined : { scale: 1.02 }}
              transition={springs.quick}
            />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.fade}
            className="fixed inset-0 z-40 backdrop-blur-sm select-none"
            onClick={handleCollapse}
          />
        )}
      </AnimatePresence>
    </>
  );
}
