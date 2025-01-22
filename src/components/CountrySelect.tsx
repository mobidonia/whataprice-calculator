import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingData } from "@/data/whatsappPricing";
import { countryFlags } from "@/constants/countryFlags";

interface CountrySelectProps {
  selectedCountries: PricingData[];
  onValueChange: (value: string) => void;
  data: PricingData[];
}

const CountrySelect = ({ selectedCountries, onValueChange, data }: CountrySelectProps) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Selected Countries</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedCountries.map((country) => (
          <div
            key={country.market}
            className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full"
          >
            <span className="text-xl">{countryFlags[country.market] || "🌐"}</span>
            <span>{country.market}</span>
          </div>
        ))}
      </div>
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <div className="flex items-center gap-2">
            <span className="text-xl">➕</span>
            <SelectValue placeholder="Add country..." />
          </div>
        </SelectTrigger>
        <SelectContent>
          {data
            .filter((country) => !selectedCountries.some(sc => sc.market === country.market))
            .map((country) => (
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