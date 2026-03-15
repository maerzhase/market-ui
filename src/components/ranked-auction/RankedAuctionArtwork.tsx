"use client";

import { cn } from "@/lib";

export interface RankedAuctionArtworkProps {
  src: string;
  alt?: string;
  className?: string;
}

export function RankedAuctionArtwork({
  src,
  alt,
  className,
}: RankedAuctionArtworkProps): React.ReactElement {
  return (
    <div className={cn("h-48 w-full overflow-hidden rounded-md", className)}>
      <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" />
    </div>
  );
}
