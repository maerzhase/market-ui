"use client";

import { useEffect, useMemo, useRef } from "react";
import type { GroupItemContextValue } from "@/components";
import { Ranking } from "@/components";
import { Button, Separator, Skeleton, Text } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { AuctionBid, AuctionUserBid } from "@/types";
import { formatShortRelative, getProjectedRankForPrice } from "@/utils";
import { useAuctionContext } from "./AuctionContext";

export interface AuctionRankingsProps {
  className?: string;
  renderBidRow?: (
    bid: AuctionBid,
    context: GroupItemContextValue<AuctionBid> & { isOutbid: boolean },
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
  bid: AuctionBid;
  rank: number;
  isOutbid: boolean;
  isUserBid: boolean;
  onTopUp?: () => void;
  isAuctionEnded: boolean;
  formatPrice: (priceValue: bigint) => string;
  currencySymbol: string;
}): React.ReactElement {
  const timeShort = formatShortRelative(bid.createdAt);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-6 py-2",
        isOutbid && "opacity-50",
        isUserBid && "shadow-[inset_2px_0_0_0_var(--color-primary)]",
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
          <Button size="xs" color="secondary" onClick={onTopUp}>
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
  onCancel,
  formatPrice,
  currencySymbol,
  previewRef,
}: {
  price: bigint;
  rank: number;
  onCancel: () => void;
  formatPrice: (priceValue: bigint) => string;
  currencySymbol: string;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}): React.ReactElement {
  return (
    <div ref={previewRef} className="relative">
      <div className="absolute inset-0 animate-[pulse_2s_ease-in-out_infinite] bg-success/10" />
      <div className="relative flex items-center justify-between gap-2 px-6 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <Text color="tertiary" className="w-8 shrink-0" size="1">
            #{rank}
          </Text>
          <span className="flex min-w-0 items-center gap-3">
            <Text color="secondary">New bid preview</Text>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Button size="xs" color="tertiary" onClick={onCancel}>
            Cancel
          </Button>
          <Text weight="medium" tabularNums>
            {formatPrice(price)} {currencySymbol}
          </Text>
          <span className="min-w-9"></span>
        </div>
      </div>
    </div>
  );
}

function TopUpPreviewRow({
  price,
  rank,
  onCancel,
  formatPrice,
  currencySymbol,
}: {
  price: bigint;
  rank: number;
  onCancel: () => void;
  formatPrice: (priceValue: bigint) => string;
  currencySymbol: string;
}): React.ReactElement {
  return (
    <div className="relative shadow-[inset_2px_0_0_0_var(--color-success)]">
      <div className="absolute inset-0 animate-[pulse_2s_ease-in-out_infinite] bg-success/10" />
      <div className="relative flex items-center justify-between gap-2 px-6 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <Text color="tertiary" className="w-8 shrink-0" size="1">
            #{rank}
          </Text>
          <span className="flex min-w-0 items-center gap-3">
            <Text color="secondary">Top-up preview</Text>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Button size="xs" color="tertiary" onClick={onCancel}>
            Cancel
          </Button>
          <Text weight="medium" tabularNums>
            {formatPrice(price)} {currencySymbol}
          </Text>
          <span className="min-w-9"></span>
        </div>
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
          <Skeleton>0.00420 USD 11m</Skeleton>
        </Text>
      </div>
      <Separator orientation="horizontal" />
    </div>
  );
}

export { RankingsSkeleton };

