export interface PricingData {
  market: string;
  currency: string;
  marketing: number;
  utility: number;
  authentication: number;
  service: number;
  authenticationInternational?: number;
}

export const pricingData: PricingData[] = [
  {
    market: "United States",
    currency: "$US",
    marketing: 0.0250,
    utility: 0.0040,
    authentication: 0.0135,
    service: 0
  },
  {
    market: "Canada",
    currency: "$US",
    marketing: 0.0250,
    utility: 0.0040,
    authentication: 0.0135,
    service: 0
  },
  {
    market: "Argentina",
    currency: "$US",
    marketing: 0.0618,
    utility: 0.0340,
    authentication: 0.0367,
    service: 0
  },
  {
    market: "Brazil",
    currency: "$US",
    marketing: 0.0625,
    utility: 0.0080,
    authentication: 0.0315,
    service: 0
  },
  {
    market: "Chile",
    currency: "$US",
    marketing: 0.0889,
    utility: 0.0200,
    authentication: 0.0527,
    service: 0
  },
  {
    market: "Colombia",
    currency: "$US",
    marketing: 0.0125,
    utility: 0.0002,
    authentication: 0.0077,
    service: 0
  },
  {
    market: "Egypt",
    currency: "$US",
    marketing: 0.1073,
    utility: 0.0052,
    authentication: 0.0618,
    service: 0
  },
  {
    market: "France",
    currency: "$US",
    marketing: 0.1432,
    utility: 0.0300,
    authentication: 0.0691,
    service: 0
  },
  {
    market: "Germany",
    currency: "$US",
    marketing: 0.1365,
    utility: 0.0550,
    authentication: 0.0768,
    service: 0
  },
  {
    market: "India",
    currency: "$US",
    marketing: 0.0107,
    utility: 0.0014,
    authentication: 0.0014,
    service: 0,
    authenticationInternational: 0.0280
  },
  {
    market: "Indonesia",
    currency: "$US",
    marketing: 0.0411,
    utility: 0.0200,
    authentication: 0.0300,
    service: 0,
    authenticationInternational: 0.1360
  },
  {
    market: "Israel",
    currency: "$US",
    marketing: 0.0353,
    utility: 0.0053,
    authentication: 0.0169,
    service: 0
  },
  {
    market: "Italy",
    currency: "$US",
    marketing: 0.0691,
    utility: 0.0300,
    authentication: 0.0378,
    service: 0
  },
  {
    market: "Malaysia",
    currency: "$US",
    marketing: 0.0860,
    utility: 0.0140,
    authentication: 0.0180,
    service: 0
  },
  {
    market: "Mexico",
    currency: "$US",
    marketing: 0.0436,
    utility: 0.0100,
    authentication: 0.0239,
    service: 0
  },
  {
    market: "Netherlands",
    currency: "$US",
    marketing: 0.1597,
    utility: 0.0500,
    authentication: 0.0720,
    service: 0
  },
  {
    market: "Nigeria",
    currency: "$US",
    marketing: 0.0516,
    utility: 0.0067,
    authentication: 0.0287,
    service: 0
  },
  {
    market: "Pakistan",
    currency: "$US",
    marketing: 0.0473,
    utility: 0.0054,
    authentication: 0.0228,
    service: 0
  },
  {
    market: "Peru",
    currency: "$US",
    marketing: 0.0703,
    utility: 0.0200,
    authentication: 0.0377,
    service: 0
  },
  {
    market: "Russia",
    currency: "$US",
    marketing: 0.0802,
    utility: 0.0400,
    authentication: 0.0429,
    service: 0
  },
  {
    market: "Saudi Arabia",
    currency: "$US",
    marketing: 0.0455,
    utility: 0.0115,
    authentication: 0.0226,
    service: 0
  },
  {
    market: "South Africa",
    currency: "$US",
    marketing: 0.0379,
    utility: 0.0076,
    authentication: 0.0180,
    service: 0
  },
  {
    market: "Spain",
    currency: "$US",
    marketing: 0.0615,
    utility: 0.0200,
    authentication: 0.0342,
    service: 0
  },
  {
    market: "Turkey",
    currency: "$US",
    marketing: 0.0109,
    utility: 0.0053,
    authentication: 0.0083,
    service: 0
  },
  {
    market: "United Arab Emirates",
    currency: "$US",
    marketing: 0.0384,
    utility: 0.0157,
    authentication: 0.0178,
    service: 0
  },
  {
    market: "United Kingdom",
    currency: "$US",
    marketing: 0.0529,
    utility: 0.0220,
    authentication: 0.0358,
    service: 0
  },
  {
    market: "Rest of Africa",
    currency: "$US",
    marketing: 0.0225,
    utility: 0.0040,
    authentication: 0.0144,
    service: 0
  },
  {
    market: "Rest of Asia Pacific",
    currency: "$US",
    marketing: 0.0732,
    utility: 0.0157,
    authentication: 0.0425,
    service: 0
  },
  {
    market: "Rest of Central & Eastern Europe",
    currency: "$US",
    marketing: 0.0860,
    utility: 0.0353,
    authentication: 0.0557,
    service: 0
  },
  {
    market: "Rest of Latin America",
    currency: "$US",
    marketing: 0.0740,
    utility: 0.0113,
    authentication: 0.0445,
    service: 0
  },
  {
    market: "Rest of Middle East",
    currency: "$US",
    marketing: 0.0341,
    utility: 0.0157,
    authentication: 0.0178,
    service: 0
  },
  {
    market: "Rest of Western Europe",
    currency: "$US",
    marketing: 0.0592,
    utility: 0.0300,
    authentication: 0.0378,
    service: 0
  },
  {
    market: "Other",
    currency: "$US",
    marketing: 0.0604,
    utility: 0.0077,
    authentication: 0.0304,
    service: 0
  }
];
