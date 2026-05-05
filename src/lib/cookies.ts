/** Tiny cookie helpers. SameSite=Lax, 1-year default. */

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split(';')
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${name}=`))
  if (!match) return null
  const value = match.slice(name.length + 1)
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function setCookie(
  name: string,
  value: string,
  maxAgeSec: number = ONE_YEAR_SECONDS,
): void {
  if (typeof document === 'undefined') return
  const v = encodeURIComponent(value)
  const parts = [
    `${name}=${v}`,
    `path=/`,
    `max-age=${maxAgeSec}`,
    `SameSite=Lax`,
  ]
  if (window.location.protocol === 'https:') parts.push('Secure')
  document.cookie = parts.join('; ')
}
