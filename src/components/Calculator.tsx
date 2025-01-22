import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { pricingData, PricingData } from "@/data/whatsappPricing";
import CountrySelect from "./CountrySelect";
import MessageTypeDistribution from "./MessageTypeDistribution";
import CostBreakdown from "./CostBreakdown";
import { Slider } from "@/components/ui/slider";
import { countryFlags } from "@/constants/countryFlags";

interface CountryVolume {
  country: PricingData;
  messagesPerDay: number;
}

const Calculator = () => {
  const defaultCountry = pricingData.find(p => p.market === "United States") || pricingData[0];
  const [selectedCountries, setSelectedCountries] = useState<CountryVolume[]>([
    { country: defaultCountry, messagesPerDay: 100 }
  ]);
  const [marketingPercentage, setMarketingPercentage] = useState(25);
  const [utilityPercentage, setUtilityPercentage] = useState(30);
  const [authenticationPercentage, setAuthenticationPercentage] = useState(25);
  const [servicePercentage, setServicePercentage] = useState(20);
  const [freeEntryPoint, setFreeEntryPoint] = useState(false);
  const [isMonthlyVolume, setIsMonthlyVolume] = useState(false);

  const updatePercentage = (type: 'marketing' | 'utility' | 'authentication' | 'service', newValue: number) => {
    const getOtherPercentages = (excludeType: string) => {
      const percentages = {
        marketing: marketingPercentage,
        utility: utilityPercentage,
        authentication: authenticationPercentage,
        service: servicePercentage
      };
      delete percentages[excludeType as keyof typeof percentages];
      return Object.values(percentages);
    };

    const otherPercentagesSum = getOtherPercentages(type).reduce((sum, value) => sum + value, 0);
    const maxAllowed = 100 - otherPercentagesSum;
    const clampedValue = Math.min(newValue, maxAllowed);

    switch (type) {
      case 'marketing':
        setMarketingPercentage(clampedValue);
        break;
      case 'utility':
        setUtilityPercentage(clampedValue);
        break;
      case 'authentication':
        setAuthenticationPercentage(clampedValue);
        break;
      case 'service':
        setServicePercentage(clampedValue);
        break;
    }
  };

  const calculateMonthlyCost = () => {
    const costs = selectedCountries.map(({ country, messagesPerDay }) => {
      const monthlyMessages = isMonthlyVolume ? messagesPerDay : (messagesPerDay * 30);
      
      const marketingMessages = (monthlyMessages * marketingPercentage) / 100;
      const utilityMessages = (monthlyMessages * utilityPercentage) / 100;
      const authMessages = (monthlyMessages * authenticationPercentage) / 100;
      const serviceMessages = (monthlyMessages * servicePercentage) / 100;

      const freeEntryPointDiscount = freeEntryPoint ? 0.2 : 0;
      
      const marketingCost = marketingMessages * country.marketing * (1 - freeEntryPointDiscount);
      const utilityCost = utilityMessages * country.utility * (1 - freeEntryPointDiscount);
      const authCost = authMessages * country.authentication * (1 - freeEntryPointDiscount);
      const serviceCost = 0;

      return {
        country: country.market,
        marketing: marketingCost,
        utility: utilityCost,
        authentication: authCost,
        service: serviceCost,
        total: marketingCost + utilityCost + authCost + serviceCost,
        savings: freeEntryPointDiscount * (
          marketingMessages * country.marketing + 
          utilityMessages * country.utility + 
          authMessages * country.authentication
        )
      };
    });

    return {
      byCountry: costs,
      total: costs.reduce((acc, curr) => acc + curr.total, 0),
      totalSavings: costs.reduce((acc, curr) => acc + curr.savings, 0)
    };
  };

  const handleCountryAdd = (value: string) => {
    const country = pricingData.find(p => p.market === value);
    if (country && !selectedCountries.some(sc => sc.country.market === country.market)) {
      setSelectedCountries([...selectedCountries, { country, messagesPerDay: 100 }]);
    }
  };

  const handleCountryRemove = (market: string) => {
    if (selectedCountries.length > 1) {
      setSelectedCountries(selectedCountries.filter(c => c.country.market !== market));
    }
  };

  const updateCountryVolume = (market: string, volume: number) => {
    setSelectedCountries(selectedCountries.map(cv => 
      cv.country.market === market ? { ...cv, messagesPerDay: volume } : cv
    ));
  };

  const handleManualInput = (market: string, value: string) => {
    const numValue = parseInt(value.replace(/,/g, ''), 10) || 0;
    const maxValue = isMonthlyVolume ? 3000000 : 100000;
    const clampedValue = Math.min(Math.max(numValue, 1), maxValue);
    updateCountryVolume(market, clampedValue);
  };

  const costs = calculateMonthlyCost();
  const totalMessages = selectedCountries.reduce((acc, curr) => acc + curr.messagesPerDay, 0);
  const displayedTotalMessages = isMonthlyVolume ? totalMessages : (totalMessages * 30);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            WhatsApp Business API Pricing Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Estimate your messaging costs across different regions and message types
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Pricing data is sourced from the{" "}
            <a 
              href="https://developers.facebook.com/docs/whatsapp/pricing#free-entry-point-conversations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              official WhatsApp Business API pricing documentation
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card p-6 space-y-6">
            <CountrySelect
              selectedCountries={selectedCountries.map(cv => cv.country)}
              onValueChange={handleCountryAdd}
              data={pricingData}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">Messages Volume</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Daily</span>
                  <Switch
                    checked={isMonthlyVolume}
                    onCheckedChange={setIsMonthlyVolume}
                    id="volume-type"
                  />
                  <span className="text-sm text-muted-foreground">Monthly</span>
                </div>
              </div>

              {selectedCountries.map(({ country, messagesPerDay }) => (
                <div key={country.market} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {countryFlags[country.market] || "🌐"} {country.market}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={messagesPerDay.toLocaleString()}
                        onChange={(e) => handleManualInput(country.market, e.target.value)}
                        className="w-32 text-right text-sm"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        messages {isMonthlyVolume ? 'per month' : 'per day'}
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[messagesPerDay]}
                    onValueChange={(value) => updateCountryVolume(country.market, value[0])}
                    min={1}
                    max={isMonthlyVolume ? 3000000 : 100000}
                    step={1}
                    className="slider-track"
                  />
                </div>
              ))}
              <p className="text-sm text-muted-foreground text-right">
                Total: {displayedTotalMessages.toLocaleString()} messages per {isMonthlyVolume ? 'month' : 'day'}
              </p>
            </div>

            <div className="flex items-center space-x-2 py-4">
              <Switch
                checked={freeEntryPoint}
                onCheckedChange={setFreeEntryPoint}
                id="free-entry-point"
              />
              <label htmlFor="free-entry-point" className="text-sm font-medium">
                Include Free Entry Point Conversations
              </label>
            </div>

            <MessageTypeDistribution
              marketingPercentage={marketingPercentage}
              utilityPercentage={utilityPercentage}
              authenticationPercentage={authenticationPercentage}
              servicePercentage={servicePercentage}
              updatePercentage={updatePercentage}
            />
          </Card>

          <Card className="glass-card p-6">
            <CostBreakdown
              costs={costs}
              onRemoveCountry={handleCountryRemove}
              showRemoveButton={selectedCountries.length > 1}
              freeEntryPoint={freeEntryPoint}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
