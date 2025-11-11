// src/helpers/location.js
import { AIRPORT_POSTCODES } from "../lib/fees";

// --- Regex validator for UK postcodes ---
export function isValidUKPostcode(s) {
  if (!s) return false;
  const re =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-PR-UWYZa-pr-uwyz][0-9][0-9]?)|(([A-PR-UWYZa-pr-uwyz][A-HK-Ya-hk-y][0-9][0-9]?)|(([A-PR-UWYZa-pr-uwyz][0-9][A-HJKPSTUw0-9])|([A-PR-UWYZa-pr-uwyz][A-HK-Ya-hk-y][0-9][ABEHMNPRVWXYabehmnprvwxy]))))\s?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})/;
  return re.test(s.trim());
}

// --- Extract full or partial postcode ---
export function extractPostcode(address) {
  if (!address) return null;
  const match = address.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s?(\d[A-Z]{2})/i);
  if (!match) {
    const partial = address.match(/\b([A-Z]{1,2}\d{1,2}[A-Z]?)\b/i);
    return partial ? partial[1].toUpperCase() : null;
  }
  return `${match[1].toUpperCase()} ${match[2].toUpperCase()}`;
}

// --- Lookup postcode info (Postcodes.io) ---
export async function lookupPostcode(postcode) {
  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.result; // normalized postcode + coords + region
  } catch {
    return null;
  }
}

// --- Detect airport from outward code ---
export function detectAirport(postcode) {
  if (!postcode) return null;
  for (const [airport, codes] of Object.entries(AIRPORT_POSTCODES)) {
    if (codes.some((pc) => postcode.startsWith(pc))) return airport;
  }
  return null;
}