export function AuctionRankings({
  className,
  renderBidRow,
}: AuctionRankingsProps): React.ReactElement {
  const {
    mergedForRank,
    maxTotalItems,
    formatPrice,
    currencySymbol,
    bidValue,
    setBidValue,
    minBidValue,
    userBids,
    lockedBid,
    setLockedBid,
    showBidPreview,
    isAuctionEnded,
    cancelBidding,
    isBiddingActive,
  } = useAuctionContext();

  const userBidMap = useMemo(() => {
    const map = new Map<string, AuctionUserBid>();
    for (const ub of userBids) {
      map.set(ub.id, ub);
    }
    return map;
  }, [userBids]);

  const previewRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const showPreview = useMemo(() => {
    if (!showBidPreview) return false;
    if (lockedBid !== null) return false;
    return bidValue >= minBidValue;
  }, [showBidPreview, bidValue, minBidValue, lockedBid]);

  const previewIndex = useMemo(() => {
    if (!showPreview) return 0;
    const result = getProjectedRankForPrice(
      bidValue,
      mergedForRank,
      maxTotalItems,
    );
    return result.rank ? result.rank - 1 : 0;
  }, [showPreview, bidValue, mergedForRank, maxTotalItems]);

  const prevBiddingActiveRef = useRef(false);

  useEffect(() => {
    const justStartedBidding = isBiddingActive && !prevBiddingActiveRef.current;
    prevBiddingActiveRef.current = isBiddingActive;

    if (!showPreview) return;

    const scrollToPreview = () => {
      if (previewRef.current && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const preview = previewRef.current;
        const stickyDivider =
          container.querySelector<HTMLElement>("[data-ranking-group-divider]");
        const stickyOffset = stickyDivider?.offsetHeight ?? 0;

        const containerRect = container.getBoundingClientRect();
        const previewRect = preview.getBoundingClientRect();
        const visibleTop = containerRect.top + stickyOffset;
        const visibleBottom = containerRect.bottom;

        const isAbove = previewRect.top < visibleTop;
        const isBelow = previewRect.bottom > visibleBottom;

        if (justStartedBidding || isAbove || isBelow) {
          let targetScrollTop = container.scrollTop;

          if (justStartedBidding) {
            const visibleHeight = container.clientHeight - stickyOffset;
            targetScrollTop +=
              previewRect.top -
              visibleTop -
              (visibleHeight - previewRect.height) / 2;
          } else if (isAbove) {
            targetScrollTop += previewRect.top - visibleTop;
          } else if (isBelow) {
            targetScrollTop += previewRect.bottom - visibleBottom;
          }

          container.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: "auto",
          });
        }
      }
    };

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToPreview);
    });

    return () => cancelAnimationFrame(frameId);
  }, [showPreview, isBiddingActive, previewIndex]);

  const { lockedBidId, lockedBidOriginalIndex } = useMemo(() => {
    if (lockedBid === null)
      return { lockedBidId: null, lockedBidOriginalIndex: null };
    const lockedUserBid = userBids.find(
      (ub) => ub.globalBidId === lockedBid.bidId,
    );
    const bidId = lockedUserBid?.id ?? null;
    const originalIndex =
      bidId !== null ? mergedForRank.findIndex((b) => b.id === bidId) : null;
    return { lockedBidId: bidId, lockedBidOriginalIndex: originalIndex };
  }, [lockedBid, userBids, mergedForRank]);

  const allBids: AuctionBid[] = useMemo(
    () =>
      mergedForRank
        .filter((b) => b.id !== lockedBidId)
        .map((b) => ({
          id: b.id,
          price: BigInt(b.price),
          createdAt: new Date(b.created_at),
          bidder: b.bidder ?? { id: b.id, name: "Unknown" },
        })),
    [mergedForRank, lockedBidId],
  );

  const topUpPreviewIndex = useMemo(() => {
    if (lockedBid === null || lockedBidId === null) return null;

    const bidsWithoutLocked = mergedForRank.filter((b) => b.id !== lockedBidId);

    const result = getProjectedRankForPrice(
      bidValue,
      bidsWithoutLocked,
      maxTotalItems,
    );
    return result.rank ? result.rank - 1 : 0;
  }, [lockedBid, lockedBidId, bidValue, mergedForRank, maxTotalItems]);

  return (
    <div
      ref={scrollContainerRef}
      className={cn("min-h-0 flex-1 overflow-y-auto", className)}
    >
      <Ranking.Root
        items={allBids}
        getKey={(bid) => bid.id}
        boundaries={[maxTotalItems]}
        labels={["Winning Bids", "Outbid"]}
      >
        {showPreview && (
          <Ranking.Slot slotKey="preview" atIndex={previewIndex}>
            {(context) => (
              <>
                <BidPreviewRow
                  price={bidValue}
                  rank={context.rank}
                  onCancel={cancelBidding}
                  formatPrice={formatPrice}
                  currencySymbol={currencySymbol}
                  previewRef={previewRef}
                />
                {!context.isLastInGroup && (
                  <Separator orientation="horizontal" />
                )}
              </>
            )}
          </Ranking.Slot>
        )}
        {lockedBid !== null && topUpPreviewIndex !== null && (
          <Ranking.Slot slotKey="topup-preview" atIndex={topUpPreviewIndex}>
            {(context) => (
              <>
                <TopUpPreviewRow
                  price={bidValue}
                  rank={context.rank}
                  onCancel={cancelBidding}
                  formatPrice={formatPrice}
                  currencySymbol={currencySymbol}
                />
                {!context.isLastInGroup && (
                  <Separator orientation="horizontal" />
                )}
              </>
            )}
          </Ranking.Slot>
        )}
        <Ranking.Empty>
          <Text color="tertiary">No activity</Text>
        </Ranking.Empty>
        <Ranking.Group>
          <Ranking.GroupDivider />
          <Ranking.GroupItem>
            <Ranking.GroupItemValue>
              {(bid: AuctionBid, context) => {
                const isOutbid = context.groupIndex === 1;
                const isBelowLockedBid =
                  lockedBid !== null &&
                  lockedBidOriginalIndex !== null &&
                  lockedBidOriginalIndex >= 0 &&
                  context.globalIndex >= lockedBidOriginalIndex;
                const extendedContext = { ...context, isOutbid };

                const userBid = userBidMap.get(bid.id);
                const isUserBid = !!userBid;

                const handleTopUp = () => {
                  if (userBid) {
                    setLockedBid({
                      bidId: userBid.globalBidId,
                      priceValue: userBid.price,
                    });
                    setBidValue(userBid.price);
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
                        isOutbid={isOutbid || isBelowLockedBid}
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
            </Ranking.GroupItemValue>
          </Ranking.GroupItem>
        </Ranking.Group>
      </Ranking.Root>
    </div>
  );
}
