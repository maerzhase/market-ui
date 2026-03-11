"use client"

import { Tag, Text } from "@/components/primitives"
import { cn } from "@/lib"
import { formatDateTime } from "@/utils"
import { Countdown } from "../countdown/Countdown"

type AuctionState = "upcoming" | "live" | "closed"

function getAuctionState(
  opensAt: Date | null,
  endsAt: Date | null
): AuctionState {
  if (!opensAt || !endsAt) return "live"
  const now = Date.now()
  const open = opensAt.getTime()
  const end = endsAt.getTime()
  if (now < open) return "upcoming"
  if (now > end) return "closed"
  return "live"
}

const transparentTagClassName =
  "bg-transparent border-transparent p-0 dark:bg-transparent dark:border-transparent"

export interface RankedAuctionStatusTagProps {
  opensAt: Date | null
  endsAt: Date | null
  background?: "filled" | "transparent"
  showCountdown?: boolean
}

export function RankedAuctionStatusTag({
  opensAt,
  endsAt,
  background = "filled",
  showCountdown = false,
}: RankedAuctionStatusTagProps): React.ReactElement | null {
  const state = getAuctionState(opensAt, endsAt)
  const countdownTo =
    state === "live" ? endsAt : state === "upcoming" ? opensAt : null

  const tagClassName = cn(
    "inline-flex items-center gap-1.5 p-2",
    background === "transparent" && transparentTagClassName
  )

  if (state === "live" && endsAt) {
    return (
      <Tag className={tagClassName} aria-label="Auction is live">
        <span className="relative flex size-2 shrink-0" aria-hidden>
          <span className="
            absolute inline-flex size-full animate-ping rounded-full bg-success
            opacity-75
          " />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <Text>
          {showCountdown && countdownTo ? (
            <>
              Live — <Countdown to={countdownTo} />
            </>
          ) : (
            <>Live — Until {formatDateTime(endsAt)}</>
          )}
        </Text>
      </Tag>
    )
  }

  if (state === "upcoming" && opensAt) {
    return (
      <Tag className={tagClassName}>
        <Text>
          {showCountdown && countdownTo ? (
            <>
              Opens in <Countdown to={countdownTo} />
            </>
          ) : (
            <>Opens {formatDateTime(opensAt)}</>
          )}
        </Text>
      </Tag>
    )
  }

  if (state === "closed" && endsAt) {
    return (
      <Tag className={tagClassName}>
        <div
          className="size-2.5 shrink-0 rounded-full bg-neutral-500"
          aria-hidden
        />
        <Text>Closed — ended {formatDateTime(endsAt)}</Text>
      </Tag>
    )
  }

  return null
}
