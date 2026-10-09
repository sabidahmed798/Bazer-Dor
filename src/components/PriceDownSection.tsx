import Image from "next/image";

const PriceDownSection = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);

  const data = await res.json();

  const products = data
    .filter(
      (product: { change: { dir: string } }) => product.change.dir === "down",
    )
    .sort(
      (a: { change: { pct: number } }, b: { change: { pct: number } }) =>
        a.change.pct - b.change.pct,
    )
    .slice(0, 6);

  // console.log("Top 6 Price Down:", products);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* Section Title */}
      <div className="mb-5 flex items-center gap-2">
        <span className="text-sm text-[#05893E]">▼</span>

        <h2 className="text-lg font-bold text-[#222] sm:text-xl">
          আজ দাম কমেছে
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(
          (
            product: {
              id: string | number;
              nameBn: string;
              image: string;
              today: number;
              unit: string;
              change: {
                dir: string;
                pct: number;
              };
            },
            index: number,
          ) => (
            <div
              key={product.id || index}
              className="rounded-xl border border-[#e5ebe6] bg-[#f9fbf9] p-3.5 transition duration-200 hover:shadow-sm"
            >
              {/* Top */}
              <div className="flex items-center gap-3">
                {/* Product Image */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1]">
                  {/* <Image
                    src={product.image}
                    alt={product.nameBn}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  /> */}
                  <div>{product.image}</div>
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-sm font-semibold text-[#292929]">
                    {product.nameBn}
                  </h3>

                  <p className="mt-0.5 text-[11px] text-gray-500">
                    প্রতি {product.unit}
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-end justify-between">
                {/* Price */}
                <div>
                  <p className="text-[11px] text-gray-500">আজকের দাম</p>

                  <p className="mt-0.5 text-xl font-bold text-[#202020]">
                    {product.today}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      টাকা
                    </span>
                  </p>
                </div>

                {/* Price Change */}
                <span className="rounded-md bg-[#eaf7ef] px-2 py-1 text-[10px] font-medium text-[#05893E]">
                  ▼ {Math.abs(product.change.pct)}%
                </span>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default PriceDownSection;
