"use client";

import { useLayoutEffect, useState } from "react";
import { formatCountdownString } from "@/utils/format";

export interface UseCountdownOptions {
  /** Stop updating when countdown reaches zero (default: false - keeps counting up) */
  stopOnExpired?: boolean;
}

export interface UseCountdownResult {
  timeString: string | null;
  remainingMs: number | null;
  isExpired: boolean;
}

/**
 * Returns countdown state that updates every second via requestAnimationFrame.
 * Only re-renders when the seconds value changes to minimize layout shift.
 *
 * @param to - Target date to count down to (null disables the countdown)
 * @returns Object with formatted timeString, remainingMs, and isExpired flag
 */
export function useCountdown(
  to: Date | null,
  options?: UseCountdownOptions,
): UseCountdownResult {
  const { stopOnExpired = false } = options ?? {};

  const [result, setResult] = useState<UseCountdownResult>(() => {
    if (!to) return { timeString: null, remainingMs: null, isExpired: false };
    const remainingMs = to.getTime() - Date.now();
    return {
      timeString: formatCountdownString(remainingMs),
      remainingMs,
      isExpired: remainingMs <= 0,
    };
  });

  useLayoutEffect(() => {
    if (!to) {
      setResult({ timeString: null, remainingMs: null, isExpired: false });
      return;
    }

    const target = to.getTime();
    const initialRemainingMs = target - Date.now();
    let lastSeconds = Math.floor(Math.abs(initialRemainingMs) / 1000);
    let hasExpired = initialRemainingMs <= 0;
    let frameId: number;

    const tick = () => {
      const remainingMs = target - Date.now();
      const absMs = Math.abs(remainingMs);
      const isExpired = remainingMs <= 0;

      // If stopOnExpired and already expired, don't update
      if (stopOnExpired && hasExpired) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (isExpired) {
        hasExpired = true;
      }

      const currentSeconds = Math.floor(absMs / 1000);

      if (currentSeconds !== lastSeconds || (isExpired && lastSeconds !== -2)) {
        lastSeconds = isExpired ? -2 : currentSeconds;
        setResult({
          timeString: formatCountdownString(remainingMs),
          remainingMs,
          isExpired,
        });
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [to, stopOnExpired]);

  return result;
}
