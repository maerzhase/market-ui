"use client";

import { cn } from "@m3000/market";
import {
  AuctionBidForm,
  AuctionBiddingPanel,
  AuctionDetails,
  AuctionDetailsBody,
  AuctionDetailsHeader,
  AuctionDetailsSummary,
  AuctionHeader,
  AuctionLayout,
  AuctionRankings,
  AuctionRankingsContainer,
  AuctionShell,
} from "@/components/docs/examples/auction/shared";

export function AuctionComingSoonTeaser({
  className,
  tilted = true,
}: {
  className?: string;
  tilted?: boolean;
}) {
  return (
    <div className={cn("relative w-full px-1 py-2 sm:px-2", className)}>
      <div
        className={cn(
          "relative",
          tilted && "perspective-[1200px] perspective-origin-center",
        )}
      >
        <div
          className={cn(
            "relative mx-auto h-[470px] w-full max-w-4xl overflow-visible",
            tilted && "[transform:rotateX(2.2deg)_rotateY(-5.8deg)_rotateZ(0.35deg)]",
          )}
        >
          <div className="origin-top scale-[0.88] overflow-visible">
            <AuctionShell className="rounded-xl border border-border bg-background shadow-[0_24px_44px_rgba(0,0,0,0.28)]">
              <AuctionLayout height={560}>
                <AuctionDetails>
                  <AuctionDetailsHeader>
                    <AuctionHeader />
                  </AuctionDetailsHeader>
                  <AuctionDetailsBody>
                    <AuctionDetailsSummary />
                  </AuctionDetailsBody>
                </AuctionDetails>
                <AuctionRankingsContainer>
                  <AuctionRankings />
                  <AuctionBiddingPanel>
                    <AuctionBidForm.Root />
                  </AuctionBiddingPanel>
                </AuctionRankingsContainer>
              </AuctionLayout>
            </AuctionShell>
          </div>
        </div>
      </div>
    </div>
  );
}
