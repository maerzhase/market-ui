"use client";

import { Countdown } from "@m3000/market";

export function CountdownSemanticExample() {
  return (
    <Countdown to={new Date(Date.now() + 3600000)}>
      {({ timeString, isExpired }) => (
        <span className="text-success">
          {isExpired ? "Closed" : `Open - ${timeString} left`}
        </span>
      )}
    </Countdown>
  );
}
