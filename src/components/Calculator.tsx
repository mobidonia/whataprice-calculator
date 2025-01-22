import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { pricingData } from "@/data/whatsappPricing";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import CountrySelect from "./CountrySelect";

const Calculator = () => {
  const [selectedCountry, setSelectedCountry] = useState(pricingData[0]);
  const [messagesPerDay, setMessagesPerDay] = useState(100);
  const [marketingPercentage, setMarketingPercentage] = useState(25);
  const [utilityPercentage, setUtilityPercentage] = useState(30);
  const [authenticationPercentage, setAuthenticationPercentage] = useState(25);
  const [servicePercentage, setServicePercentage] = useState(20);
  const [freeEntryPoint, setFreeEntryPoint] = useState(false);

  const calculateMonthlyCost = () => {
    const monthlyMessages = messagesPerDay * 30;
    const marketingMessages = (monthlyMessages * marketingPercentage) / 100;
    const utilityMessages = (monthlyMessages * utilityPercentage) / 100;
    const authMessages = (monthlyMessages * authenticationPercentage) / 100;
    const serviceMessages = (monthlyMessages * servicePercentage) / 100;

    // If free entry point is enabled, we assume 20% of conversations are free
    const freeEntryPointDiscount = freeEntryPoint ? 0.2 : 0;
    
    const marketingCost = marketingMessages * selectedCountry.marketing * (1 - freeEntryPointDiscount);
    const utilityCost = utilityMessages * selectedCountry.utility * (1 - freeEntryPointDiscount);
    const authCost = authMessages * selectedCountry.authentication * (1 - freeEntryPointDiscount);
    const serviceCost = 0; // Service messages are free

    return {
      marketing: marketingCost,
      utility: utilityCost,
      authentication: authCost,
      service: serviceCost,
      total: marketingCost + utilityCost + authCost + serviceCost,
      savings: freeEntryPointDiscount * (marketingMessages * selectedCountry.marketing + 
              utilityMessages * selectedCountry.utility + 
              authMessages * selectedCountry.authentication)
    };
  };

  const costs = calculateMonthlyCost();
  const pieData = [
    { name: "Marketing", value: costs.marketing, color: "#8B5CF6" },
    { name: "Utility", value: costs.utility, color: "#EC4899" },
    { name: "Authentication", value: costs.authentication, color: "#3B82F6" },
    { name: "Service (Free)", value: 0, color: "#10B981" }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          WhatsApp Business API Pricing Calculator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card p-6 space-y-6">
            <CountrySelect
              value={selectedCountry.market}
              onValueChange={(value) => 
                setSelectedCountry(pricingData.find(p => p.market === value) || pricingData[0])
              }
              data={pricingData}
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium">Messages per Day</label>
              <Slider
                value={[messagesPerDay]}
                onValueChange={(value) => setMessagesPerDay(value[0])}
                min={1}
                max={1000}
                step={1}
                className="slider-track"
              />
              <p className="text-sm text-muted-foreground text-right">{messagesPerDay} messages</p>
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
              <label className="block text-sm font-medium">Message Type Distribution</label>
              <div className="space-y-2">
                <div>
                  <span className="text-sm">Marketing ({marketingPercentage}%)</span>
                  <Slider
                    value={[marketingPercentage]}
                    onValueChange={(value) => setMarketingPercentage(value[0])}
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
                    onValueChange={(value) => setUtilityPercentage(value[0])}
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
                    onValueChange={(value) => setAuthenticationPercentage(value[0])}
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
                    onValueChange={(value) => setServicePercentage(value[0])}
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
            <div className="space-y-2 mt-4">
              <p className="flex justify-between">
                <span>Marketing:</span>
                <span>${costs.marketing.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Utility:</span>
                <span>${costs.utility.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Authentication:</span>
                <span>${costs.authentication.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Service:</span>
                <span className="text-green-400">Free</span>
              </p>
              {freeEntryPoint && (
                <p className="flex justify-between text-green-400">
                  <span>Free Entry Point Savings:</span>
                  <span>-${costs.savings.toFixed(2)}</span>
                </p>
              )}
              <div className="border-t border-white/10 mt-4 pt-4">
                <p className="flex justify-between font-semibold">
                  <span>Total Monthly Cost:</span>
                  <span>${costs.total.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;