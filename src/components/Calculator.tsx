import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { pricingData } from "@/data/whatsappPricing";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const Calculator = () => {
  const [selectedCountry, setSelectedCountry] = useState(pricingData[0]);
  const [messagesPerDay, setMessagesPerDay] = useState(100);
  const [marketingPercentage, setMarketingPercentage] = useState(25);
  const [utilityPercentage, setUtilityPercentage] = useState(30);
  const [authenticationPercentage, setAuthenticationPercentage] = useState(25);
  const [servicePercentage, setServicePercentage] = useState(20);

  const calculateMonthlyCost = () => {
    const monthlyMessages = messagesPerDay * 30;
    const marketingMessages = (monthlyMessages * marketingPercentage) / 100;
    const utilityMessages = (monthlyMessages * utilityPercentage) / 100;
    const authMessages = (monthlyMessages * authenticationPercentage) / 100;
    const serviceMessages = (monthlyMessages * servicePercentage) / 100;

    const marketingCost = marketingMessages * selectedCountry.marketing;
    const utilityCost = utilityMessages * selectedCountry.utility;
    const authCost = authMessages * selectedCountry.authentication;
    const serviceCost = 0; // Service messages are free

    return {
      marketing: marketingCost,
      utility: utilityCost,
      authentication: authCost,
      service: serviceCost,
      total: marketingCost + utilityCost + authCost + serviceCost
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
            <div className="space-y-4">
              <label className="block text-sm font-medium">Select Country</label>
              <Select
                value={selectedCountry.market}
                onValueChange={(value) => 
                  setSelectedCountry(pricingData.find(p => p.market === value) || pricingData[0])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pricingData.map((country) => (
                    <SelectItem key={country.market} value={country.market}>
                      {country.market}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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