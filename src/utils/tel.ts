/**
 * Formats a phone number string into a sanitized RFC 3966 tel: URI.
 * Why: Strips presentation whitespace from telephone numbers so mobile browsers and VoIP dialers
 * can parse the target number reliably.
 *
 * @param phone - Raw phone number string
 * @returns Sanitized tel: URI string
 */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
