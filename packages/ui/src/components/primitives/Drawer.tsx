"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import type * as React from "react";
import { cn } from "@/lib/cn";

type OpenChangeDetails = Parameters<
  NonNullable<React.ComponentProps<typeof DrawerPrimitive.Root>["onOpenChange"]>
>[1];

export interface DrawerProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, eventDetails: OpenChangeDetails) => void;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
  backdropClassName?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: "left" | "right";
  modal?: React.ComponentProps<typeof DrawerPrimitive.Root>["modal"];
  initialFocus?: React.ComponentProps<typeof DrawerPrimitive.Popup>["initialFocus"];
  finalFocus?: React.ComponentProps<typeof DrawerPrimitive.Popup>["finalFocus"];
  popupAriaLabel?: string;
}

export function Drawer({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  triggerClassName,
  panelClassName,
  backdropClassName,
  title,
  description,
  side = "right",
  modal = true,
  initialFocus,
  finalFocus,
  popupAriaLabel,
}: DrawerProps): React.ReactElement {
  const sideClassName =
    side === "left"
      ? "inset-y-0 left-0 h-full"
      : "inset-y-0 right-0 h-full";
  const swipeDirection = side === "left" ? "left" : "right";

  return (
    <DrawerPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
      swipeDirection={swipeDirection}
    >
      <div className={className}>
        <DrawerPrimitive.Trigger
          className={cn("outline-none", triggerClassName)}
          render={trigger}
        />
      </div>

      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Backdrop
          className={(state) =>
            cn(
              "fixed inset-0 z-60 bg-background/70 backdrop-blur-sm transition-opacity duration-150 ease-out",
              (state.transitionStatus === "starting" ||
                state.transitionStatus === "ending") &&
                "opacity-0",
              backdropClassName,
            )
          }
        />

        <DrawerPrimitive.Viewport className="fixed inset-0 z-70 overflow-hidden">
          <DrawerPrimitive.Popup
            aria-label={popupAriaLabel}
            initialFocus={initialFocus}
            finalFocus={finalFocus}
            className={cn(
              "fixed z-70 flex h-full w-auto outline-none transition-transform duration-200 ease-out",
              sideClassName,
            )}
            style={(state) => ({
              transform:
                state.transitionStatus === "starting" ||
                state.transitionStatus === "ending"
                  ? side === "left"
                    ? "translateX(-100%)"
                    : "translateX(100%)"
                  : "translateX(var(--drawer-swipe-movement-x, 0px))",
            })}
          >
            <DrawerPrimitive.Content
              className={cn(
                "flex h-full w-[max(50vw,24rem)] max-w-none flex-col border-border bg-background shadow-2xl sm:w-[max(50vw,28rem)]",
                side === "left" ? "border-r" : "border-l",
                panelClassName,
              )}
            >
              {title ? (
                <DrawerPrimitive.Title className="sr-only">
                  {title}
                </DrawerPrimitive.Title>
              ) : null}
              {description ? (
                <DrawerPrimitive.Description className="sr-only">
                  {description}
                </DrawerPrimitive.Description>
              ) : null}
              {children}
            </DrawerPrimitive.Content>
          </DrawerPrimitive.Popup>
        </DrawerPrimitive.Viewport>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
