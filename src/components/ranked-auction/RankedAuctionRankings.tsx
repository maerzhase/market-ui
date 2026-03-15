"use client";

import { useEffect, useMemo, useRef } from "react";
import type { GroupItemContextValue } from "@/components";
import { RankedList } from "@/components";
import { Button, Separator, Skeleton, Text } from "@/components/primitives";
import { cn } from "@/lib";
import type { RankedAuctionBid, RankedAuctionUserBid } from "@/types";
import { formatShortRelative, getProjectedRankForPriceWei } from "@/utils";
import { useRankedAuctionContext } from "./RankedAuctionContext";

export interface RankedAuctionRankingsProps {
  className?: string;
  renderBidRow?: (
    bid: RankedAuctionBid,
    context: GroupItemContextValue<RankedAuctionBid> & { isOutbid: boolean },
  ) => React.ReactNode;
}

function BidRow({
  bid,
  rank,
  isOutbid,
  isUserBid,
  onTopUp,
  isAuctionEnded,
  formatPrice,
  currencySymbol,
}: {
  bid: RankedAuctionBid;
  rank: number;
  isOutbid: boolean;
  isUserBid: boolean;
  onTopUp?: () => void;
  isAuctionEnded: boolean;
  formatPrice: (priceWei: bigint) => string;
  currencySymbol: string;
}): React.ReactElement {
  const timeShort = formatShortRelative(bid.createdAt);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-6 py-2",
        isOutbid && "opacity-50",
        isUserBid && "border-l-2 border-l-primary bg-primary/5",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Text color="tertiary" className="w-8 shrink-0" size="1">
          #{rank}
        </Text>
        <span className="flex min-w-0 items-center gap-3">
          {bid.bidder.avatarUrl && (
            <img
              src={bid.bidder.avatarUrl}
              alt=""
              className="size-6 shrink-0 rounded-full object-cover"
            />
          )}
          <Text className="truncate">
            {isUserBid
              ? "You"
              : bid.bidder.name || `${bid.bidder.id.slice(0, 6)}...`}
          </Text>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        {isUserBid && !isAuctionEnded && (
          <Button size="sm" color="secondary" onClick={onTopUp}>
            Top up
          </Button>
        )}
        <Text>
          {formatPrice(bid.price)} {currencySymbol}
        </Text>
        <Text
          size="1"
          color="tertiary"
          className="min-w-9 text-right tabular-nums"
        >
          {timeShort}
        </Text>
      </div>
    </div>
  );
}

function BidPreviewRow({
  price,
  rank,
  isWinning,
  formatPrice,
  currencySymbol,
  previewRef,
}: {
  price: bigint;
  rank: number;
  isWinning: boolean;
  formatPrice: (priceWei: bigint) => string;
  currencySymbol: string;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}): React.ReactElement {
  return (
    <div
      ref={previewRef}
      className={cn(
        "flex items-center justify-between gap-2 px-6 py-2",

        "animate-[pulse_2s_ease-in-out_infinite]",
        isWinning ? "bg-primary/10" : "bg-muted/50",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Text
          color={isWinning ? "primary" : "tertiary"}
          className="w-8 shrink-0"
          size="1"
        >
          #{rank}
        </Text>
        <span className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full",
              isWinning ? "bg-primary/20" : "bg-muted",
            )}
          >
            <Text size="1" color={isWinning ? "primary" : "tertiary"}>
              ?
            </Text>
          </div>
          <Text color="secondary" className="italic">
            Your bid preview
          </Text>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <Text weight="medium">
          {formatPrice(price)} {currencySymbol}
        </Text>
        <span className="min-w-9"></span>
      </div>
    </div>
  );
}

function TopUpPreviewRow({
  price,
  rank,
  isWinning,
  onCancel,
  formatPrice,
  currencySymbol,
}: {
  price: bigint;
  rank: number;
  isWinning: boolean;
  onCancel: () => void;
  formatPrice: (priceWei: bigint) => string;
  currencySymbol: string;
}): React.ReactElement {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-6 py-2",
        "animate-[pulse_2s_ease-in-out_infinite]",
        isWinning ? "bg-success/10" : "bg-muted/50",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Text
          color={isWinning ? "success" : "tertiary"}
          className="w-8 shrink-0"
          size="1"
        >
          #{rank}
        </Text>
        <span className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full",
              isWinning ? "bg-success/20" : "bg-muted",
            )}
          >
            <Text size="1" color={isWinning ? "success" : "tertiary"}>
              ↑
            </Text>
          </div>
          <Text color="secondary" className="italic">
            Your bid after top-up
          </Text>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <Button size="sm" color="tertiary" onClick={onCancel}>
          Cancel
        </Button>
        <Text weight="medium">
          {formatPrice(price)} {currencySymbol}
        </Text>
        <span className="min-w-9"></span>
      </div>
    </div>
  );
}

function RankingsSkeleton(): React.ReactElement {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 px-6 py-3">
        <Text render={<p />} size="3">
          <Skeleton>username</Skeleton>
        </Text>
        <Text render={<p />} size="3">
          <Skeleton>0.00420 ETH 11m</Skeleton>
        </Text>
      </div>
      <Separator orientation="horizontal" />
    </div>
  );
}

export { RankingsSkeleton };

