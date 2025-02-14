import { Button } from "@/components/ui/button";
import { X, Printer } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
interface CostData {
  country: string;
  marketing: number;
  utility: number;
  authentication: number;
  service: number;
  total: number;
  savings: number;
}
interface CostBreakdownProps {
  costs: {
    byCountry: CostData[];
    total: number;
    totalSavings: number;
  };
  onRemoveCountry: (market: string) => void;
  showRemoveButton: boolean;
  freeEntryPoint: boolean;
}
const CostBreakdown = ({
  costs,
  onRemoveCountry,
  showRemoveButton,
  freeEntryPoint
}: CostBreakdownProps) => {
  const {
    toast
  } = useToast();
  const pieData = costs.byCountry.map(countryData => ({
    name: countryData.country,
    value: countryData.total,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Error",
        description: "Please allow pop-ups to print the cost breakdown",
        variant: "destructive"
      });
      return;
    }
    const content = `
      <html>
        <head>
          <title>WhatsApp Business API Monthly Cost Breakdown</title>
          <style>
            @page {
              size: A4;
              margin: 1cm;
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 10pt;
              line-height: 1.3;
              margin: 0;
              padding: 15px;
            }
            .header {
              text-align: center;
              margin-bottom: 15px;
            }
            .header h1 {
              font-size: 16pt;
              margin: 0 0 5px 0;
            }
            .header p {
              margin: 0;
              color: #666;
            }
            .content {
              display: flex;
              gap: 20px;
            }
            .cost-breakdown {
              flex: 1;
            }
            .chat-messages {
              flex: 1;
              padding: 10px;
              background: #f5f5f5;
              border-radius: 5px;
            }
            .cost-item {
              margin: 5px 0;
              padding: 5px 0;
              border-bottom: 1px solid #eee;
            }
            .cost-item h2 {
              font-size: 12pt;
              margin: 0 0 5px 0;
            }
            .cost-item p {
              margin: 2px 0;
            }
            .total {
              margin-top: 10px;
              font-weight: bold;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>WhatsApp Business API Monthly Cost Breakdown</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="content">
            <div class="cost-breakdown">
              ${costs.byCountry.map(countryData => `
                <div class="cost-item">
                  <h2>${countryData.country}</h2>
                  <p>Marketing: $${countryData.marketing.toFixed(2)}</p>
                  <p>Utility: $${countryData.utility.toFixed(2)}</p>
                  <p>Authentication: $${countryData.authentication.toFixed(2)}</p>
                  <p>Service: Free</p>
                  ${freeEntryPoint ? `<p style="color: green;">Free Entry Point Savings: -$${countryData.savings.toFixed(2)}</p>` : ''}
                  <p><strong>Subtotal: $${countryData.total.toFixed(2)}</strong></p>
                </div>
              `).join('')}
              <div class="total">
                <p>Total Monthly Cost: $${costs.total.toFixed(2)}</p>
                ${freeEntryPoint ? `<p style="color: green;">Total Savings: -$${costs.totalSavings.toFixed(2)}</p>` : ''}
              </div>
            </div>
            <div class="chat-messages">
              <h2>Message Distribution</h2>
              <p>Marketing Messages: ${costs.byCountry.reduce((acc, curr) => acc + curr.marketing, 0).toFixed(2)} per month</p>
              <p>Utility Messages: ${costs.byCountry.reduce((acc, curr) => acc + curr.utility, 0).toFixed(2)} per month</p>
              <p>Authentication Messages: ${costs.byCountry.reduce((acc, curr) => acc + curr.authentication, 0).toFixed(2)} per month</p>
              <p>Service Messages: Free</p>
              ${freeEntryPoint ? `<p style="color: green;">Total Free Entry Point Savings: $${costs.totalSavings.toFixed(2)}</p>` : ''}
            </div>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();

    // Wait for content to load before printing
    printWindow.onload = () => {
      printWindow.print();
      toast({
        title: "Success",
        description: "Print window opened"
      });
    };
  };
  return <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Monthly Cost</h3>
        <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
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
        {costs.byCountry.map(countryData => <div key={countryData.country} className="space-y-2 border-b border-white/10 pb-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{countryData.country}</h4>
              {showRemoveButton && <Button variant="ghost" size="sm" onClick={() => onRemoveCountry(countryData.country)}>
                  <X className="h-4 w-4" />
                </Button>}
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
            {freeEntryPoint && <p className="flex justify-between text-green-400">
                <span>Free Entry Point Savings:</span>
                <span>-${countryData.savings.toFixed(2)}</span>
              </p>}
            <p className="flex justify-between font-medium">
              <span>Subtotal:</span>
              <span>${countryData.total.toFixed(2)}</span>
            </p>
          </div>)}
        <div className="border-t border-white/10 mt-4 pt-4">
          <p className="flex justify-between font-semibold text-lg">
            <span>Total Monthly Cost:</span>
            <span>${costs.total.toFixed(2)}</span>
          </p>
          {freeEntryPoint && <p className="flex justify-between text-green-400 font-medium">
              <span>Total Savings:</span>
              <span>-${costs.totalSavings.toFixed(2)}</span>
            </p>}
        </div>
      </div>
    </div>;
};
export default CostBreakdown;