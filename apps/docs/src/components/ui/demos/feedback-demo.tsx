"use client";

import { Button, Feedback } from "@m3000/market";
import { useEffect, useState } from "react";

export function FeedbackDemo() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const wait = (ms: number) =>
      new Promise((resolve) => {
        const timeoutId = setTimeout(resolve, ms);

        if (cancelled) {
          clearTimeout(timeoutId);
          resolve(undefined);
        }
      });

    const runLoop = async () => {
      while (!cancelled) {
        setMessage(null);
        await wait(1500);
        if (cancelled) break;

        setMessage("Confirming payment");
        await wait(3000);
        if (cancelled) break;

        setMessage("Payment confirmed");
        await wait(1800);
      }
    };

    void runLoop();

    return () => {
      cancelled = true;
    };
  }, []);


  return (
    <div className="flex min-h-[6rem] w-full items-center justify-center">
      <Feedback.Root show={!!message} className="w-full max-w-[12rem]">
        <Button className="w-full" loading={!!message}>
          Submit payment
        </Button>
        <Feedback.Content className="w-full" mode="crossfade">
          <div className="bg-foreground text-background mt-2 w-full rounded-md px-3 py-1.5 text-center text-sm font-medium shadow-sm">
            {message}
          </div>
        </Feedback.Content>
      </Feedback.Root>
    </div>
  );
}
