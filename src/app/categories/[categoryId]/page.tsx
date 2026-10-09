import ProductSorting from "./ProductSorting";

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

type ProductsType = {
  params: Promise<{
    categoryId: string;
  }>;
};

const CategoryProduct = async ({ params }: ProductsType) => {
  const { categoryId } = await params;

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products?category=${categoryId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Product information could not be loaded.");
  }

  const products: ProductsI[] = await res.json();
  const categoryName = products[0]?.categoryNameBn || "all product";

  return (
    <main className="min-h-screen bg-[#f0f5ef] px-4 py-4 md:px-6 md:py-5">
      <div className="mx-auto max-w-7xl">
        {/* Category Header */}
        <section className="flex items-center gap-3 rounded-2xl border border-[#e1e8df] bg-[#fbfdfb] px-4 py-4 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff4ed] text-2xl">
            {products[0]?.categoryIcon ?? "🛒"}
          </div>

          <div>
            <h1 className="text-lg font-bold leading-6 text-[#252b25]">
              {categoryName}
            </h1>
            <p className="mt-0.5 text-xs text-gray-500">
              {products.length}টি পণ্যের তালিকা
            </p>
          </div>
        </section>

        {/* Product Sorting */}
        <ProductSorting products={products} />
      </div>
    </main>
  );
};

export default CategoryProduct;
