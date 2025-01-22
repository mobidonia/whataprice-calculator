export interface PricingData {
  market: string;
  currency: string;
  marketing: number;
  utility: number;
  authentication: number;
  authenticationInternational?: number;
}

export const pricingData: PricingData[] = [
  {
    market: "Argentina",
    currency: "$US",
    marketing: 0.0618,
    utility: 0.0340,
    authentication: 0.0367
  },
  // ... Add all other countries from the data
  {
    market: "Brazil",
    currency: "$US",
    marketing: 0.0625,
    utility: 0.0080,
    authentication: 0.0315
  },
  {
    market: "India",
    currency: "$US",
    marketing: 0.0107,
    utility: 0.0014,
    authentication: 0.0014,
    authenticationInternational: 0.0280
  },
  {
    market: "United States",
    currency: "$US",
    marketing: 0.0250,
    utility: 0.0040,
    authentication: 0.0135
  }
];