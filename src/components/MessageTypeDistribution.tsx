import { Slider } from "@/components/ui/slider";

interface MessageTypeDistributionProps {
  marketingPercentage: number;
  utilityPercentage: number;
  authenticationPercentage: number;
  servicePercentage: number;
  updatePercentage: (type: 'marketing' | 'utility' | 'authentication' | 'service', value: number) => void;
}

const MessageTypeDistribution = ({
  marketingPercentage,
  utilityPercentage,
  authenticationPercentage,
  servicePercentage,
  updatePercentage,
}: MessageTypeDistributionProps) => {
  const totalPercentage = marketingPercentage + utilityPercentage + authenticationPercentage + servicePercentage;

  return (
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
      
      {/* Ad Banner */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-primary">
          Reduce Costs with Self-Hosted WhatsApp Marketing Solution
        </h3>
        <a 
          href="https://whatsbox.mobidonia.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-opacity hover:opacity-90"
        >
          <img 
            src="https://mobidonia-demo.imgix.net/img/WhatsBox.jpg" 
            alt="WhatsBox - WhatsApp Business Solution"
            className="w-full rounded-lg shadow-lg"
          />
        </a>
      </div>
    </div>
  );
};

export default MessageTypeDistribution;