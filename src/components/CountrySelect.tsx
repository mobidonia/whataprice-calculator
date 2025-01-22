import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingData } from "@/data/whatsappPricing";

// Map of country/region names to their corresponding flag emojis
const countryFlags: { [key: string]: string } = {
  "Argentina": "🇦🇷",
  "Brazil": "🇧🇷",
  "Chile": "🇨🇱",
  "Colombia": "🇨🇴",
  "Egypt": "🇪🇬",
  "France": "🇫🇷",
  "Germany": "🇩🇪",
  "India": "🇮🇳",
  "Indonesia": "🇮🇩",
  "Israel": "🇮🇱",
  "Italy": "🇮🇹",
  "Malaysia": "🇲🇾",
  "Mexico": "🇲🇽",
  "Netherlands": "🇳🇱",
  "Nigeria": "🇳🇬",
  "Pakistan": "🇵🇰",
  "Peru": "🇵🇪",
  "Russia": "🇷🇺",
  "Saudi Arabia": "🇸🇦",
  "South Africa": "🇿🇦",
  "Spain": "🇪🇸",
  "Turkey": "🇹🇷",
  "United Arab Emirates": "🇦🇪",
  "United Kingdom": "🇬🇧",
  "North America": "🌎",
  "Rest of Africa": "🌍",
  "Rest of Asia Pacific": "🌏",
  "Rest of Central & Eastern Europe": "🌍",
  "Rest of Latin America": "🌎",
  "Rest of Middle East": "🌍",
  "Rest of Western Europe": "🌍",
  "Other": "🌐"
};

interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  data: PricingData[];
}

const CountrySelect = ({ value, onValueChange, data }: CountrySelectProps) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Select Country</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <div className="flex items-center gap-2">
            <span className="text-xl">{countryFlags[value] || "🌐"}</span>
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {data.map((country) => (
            <SelectItem key={country.market} value={country.market}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{countryFlags[country.market] || "🌐"}</span>
                <span>{country.market}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;