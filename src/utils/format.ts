/**
 * Default price formatter: converts wei (bigint) to a human-readable ETH string.
 * Uses native bigint arithmetic -- no external dependencies.
 */
export function formatWeiToEth(wei: bigint, decimals: number = 18): string {
  const isNegative = wei < 0n
  const abs = isNegative ? -wei : wei
  const divisor = 10n ** BigInt(decimals)
  const whole = abs / divisor
  const remainder = abs % divisor

  if (remainder === 0n) {
    return `${isNegative ? "-" : ""}${whole.toString()}`
  }

  // Pad remainder to full decimal length and strip trailing zeros
  const remainderStr = remainder.toString().padStart(decimals, "0")
  const trimmed = remainderStr.replace(/0+$/, "")

  return `${isNegative ? "-" : ""}${whole.toString()}.${trimmed}`
}

/**
 * Parses an ETH string (e.g. "0.01") to wei (bigint).
 * Inverse of formatWeiToEth.
 */
export function parseEthToWei(eth: string, decimals: number = 18): bigint {
  const [wholePart = "0", fracPart = ""] = eth.split(".")
  const paddedFrac = fracPart.padEnd(decimals, "0").slice(0, decimals)
  return BigInt(wholePart) * 10n ** BigInt(decimals) + BigInt(paddedFrac)
}

/**
 * Formats a date as a short relative time string.
 * Examples: "now", "5m", "2h", "3d", "2w"
 */
export function formatShortRelative(date: Date): string {
  const now = Date.now()
  const diff = now - date.getTime()
  const secs = Math.floor(diff / 1000)

  if (secs < 60) return "now"
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`
  return `${Math.min(Math.floor(days / 7), 99)}w`
}

/**
 * Formats a date as a full timestamp string.
 * Example: "09 Mar 2026 at 14:30"
 */
export function formatFullTimestamp(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0")
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${day} ${month} ${year} at ${hours}:${minutes}`
}

/**
 * Formats a date as a short date string.
 * Example: "09 Mar 2026"
 */
export function formatShortDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0")
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

/**
 * Formats a date as a full date-time string for display.
 * Example: "09 Mar 2026 at 14:30"
 */
export function formatDateTime(date: Date): string {
  return formatFullTimestamp(date)
}

/**
 * Formats a countdown duration in ms to "DDd:HHh:MMm:SSs" format.
 * If elapsed is negative (time has passed), counts up (shows elapsed time).
 */
export function formatCountdownString(remainingMs: number): string {
  const absMs = Math.abs(remainingMs)
  const totalSeconds = Math.floor(absMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const dd = days.toString().padStart(2, "0")
  const hh = hours.toString().padStart(2, "0")
  const mm = minutes.toString().padStart(2, "0")
  const ss = seconds.toString().padStart(2, "0")

  return `${dd}d:${hh}h:${mm}m:${ss}s`
}
