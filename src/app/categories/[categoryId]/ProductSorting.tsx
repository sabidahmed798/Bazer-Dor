"use client";

import { useState } from "react";

interface ProductsI {
  id: string | number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  price?: number | string | null;
  today?: number | string;
  change?: {
    dir?: "up" | "down" | "same";
    pct?: number | string;
  };
}

interface ProductSortingProps {
  products: ProductsI[];
}

export default function ProductSorting({ products }: ProductSortingProps) {
  const [sort, setSort] = useState("default");

  const getPrice = (product: ProductsI) => {
    const value = product.price ?? product.today;

    if (value == null || value === "") {
      return null;
    }

    const price = Number(value);

    return Number.isFinite(price) ? price : null;
  };

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = getPrice(a);
    const priceB = getPrice(b);

    if (priceA === null) return 1;
    if (priceB === null) return -1;

    if (sort === "price-low") {
      return priceA - priceB;
    }

    if (sort === "price-high") {
      return priceB - priceA;
    }

    return 0;
  });

  return (
    <>
      {/* Toolbar */}{" "}
      <section className="mt-5 flex min-h-[53px] items-center justify-end gap-2 rounded-2xl border border-[#e1e8df] bg-[#fbfdfb] px-4 py-2">
        {" "}
        <span className="text-xs text-gray-500">দাম অনুযায়ী সাজান </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম কম থেকে বেশি</option>
          <option value="price-high">দাম বেশি থেকে কম</option>
        </select>
      </section>
      {/* Product Count */}
      <p className="my-3 text-xs text-gray-500">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>
      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const price = product.price ?? product.today;

            return (
              <article
                key={product.id}
                className="rounded-2xl border border-[#e1e8df] bg-[#fbfdfb] p-3 transition-colors duration-200 hover:border-[#cbdcc8]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-2xl">
                    {product.categoryIcon ?? "🛒"}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold text-[#252b25]">
                      {product.nameBn}
                    </h2>

                    <p className="mt-0.5 text-[11px] text-gray-500">
                      {product.categoryNameBn}
                    </p>
                  </div>
                </div>

                {/* Price and Status */}
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[11px] text-gray-500">আজকের দাম</p>

                    <p className="mt-0.5 text-base font-bold leading-5 text-[#252b25]">
                      {price != null && price !== "" ? (
                        <>
                          <span>৳ </span>
                          <span>{price}</span>
                        </>
                      ) : (
                        "দাম পাওয়া যায়নি"
                      )}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
                      product.change?.dir === "up"
                        ? "bg-green-50 text-green-700"
                        : product.change?.dir === "down"
                          ? "bg-red-50 text-red-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.change?.dir === "up"
                      ? "▲"
                      : product.change?.dir === "down"
                        ? "▼"
                        : "—"}
                    {product.change?.pct ?? "০.০"}%
                  </span>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="rounded-2xl border border-[#e1e8df] bg-[#fbfdfb] p-10 text-center">
          <p className="text-sm text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </>
  );
}
