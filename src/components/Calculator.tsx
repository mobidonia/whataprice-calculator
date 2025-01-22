import React, { useState } from 'react';
import CountrySelect from './CountrySelect';
import MessageTypeDistribution from './MessageTypeDistribution';
import CostBreakdown from './CostBreakdown';
import { PricingData, pricingData } from '@/data/whatsappPricing';

const Calculator = () => {
  const [selectedCountries, setSelectedCountries] = useState<PricingData[]>([]);
  const [marketingPercentage, setMarketingPercentage] = useState(0);
  const [utilityPercentage, setUtilityPercentage] = useState(0);
  const [authenticationPercentage, setAuthenticationPercentage] = useState(0);
  const [servicePercentage, setServicePercentage] = useState(0);

  const updatePercentage = (type: 'marketing' | 'utility' | 'authentication' | 'service', value: number) => {
    switch (type) {
      case 'marketing':
        setMarketingPercentage(value);
        break;
      case 'utility':
        setUtilityPercentage(value);
        break;
      case 'authentication':
        setAuthenticationPercentage(value);
        break;
      case 'service':
        setServicePercentage(value);
        break;
    }
  };

  const handleCountrySelect = (market: string) => {
    const country = pricingData.find(c => c.market === market);
    if (country) {
      setSelectedCountries(prev => [...prev, country]);
    }
  };

  const handleRemoveCountry = (market: string) => {
    setSelectedCountries(prev => prev.filter(c => c.market !== market));
  };

  // Calculate costs for each country
  const calculateCosts = () => {
    const byCountry = selectedCountries.map(country => ({
      country: country.market,
      marketing: country.marketing * marketingPercentage,
      utility: country.utility * utilityPercentage,
      authentication: country.authentication * authenticationPercentage,
      service: 0, // Service messages are free
      total: (
        country.marketing * marketingPercentage +
        country.utility * utilityPercentage +
        country.authentication * authenticationPercentage
      ),
      savings: (
        country.marketing * marketingPercentage +
        country.utility * utilityPercentage +
        country.authentication * authenticationPercentage
      ) * 0.1 // Assuming 10% savings with free entry point
    }));

    const total = byCountry.reduce((acc, curr) => acc + curr.total, 0);
    const totalSavings = byCountry.reduce((acc, curr) => acc + curr.savings, 0);

    return {
      byCountry,
      total,
      totalSavings
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">
        WhatsApp Business API Pricing Calculator
      </h1>
      <p className="text-muted-foreground mb-8">
        Estimate your messaging costs across different regions and message types
      </p>
      <CountrySelect 
        selectedCountries={selectedCountries}
        onValueChange={handleCountrySelect}
        data={pricingData}
      />
      {selectedCountries.length > 0 && (
        <MessageTypeDistribution
          marketingPercentage={marketingPercentage}
          utilityPercentage={utilityPercentage}
          authenticationPercentage={authenticationPercentage}
          servicePercentage={servicePercentage}
          updatePercentage={updatePercentage}
        />
      )}
      {selectedCountries.length > 0 && (
        <CostBreakdown 
          costs={calculateCosts()}
          onRemoveCountry={handleRemoveCountry}
          showRemoveButton={true}
          freeEntryPoint={true}
        />
      )}
    </div>
  );
};

export default Calculator;