export function RankedAuctionRankings({
  className,
  renderBidRow,
}: RankedAuctionRankingsProps): React.ReactElement {
  const {
    mergedForRank,
    maxTotalItems,
    formatPrice,
    currencySymbol,
    bidWei,
    setBidWei,
    minBidWei,
    userBids,
    lockedBid,
    setLockedBid,
    isAuctionEnded,
  } = useRankedAuctionContext();

  // Create a map of user bid IDs for O(1) lookup
  const userBidMap = useMemo(() => {
    const map = new Map<string, RankedAuctionUserBid>();
    for (const ub of userBids) {
      map.set(ub.id, ub);
    }
    return map;
  }, [userBids]);

  const previewRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Determine if we should show the new bid preview (not during top-up)
  const showPreview = useMemo(() => {
    if (lockedBid !== null) return false; // Hide during top-up
    return bidWei >= minBidWei;
  }, [bidWei, minBidWei, lockedBid]);

  // Calculate the index where the preview slot should be inserted
  const previewIndex = useMemo(() => {
    if (!showPreview) return 0;
    const result = getProjectedRankForPriceWei(
      bidWei,
      mergedForRank,
      maxTotalItems,
    );
    // Convert 1-based rank to 0-based index, default to 0 if null
    return result.rank ? result.rank - 1 : 0;
  }, [showPreview, bidWei, mergedForRank, maxTotalItems]);

  // Scroll preview into view when bid changes
  useEffect(() => {
    if (previewRef.current && scrollContainerRef.current && showPreview) {
      const container = scrollContainerRef.current;
      const preview = previewRef.current;

      const containerRect = container.getBoundingClientRect();
      const previewRect = preview.getBoundingClientRect();

      // Check if preview is outside visible area
      const isAbove = previewRect.top < containerRect.top;
      const isBelow = previewRect.bottom > containerRect.bottom;

      if (isAbove || isBelow) {
        preview.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [showPreview]);

  // Find the locked bid's ID if in top-up mode
  const lockedBidId = useMemo(() => {
    if (lockedBid === null) return null;
    const lockedUserBid = userBids.find(
      (ub) => ub.globalBidId === lockedBid.bidId,
    );
    return lockedUserBid?.id ?? null;
  }, [lockedBid, userBids]);

  // Transform merged bids for the list, excluding locked bid during top-up
  const allBids: RankedAuctionBid[] = useMemo(
    () =>
      mergedForRank
        .filter((b) => b.id !== lockedBidId) // Exclude locked bid
        .map((b) => ({
          id: b.id,
          price: BigInt(b.price),
          createdAt: new Date(b.created_at),
          bidder: { id: b.id, name: "Unknown" },
        })),
    [mergedForRank, lockedBidId],
  );

  // Calculate top-up preview index (where the topped-up bid will land)
  const topUpPreviewIndex = useMemo(() => {
    if (lockedBid === null || lockedBidId === null) return null;

    // Filter out the locked bid for accurate projection
    const bidsWithoutLocked = mergedForRank.filter((b) => b.id !== lockedBidId);

    const result = getProjectedRankForPriceWei(
      bidWei,
      bidsWithoutLocked,
      maxTotalItems,
    );
    return result.rank ? result.rank - 1 : 0;
  }, [lockedBid, lockedBidId, bidWei, mergedForRank, maxTotalItems]);

  return (
    <div
      ref={scrollContainerRef}
      className={cn("min-h-0 flex-1 overflow-y-auto", className)}
    >
      <RankedList.Root
        items={allBids}
        getKey={(bid) => bid.id}
        boundaries={[maxTotalItems]}
        labels={["Winning Bids", "Outbid"]}
      >
        {showPreview && (
          <RankedList.Slot slotKey="preview" atIndex={previewIndex}>
            {(context) => (
              <>
                <BidPreviewRow
                  price={bidWei}
                  rank={context.rank}
                  isWinning={context.groupIndex === 0}
                  formatPrice={formatPrice}
                  currencySymbol={currencySymbol}
                  previewRef={previewRef}
                />
                {!context.isLastInGroup && (
                  <Separator orientation="horizontal" />
                )}
              </>
            )}
          </RankedList.Slot>
        )}
        {lockedBid !== null && topUpPreviewIndex !== null && (
          <RankedList.Slot slotKey="topup-preview" atIndex={topUpPreviewIndex}>
            {(context) => (
              <>
                <TopUpPreviewRow
                  price={bidWei}
                  rank={context.rank}
                  isWinning={context.groupIndex === 0}
                  onCancel={() => setLockedBid(null)}
                  formatPrice={formatPrice}
                  currencySymbol={currencySymbol}
                />
                {!context.isLastInGroup && (
                  <Separator orientation="horizontal" />
                )}
              </>
            )}
          </RankedList.Slot>
        )}
        <RankedList.Empty>
          <Text color="tertiary">No activity</Text>
        </RankedList.Empty>
        <RankedList.Group>
          <RankedList.GroupDivider />
          <RankedList.GroupItem>
            <RankedList.GroupItemValue>
              {(bid: RankedAuctionBid, context) => {
                const isOutbid = context.groupIndex === 1;
                const extendedContext = { ...context, isOutbid };

                // Check if this is a user bid
                const userBid = userBidMap.get(bid.id);
                const isUserBid = !!userBid;

                const handleTopUp = () => {
                  if (userBid) {
                    setLockedBid({
                      bidId: userBid.globalBidId,
                      priceWei: userBid.price,
                    });
                    setBidWei(userBid.price);
                  }
                };

                return (
                  <>
                    {renderBidRow ? (
                      renderBidRow(bid, extendedContext)
                    ) : (
                      <BidRow
                        bid={bid}
                        rank={context.globalIndex + 1}
                        isOutbid={isOutbid}
                        isUserBid={isUserBid}
                        onTopUp={handleTopUp}
                        isAuctionEnded={isAuctionEnded}
                        formatPrice={formatPrice}
                        currencySymbol={currencySymbol}
                      />
                    )}
                    {!context.isLastInGroup && (
                      <Separator orientation="horizontal" />
                    )}
                  </>
                );
              }}
            </RankedList.GroupItemValue>
          </RankedList.GroupItem>
        </RankedList.Group>
      </RankedList.Root>
    </div>
  );
}
