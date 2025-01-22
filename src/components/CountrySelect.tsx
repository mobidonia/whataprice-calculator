import { Flag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingData } from "@/data/whatsappPricing";

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
            <Flag className="h-4 w-4" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {data.map((country) => (
            <SelectItem key={country.market} value={country.market}>
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
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