"use client";

import { Countdown, Text } from "@m3000/market";

export function CountdownDemo() {
  return (
    <Countdown to={new Date(Date.now() + 86400000 * 3)}>
      {({ timeString, isExpired }) => (
        <span className="font-mono text-base">
          {isExpired ? "Expired" : timeString}
        </span>
      )}
    </Countdown>
  );
}
