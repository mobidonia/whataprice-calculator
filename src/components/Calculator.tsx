import React, { useState } from 'react';
import CountrySelect from './CountrySelect';
import MessageTypeDistribution from './MessageTypeDistribution';
import CostBreakdown from './CostBreakdown';
import { PricingData, pricingData } from '@/data/whatsappPricing';

const Calculator = () => {
  const [selectedCountry, setSelectedCountry] = useState<PricingData | null>(null);
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">
        WhatsApp Business API Pricing Calculator
      </h1>
      <p className="text-muted-foreground mb-8">
        Estimate your messaging costs across different regions and message types
      </p>
      <CountrySelect 
        pricingData={pricingData} 
        onSelectCountry={setSelectedCountry} 
      />
      {selectedCountry && (
        <MessageTypeDistribution
          marketingPercentage={marketingPercentage}
          utilityPercentage={utilityPercentage}
          authenticationPercentage={authenticationPercentage}
          servicePercentage={servicePercentage}
          updatePercentage={updatePercentage}
        />
      )}
      {selectedCountry && (
        <CostBreakdown 
          selectedCountry={selectedCountry} 
          marketingPercentage={marketingPercentage}
          utilityPercentage={utilityPercentage}
          authenticationPercentage={authenticationPercentage}
          servicePercentage={servicePercentage}
        />
      )}
    </div>
  );
};

export default Calculator;
