import { DemoSection } from "@/components/custom/home/DemoSection";
import { HeroSection } from "@/components/custom/home/HeroSection";
import HowItWorks from "@/components/custom/home/HowItWorks";
import { PricingSection } from "@/components/custom/home/PricingSection";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full ">
     <HeroSection/>
  <HowItWorks/>

    </div>
  );
}
