import Link from "next/link";

interface Product {
  id: string | number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const PriceDownSection = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data: Product[] = await res.json();

  const products = data
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* Section Title */}
      <div className="mb-5 flex items-center gap-2">
        <span className="text-sm text-[#05893E]">▼</span>

        <h2 className="text-lg font-bold text-[#222] sm:text-xl">
          আজ দাম কমেছে
        </h2>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="block rounded-xl border border-[#e5ebe6] bg-[#f9fbf9] p-3.5 transition duration-200 hover:shadow-sm"
          >
            {/* Product Info */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1]">
                <div>{product.image}</div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#292929]">
                  {product.nameBn}
                </h3>

                <p className="mt-0.5 text-[11px] text-gray-500">
                  প্রতি {product.unit}
                </p>
              </div>
            </div>

            {/* Price Info */}
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-[11px] text-gray-500">আজকের দাম</p>

                <p className="mt-0.5 text-xl font-bold text-[#202020]">
                  {product.today}{" "}
                  <span className="text-xs font-normal text-gray-500">
                    টাকা
                  </span>
                </p>
              </div>

              <span className="rounded-md bg-[#eaf7ef] px-2 py-1 text-[10px] font-medium text-[#05893E]">
                ▼ {Math.abs(product.change.pct)}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PriceDownSection;
