"use client";

import { useState } from "react";
import { Button, Countdown } from "@m3000/market";

export function CountdownLiveToClosedExample() {
  const [targetDate, setTargetDate] = useState(() => new Date(Date.now() + 10000));

  return (
    <div className="flex flex-col">
      <div className="text-2 text-muted-foreground mb-4 flex gap-2 items-center">
        Watch the countdown expire after about 10 seconds.
        <Button onClick={() => setTargetDate(new Date(Date.now() + 10000))} color="ghost" size="sm">Reset</Button>
      </div>
      <Countdown to={targetDate} showWhenExpired>
        {({ timeString, isExpired }) => (
          <span
            className={[
              "transition-colors",
              isExpired ? "text-destructive" : "text-success",
            ].join(" ")}
          >
            {isExpired
              ? `Closed - ${timeString} ago`
              : `Live - ${timeString} left`}
          </span>
        )}
      </Countdown>
    </div >
  );
}
