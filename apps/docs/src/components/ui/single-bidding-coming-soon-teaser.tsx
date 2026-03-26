"use client";

import { cn } from "@m3000/market";
import Image from "next/image";
import { artworkUrl } from "../docs/examples/auction/shared";

export function SingleBiddingComingSoonTeaser({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "relative flex flex-col rounded-xl border border-border p-4 pt-10",
          className,
        )}
      >
        <div className="relative flex h-[300px] w-full">
          <Image
            src={artworkUrl}
            alt="The Great Wave off Kanagawa"
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-contain"
          />
        </div>
        <h3>The Great Wave off Kanagawa</h3>
      </div>
    </div>
  );
}
