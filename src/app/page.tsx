import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
// import Marquee from "@/components/Marquee";
import PriceDownSection from "@/components/PriceDownSection";
import PriceUpSection from "@/components/PriceUpSection";

export default async function Home() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);
  const data = await res.json();
  // const headlines: Headlines[] = data;
  const allproduct = data;

  return (
    <div>
      <Banner />
      <PriceUpSection />
      <PriceDownSection />
      <AllProducts products={allproduct} />
    </div>
  );
}
