"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import type * as React from "react";
import { useCallback, useId, useMemo, useState } from "react";
import { cn, springs, transitions } from "@/lib/cn";

type OpenChangeDetails = Parameters<
  NonNullable<React.ComponentProps<typeof Dialog.Root>["onOpenChange"]>
>[1];

export interface MorphDialogProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  contentClosesDialog?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, eventDetails: OpenChangeDetails) => void;
  className?: string;
  triggerClassName?: string;
  popupClassName?: string;
  backdropClassName?: string;
  modal?: React.ComponentProps<typeof Dialog.Root>["modal"];
  initialFocus?: React.ComponentProps<typeof Dialog.Popup>["initialFocus"];
  finalFocus?: React.ComponentProps<typeof Dialog.Popup>["finalFocus"];
  popupAriaLabel?: string;
}

export function MorphDialog({
  trigger,
  content,
  contentClosesDialog = false,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  triggerClassName,
  popupClassName,
  backdropClassName,
  modal = true,
  initialFocus,
  finalFocus,
  popupAriaLabel,
}: MorphDialogProps): React.ReactElement {
  const generatedId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const layoutId = useMemo(
    () => `morph-dialog-${generatedId.replace(/:/g, "")}`,
    [generatedId],
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean, eventDetails: OpenChangeDetails) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen, eventDetails);
    },
    [isControlled, onOpenChange],
  );

  const handleBackdropClick = useCallback(() => {
    handleOpenChange(false, {} as OpenChangeDetails);
  }, [handleOpenChange]);

  const handleContentClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  return (
    <LayoutGroup id={layoutId}>
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange} modal={modal}>
        <div className={className}>
          <Dialog.Trigger
            className={cn(
              "block cursor-pointer appearance-none border-0 bg-transparent p-0 text-left outline-none disabled:cursor-default",
              triggerClassName,
            )}
          >
            <motion.div
              layout={!prefersReducedMotion}
              layoutId={prefersReducedMotion ? undefined : layoutId}
              transition={springs.quick}
              className="h-full w-full"
            >
              {trigger}
            </motion.div>
          </Dialog.Trigger>
        </div>

        <Dialog.Portal>
          <Dialog.Backdrop
            className={cn(
              "fixed inset-0 z-60 cursor-pointer backdrop-blur-sm transition-opacity duration-150 ease-out",
              isOpen ? "opacity-100" : "opacity-0",
              backdropClassName,
            )}
            onClick={handleBackdropClick}
          />

          <Dialog.Popup
            aria-label={popupAriaLabel}
            initialFocus={initialFocus}
            finalFocus={finalFocus}
            className="fixed inset-0 z-70 flex items-center justify-center p-5 outline-none sm:p-8"
            onClick={handleBackdropClick}
          >
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="morph-dialog-content"
                  layout={!prefersReducedMotion}
                  layoutId={prefersReducedMotion ? undefined : layoutId}
                  initial={prefersReducedMotion ? { opacity: 0, scale: 0.98 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0, scale: 0.98 } : undefined}
                  transition={prefersReducedMotion ? transitions.fade : springs.quick}
                  className={cn("pointer-events-auto max-h-[90vh] max-w-[90vw]", popupClassName)}
                  onClick={handleContentClick}
                >
                  {contentClosesDialog ? (
                    <Dialog.Close className="block cursor-pointer appearance-none border-0 bg-transparent p-0 text-left outline-none">
                      {content}
                    </Dialog.Close>
                  ) : (
                    content
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </LayoutGroup>
  );
}
