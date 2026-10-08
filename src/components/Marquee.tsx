import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
interface Headlines {
  nameBn: string;
  image: string;
  today: string;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}
const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data = await res.json();
  const headlines: Headlines[] = data;
  console.log(headlines);
  //   const headlines: Headlines[] = data.data;
  //   console.log(headlines);
  //   console.log("marque data", data);

  return (
    <div className="overflow-hidden">
      <MarqueeText className="bg-base-200 py-3" direction="right" duration={15}>
        {headlines.map((h) => (
          <span key={h.nameBn} className="inline-flex items-center gap-2 mx-6">
            <span className="font-semibold">{h.nameBn}</span>

            <span>৳{h.today}</span>

            <span className="text-sm">/ {h.unit}</span>

            <span
              className={
                h.change.dir === "up"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {h.change.dir === "up" ? "🔺" : "🔽"} {h.change.pct}%
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
