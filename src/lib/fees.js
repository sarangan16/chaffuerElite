// src/lib/fees.js

// --- Zone / ULEZ ---
export const ZONE_FEES = {
  CONGESTION_CHARGE: 15.0,
  ULEZ_NON_COMPLIANT: 12.5,
};

// --- Airport fees (dropoff/pickup) ---
export const AIRPORT_FEES = {
  HEATHROW: { dropoff: 6.0, pickup: 6.0 },
  GATWICK: { dropoff: 7.0, pickup: 7.5 },
  STANSTED: { dropoff: 7.0, pickup: 7.5 },
  LUTON: { dropoff: 6.0, pickup: 6.0 },
  CITY: { dropoff: 5.0, pickup: 5.0 },
  MANCHESTER: { dropoff: 5.0, pickup: 5.0 },
  BIRMINGHAM: { dropoff: 5.0, pickup: 5.0 },
  BRISTOL: { dropoff: 5.0, pickup: 5.0 },
  EDINBURGH: { dropoff: 5.0, pickup: 5.0 },
};

// --- Congestion Charge zone (outward codes) ---
export const CONGESTION_ZONE_POSTCODES = [
  "EC1",
  "EC2",
  "EC3",
  "EC4",
  "WC1",
  "WC2",
  "W1",
  "SW1",
  "SE1",
];

// --- Airport outward postcodes ---
export const AIRPORT_POSTCODES = {
  HEATHROW: ["TW6"],
  GATWICK: ["RH6"],
  STANSTED: ["CM24"],
  LUTON: ["LU2"],
  CITY: ["E16"],
  MANCHESTER: ["M90"],
  BIRMINGHAM: ["B26"],
  BRISTOL: ["BS48"],
  EDINBURGH: ["EH12"],
};
