interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface AllProductsProps {
  products: Product[];
}

const AllProducts = ({ products }: AllProductsProps) => {
  return (
    // max-w-7xl
    <section className="container mx-auto w-full max-w-7xl px-3 py-6 sm:px-4">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#222]">সব পণ্য</h2>
        <p className="mt-1 text-xs text-gray-500">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <div
              key={product.id}
              className="h-[132px] rounded-2xl border border-[#e1e8e2] bg-[#fbfdfb] p-4"
            >
              {/* Product */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2f6f2] text-xl">
                    {product.image}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#222]">
                      {product.nameBn}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-gray-500">
                      {product.unit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-gray-500">আজকের দাম</p>

                  <p className="mt-0.5  text-xl font-bold leading-6 text-[#222]">
                    {product.today}
                    <span className="text-xs font-normal px-2">টাকা</span>
                  </p>
                </div>

                {/* Change */}
                {isUp && (
                  <span className="rounded-full bg-[#fff1f1] px-2.5 py-1 text-[10px] font-semibold text-[#d84b4b]">
                    ▲ {product.change.pct}%
                  </span>
                )}

                {isDown && (
                  <span className="rounded-full bg-[#eef9f1] px-2.5 py-1 text-[10px] font-semibold text-[#24904f]">
                    ▼ {Math.abs(product.change.pct)}%
                  </span>
                )}

                {!isUp && !isDown && (
                  <span className="rounded-full bg-[#f1f3f1] px-2.5 py-1 text-[10px] font-semibold text-[#555]">
                    — 0.0%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllProducts;
