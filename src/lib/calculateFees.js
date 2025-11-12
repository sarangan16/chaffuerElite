import {
  ZONE_FEES,
  AIRPORT_FEES,
  CONGESTION_ZONE_POSTCODES,
  AIRPORT_POSTCODES,
} from "./fees.js";

export function extractPostcode(address) {
  const match = address?.match(/\b[A-Z]{1,2}\d{1,2}[A-Z]?\b/i);
  return match ? match[0].toUpperCase() : null;
}

export function detectAirport(pc) {
  if (!pc) return null;
  for (const [name, codes] of Object.entries(AIRPORT_POSTCODES)) {
    if (codes.some((prefix) => pc.startsWith(prefix))) return name;
  }
  return null;
}

export function calculateFees(pickup, dropoff, isULEZNonCompliant = false) {
  const pc1 = extractPostcode(pickup);
  const pc2 = extractPostcode(dropoff);

  const airport1 = detectAirport(pc1);
  const airport2 = detectAirport(pc2);
  const airport = airport1 || airport2;

  const inCongestionZone = [pc1, pc2].some((pc) =>
    CONGESTION_ZONE_POSTCODES.some((z) => pc?.startsWith(z))
  );

  let calculatedFees = {};

  if (inCongestionZone) calculatedFees.congestion = ZONE_FEES.CONGESTION_CHARGE;

  if (isULEZNonCompliant) calculatedFees.ulez = ZONE_FEES.ULEZ_NON_COMPLIANT;

  if (airport) {
    const aFees = AIRPORT_FEES[airport];
    calculatedFees.airport =
      (airport1 ? aFees.pickup : 0) + (airport2 ? aFees.dropoff : 0);
  }

  return calculatedFees;
}
