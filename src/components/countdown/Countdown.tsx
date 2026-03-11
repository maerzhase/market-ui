"use client"

import { Text } from "@/components/primitives"
import { type UseCountdownResult, useCountdown } from "@/hooks"

export interface CountdownProps {
  /** Target date to count down to */
  to: Date
  /** Show full format even when not expired (default: only show when expired) */
  showWhenExpired?: boolean
  /** Stop counting up when countdown reaches zero (default: false - keeps counting up) */
  stopOnExpired?: boolean
  /** Custom className */
  className?: string
  /** Custom renderer - receives full countdown state */
  children?: (result: UseCountdownResult) => React.ReactNode
}

export function Countdown({
  to,
  showWhenExpired = false,
  stopOnExpired = false,
  className,
  children,
}: CountdownProps): React.ReactElement | null {
  const result = useCountdown(to, { stopOnExpired })

  if (!showWhenExpired && result.remainingMs === null) {
    return null
  }

  const display = result.timeString ?? "00d:00h:00m:00s"

  if (children) {
    return <>{children(result)}</>
  }

  return (
    <Text className={className} tabularNums>
      {display}
    </Text>
  )
}
