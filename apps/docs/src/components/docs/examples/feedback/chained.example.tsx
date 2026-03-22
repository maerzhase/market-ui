"use client";

import { Button, Feedback } from "@m3000/market";
import { useEffect, useState } from "react";

export function FeedbackChainedExample() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];

    timeouts.push(
      setTimeout(() => {
        setMessage("Confirming payment");
        setShow(true);
      }, 300),
    );
    timeouts.push(
      setTimeout(() => {
        setMessage("Payment confirmed");
        setIsConfirmed(true);
      }, 3300),
    );
    timeouts.push(
      setTimeout(() => {
        setMessage(null);
        setShow(false);
        setIsConfirmed(false);
      }, 7300),
    );

    return () => {
      for (const timeout of timeouts) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <Feedback.Root show={show}>
      {isConfirmed ? (
        <div className="border-border bg-muted text-muted-foreground pointer-events-none flex h-9 min-w-[10.5rem] items-center justify-center rounded-md border px-4 text-sm font-medium opacity-70 select-none">
          Thank you
        </div>
      ) : (
        <Button color="secondary" loading={show}>
          Submit payment
        </Button>
      )}
      <Feedback.Content contentKey={message ?? "idle"} className="w-full">
        <div className="bg-foreground text-background mt-2 rounded-md px-3 py-1.5 text-center text-sm font-medium shadow-sm">
          {message}
        </div>
      </Feedback.Content>
    </Feedback.Root>
  );
}
