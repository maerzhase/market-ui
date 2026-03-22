"use client";

import { Button, Feedback } from "@m3000/market";

export function FeedbackPositionsExample() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <Feedback.Root show position="top" className="justify-self-center">
        <Button color="ghost">Top</Button>
        <Feedback.Content className="w-full">
          <div className="bg-foreground text-background mb-2 rounded-md px-3 py-1.5 text-center text-sm font-medium shadow-sm">
            Synced
          </div>
        </Feedback.Content>
      </Feedback.Root>

      <Feedback.Root show position="right" className="justify-self-center">
        <Button color="ghost">Right</Button>
        <Feedback.Content className="pl-2">
          <div className="bg-foreground text-background rounded-md px-3 py-1.5 text-center text-sm font-medium shadow-sm">
            Queued
          </div>
        </Feedback.Content>
      </Feedback.Root>

      <Feedback.Root show position="bottom" className="justify-self-center">
        <Button color="ghost">Bottom</Button>
        <Feedback.Content className="w-full">
          <div className="bg-foreground text-background mt-2 rounded-md px-3 py-1.5 text-center text-sm font-medium shadow-sm">
            Saved
          </div>
        </Feedback.Content>
      </Feedback.Root>

      <Feedback.Root show position="left" className="justify-self-center">
        <Button color="ghost">Left</Button>
        <Feedback.Content className="pr-2">
          <div className="bg-foreground text-background rounded-md px-3 py-1.5 text-center text-sm font-medium shadow-sm">
            Draft
          </div>
        </Feedback.Content>
      </Feedback.Root>
    </div>
  );
}
