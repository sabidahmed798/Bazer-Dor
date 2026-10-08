import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import PriceDownSection from "@/components/PriceDownSection";
import PriceUpSection from "@/components/PriceUpSection";

export default function Home() {
  return (
    <div>
      <Marquee />
      <Banner />
      <PriceUpSection />
      <PriceDownSection />
    </div>
  );
}
