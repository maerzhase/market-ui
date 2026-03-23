"use client";

import { Button, Feedback } from "@m3000/market";
import { useState } from "react";

export function FeedbackUsageExample() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    if (show) return;

    setMessage("Confirming payment");
    setShow(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setMessage("Payment confirmed");

    await new Promise((resolve) => setTimeout(resolve, 1800));

    setMessage(null);
    setShow(false);
  };

  return (
    <Feedback.Root show={show}>
      <Button color="secondary" loading={show} onClick={handleClick}>
        Submit payment
      </Button>
      <Feedback.Content className="w-full">
        <div className="bg-foreground text-background mt-2 rounded-md px-3 py-1.5 text-center text-sm font-medium whitespace-nowrap shadow-sm">
          {message}
        </div>
      </Feedback.Content>
    </Feedback.Root>
  );
}
