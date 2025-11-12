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
  GLASGOW: { dropoff: 5.0, pickup: 5.0 },
  BELFAST: { dropoff: 5.0, pickup: 5.0 },
  NEWCASTLE: { dropoff: 5.0, pickup: 5.0 },
  LEEDS_BRADFORD: { dropoff: 5.0, pickup: 5.0 },
};

// ✅ All UK Airports (for dropdowns)
export const AIRPORT_LOCATIONS = [
  "Heathrow Airport (LHR)",
  "Gatwick Airport (LGW)",
  "Stansted Airport (STN)",
  "Luton Airport (LTN)",
  "London City Airport (LCY)",
  "Manchester Airport (MAN)",
  "Birmingham Airport (BHX)",
  "Bristol Airport (BRS)",
  "Edinburgh Airport (EDI)",
  "Glasgow Airport (GLA)",
  "Belfast International Airport (BFS)",
  "Newcastle Airport (NCL)",
  "Leeds Bradford Airport (LBA)",
];

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
  GLASGOW: ["PA3"],
  BELFAST: ["BT29"],
  NEWCASTLE: ["NE13"],
  LEEDS_BRADFORD: ["LS19"],
};
