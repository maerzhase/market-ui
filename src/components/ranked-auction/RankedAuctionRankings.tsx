"use client";

import { Separator, Skeleton, Text } from "@/components/primitives";
import { RankedList } from "@/components";
import type { GroupItemContextValue } from "@/components";
import type { RankedAuctionBid } from "@/types";
import { formatShortRelative } from "@/utils";
import { cn } from "@/lib";
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
  formatPrice,
  currencySymbol,
}: {
  bid: RankedAuctionBid;
  rank: number;
  isOutbid: boolean;
  formatPrice: (priceWei: bigint) => string;
  currencySymbol: string;
}): React.ReactElement {
  const timeShort = formatShortRelative(bid.createdAt);

  return (
    <div
      className={`flex items-center justify-between gap-2 px-6 py-2 ${isOutbid ? `opacity-50` : ""} `}
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
            {bid.bidder.name || bid.bidder.id.slice(0, 6) + "..."}
          </Text>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-4">
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
  const { bids, maxTotalItems, formatPrice, currencySymbol } =
    useRankedAuctionContext();

  const allBids: RankedAuctionBid[] = bids.map((b) => ({
    id: b.id,
    price: BigInt(b.price),
    createdAt: new Date(b.created_at),
    bidder: { id: b.id, name: "Unknown" },
  }));

  return (
    <div className={cn("min-h-0 flex-1 overflow-y-auto", className)}>
      <RankedList.Root
        items={allBids}
        getKey={(bid) => bid.id}
        boundaries={[maxTotalItems]}
        labels={["Winning Bids", "Outbid"]}
      >
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

                return (
                  <>
                    {renderBidRow ? (
                      renderBidRow(bid, extendedContext)
                    ) : (
                      <BidRow
                        bid={bid}
                        rank={context.globalIndex + 1}
                        isOutbid={isOutbid}
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
