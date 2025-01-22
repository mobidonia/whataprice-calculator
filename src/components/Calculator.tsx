import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { pricingData, PricingData } from "@/data/whatsappPricing";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import CountrySelect from "./CountrySelect";
import { countryFlags } from "@/constants/countryFlags";

interface CountryVolume {
  country: PricingData;
  messagesPerDay: number;
}

const Calculator = () => {
  const [selectedCountries, setSelectedCountries] = useState<CountryVolume[]>([
    { country: pricingData[0], messagesPerDay: 100 }
  ]);
  const [marketingPercentage, setMarketingPercentage] = useState(25);
  const [utilityPercentage, setUtilityPercentage] = useState(30);
  const [authenticationPercentage, setAuthenticationPercentage] = useState(25);
  const [servicePercentage, setServicePercentage] = useState(20);
  const [freeEntryPoint, setFreeEntryPoint] = useState(false);

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
      const monthlyMessages = messagesPerDay * 30;
      
      const marketingMessages = (monthlyMessages * marketingPercentage) / 100;
      const utilityMessages = (monthlyMessages * utilityPercentage) / 100;
      const authMessages = (monthlyMessages * authenticationPercentage) / 100;
      const serviceMessages = (monthlyMessages * servicePercentage) / 100;

      const freeEntryPointDiscount = freeEntryPoint ? 0.2 : 0;
      
      const marketingCost = marketingMessages * country.marketing * (1 - freeEntryPointDiscount);
      const utilityCost = utilityMessages * country.utility * (1 - freeEntryPointDiscount);
      const authCost = authMessages * country.authentication * (1 - freeEntryPointDiscount);
      const serviceCost = 0; // Service messages are free

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

  const costs = calculateMonthlyCost();
  const pieData = costs.byCountry.map(countryData => ({
    name: countryData.country,
    value: countryData.total,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  const totalDailyMessages = selectedCountries.reduce((acc, curr) => acc + curr.messagesPerDay, 0);
  const totalPercentage = marketingPercentage + utilityPercentage + authenticationPercentage + servicePercentage;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          WhatsApp Business API Pricing Calculator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card p-6 space-y-6">
            <CountrySelect
              selectedCountries={selectedCountries.map(cv => cv.country)}
              onValueChange={handleCountryAdd}
              data={pricingData}
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium">Messages per Day (Per Country)</label>
              {selectedCountries.map(({ country, messagesPerDay }) => (
                <div key={country.market} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {countryFlags[country.market] || "🌐"} {country.market}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {messagesPerDay} messages
                    </span>
                  </div>
                  <Slider
                    value={[messagesPerDay]}
                    onValueChange={(value) => updateCountryVolume(country.market, value[0])}
                    min={1}
                    max={1000}
                    step={1}
                    className="slider-track"
                  />
                </div>
              ))}
              <p className="text-sm text-muted-foreground text-right">
                Total: {totalDailyMessages} messages per day
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

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">Message Type Distribution</label>
                <span className={`text-sm ${totalPercentage > 100 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  Total: {totalPercentage}%
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm">Marketing ({marketingPercentage}%)</span>
                  <Slider
                    value={[marketingPercentage]}
                    onValueChange={(value) => updatePercentage('marketing', value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="slider-track"
                  />
                </div>
                <div>
                  <span className="text-sm">Utility ({utilityPercentage}%)</span>
                  <Slider
                    value={[utilityPercentage]}
                    onValueChange={(value) => updatePercentage('utility', value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="slider-track"
                  />
                </div>
                <div>
                  <span className="text-sm">Authentication ({authenticationPercentage}%)</span>
                  <Slider
                    value={[authenticationPercentage]}
                    onValueChange={(value) => updatePercentage('authentication', value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="slider-track"
                  />
                </div>
                <div>
                  <span className="text-sm">Service ({servicePercentage}%) - Free</span>
                  <Slider
                    value={[servicePercentage]}
                    onValueChange={(value) => updatePercentage('service', value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="slider-track"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Cost Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number | string) => {
                    if (typeof value === 'number') {
                      return `$${value.toFixed(2)}`;
                    }
                    return value;
                  }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-4">
              {costs.byCountry.map((countryData) => (
                <div key={countryData.country} className="space-y-2 border-b border-white/10 pb-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium flex items-center gap-2">
                      <span className="text-xl">{countryFlags[countryData.country] || "🌐"}</span>
                      {countryData.country}
                    </h4>
                    {selectedCountries.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCountryRemove(countryData.country)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="flex justify-between">
                    <span>Marketing:</span>
                    <span>${countryData.marketing.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Utility:</span>
                    <span>${countryData.utility.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Authentication:</span>
                    <span>${countryData.authentication.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Service:</span>
                    <span className="text-green-400">Free</span>
                  </p>
                  {freeEntryPoint && (
                    <p className="flex justify-between text-green-400">
                      <span>Free Entry Point Savings:</span>
                      <span>-${countryData.savings.toFixed(2)}</span>
                    </p>
                  )}
                  <p className="flex justify-between font-medium">
                    <span>Subtotal:</span>
                    <span>${countryData.total.toFixed(2)}</span>
                  </p>
                </div>
              ))}
              <div className="border-t border-white/10 mt-4 pt-4">
                <p className="flex justify-between font-semibold text-lg">
                  <span>Total Monthly Cost:</span>
                  <span>${costs.total.toFixed(2)}</span>
                </p>
                {freeEntryPoint && (
                  <p className="flex justify-between text-green-400 font-medium">
                    <span>Total Savings:</span>
                    <span>-${costs.totalSavings.toFixed(2)}</span>
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;