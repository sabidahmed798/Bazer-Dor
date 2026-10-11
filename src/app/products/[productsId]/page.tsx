import Link from "next/link";
import { notFound } from "next/navigation";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: Market[];
};

type Props = {
  params: Promise<{
    productsId: string;
  }>;
};

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const formatPrice = (value: number) => `${formatNumber(value)} টাকা`;

const getUnit = (unit?: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    gram: "গ্রাম",
  };

  return units[unit?.toLowerCase() || ""] || unit || "কেজি";
};

async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  // API সরাসরি Product object রিটার্ন করে
  const data: Product = await response.json();

  if (!data || !data.id || !data.nameBn) {
    return null;
  }

  return data;
}

export default async function ProductsDetails({ params }: Props) {
  const { productsId } = await params;

  let product: Product | null;

  try {
    product = await getProduct(productsId);
  } catch {
    return (
      <main className="min-h-screen bg-[#f0f5ef] px-4 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl border border-[#e5ece2] bg-white p-6">
          <h1 className="text-lg font-bold text-gray-800">
            পণ্যের তথ্য লোড করা যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            ইন্টারনেট সংযোগ অথবা API সার্ভার পরীক্ষা করে আবার চেষ্টা করো।
          </p>

          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium text-green-700 hover:underline"
          >
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </main>
    );
  }

  if (!product) notFound();

  const markets = Array.isArray(product.markets) ? product.markets : [];

  const unit = getUnit(product.unit);

  // বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম
  const validMarkets = markets.filter(
    (market) =>
      Number.isFinite(Number(market.min)) &&
      Number.isFinite(Number(market.max)) &&
      Number(market.min) > 0 &&
      Number(market.max) > 0,
  );

  const minPrice =
    validMarkets.length > 0
      ? Math.min(...validMarkets.map((market) => market.min))
      : product.today;

  const maxPrice =
    validMarkets.length > 0
      ? Math.max(...validMarkets.map((market) => market.max))
      : product.today;

  // প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবর্তী গড়
  const averagePrice =
    validMarkets.length > 0
      ? validMarkets.reduce(
          (sum, market) => sum + (Number(market.min) + Number(market.max)) / 2,
          0,
        ) / validMarkets.length
      : product.today;

  const changeDirection = product.change?.dir ?? "same";
  const changePercentage = product.change?.pct ?? 0;

  const productImage = product.image || product.categoryIcon || "🛒";
  const isImageUrl = /^https?:\/\//i.test(productImage);

  return (
    <main className="min-h-screen bg-[#f0f5ef] px-3 py-4 text-[#292e29] sm:px-5 sm:py-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-[11px] text-[#747b74] sm:text-xs"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/categories/${encodeURIComponent(product.category)}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-[#303830]">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-[#e5ece2] bg-[#fbfcfa] p-3 shadow-sm sm:gap-5 sm:p-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f5ef] sm:h-16 sm:w-16">
              {isImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={productImage}
                  alt={product.nameBn}
                  className="h-full w-full object-contain p-1.5"
                />
              ) : (
                <span
                  className="text-3xl"
                  role="img"
                  aria-label={product.nameBn}
                >
                  {productImage}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-bold leading-6 sm:text-xl">
                {product.nameBn}
              </h1>

              <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                {product.categoryNameBn} · {unit}
              </p>

              <p className="mt-1 text-[10px] text-gray-600 sm:text-xs">
                সকল বাজারের তুলনামূলক দাম দেখুন
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="shrink-0 rounded-xl bg-[#f0f5ef] px-2.5 py-2.5 text-center sm:min-w-28 sm:px-4 sm:py-3">
            <p className="text-[10px] text-gray-500 sm:text-xs">আজকের দাম</p>

            <p className="mt-1 text-xl font-bold leading-tight sm:text-2xl">
              {formatNumber(product.today)}
            </p>

            <p className="mt-1 text-[10px] text-gray-500">টাকা / {unit}</p>

            <p
              className={`mt-1 text-[10px] font-semibold ${
                changeDirection === "up"
                  ? "text-red-600"
                  : changeDirection === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {changeDirection === "up"
                ? "▲"
                : changeDirection === "down"
                  ? "▼"
                  : "●"}{" "}
              {formatNumber(changePercentage)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mb-4 rounded-2xl border border-[#e5ece2] bg-[#fbfcfa] p-3 shadow-sm sm:p-5">
          <h2 className="mb-3 text-xs font-bold sm:text-sm">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e5ece2] bg-white p-3 sm:p-4">
              <p className="text-[11px] text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-lg font-bold text-[#398b55] sm:text-xl">
                {formatPrice(minPrice)}
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                বাজারগুলোর মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-xl border border-[#e5ece2] bg-white p-3 sm:p-4">
              <p className="text-[11px] text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-1 text-lg font-bold text-[#d74b4b] sm:text-xl">
                {formatPrice(maxPrice)}
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                বাজারগুলোর মধ্যে সর্বোচ্চ
              </p>
            </div>

            <div className="rounded-xl border border-[#e5ece2] bg-white p-3 sm:p-4">
              <p className="text-[11px] text-gray-500">গড় দাম</p>

              <p className="mt-1 text-lg font-bold text-[#398b55] sm:text-xl">
                {formatPrice(averagePrice)}
              </p>

              <p className="mt-1 text-[10px] text-gray-500">
                {formatNumber(validMarkets.length)}টি বাজারের গড়
              </p>
            </div>
          </div>
        </section>

        {/* Market Prices */}
        <section className="rounded-2xl border border-[#e5ece2] bg-[#fbfcfa] p-3 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-xs font-bold sm:text-sm">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <span className="rounded-full bg-[#f0f5ef] px-2.5 py-1 text-[10px] text-gray-600 sm:text-xs">
              মোট {formatNumber(markets.length)}টি বাজার
            </span>
          </div>

          {markets.length > 0 ? (
            <>
              {/* Mobile Cards */}
              <div className="space-y-2 md:hidden">
                {markets.map((market, index) => (
                  <article
                    key={`${market.market}-${index}`}
                    className="rounded-xl border border-[#e5ece2] bg-white p-3"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-xs font-semibold">
                          {market.market}
                        </h3>

                        <p className="mt-1 text-[10px] text-gray-500">
                          {market.division}
                        </p>
                      </div>

                      <span className="rounded-lg bg-[#f0f5ef] px-2 py-1 text-[10px] text-gray-600">
                        {unit}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-[#edf0eb] pt-3">
                      <div>
                        <p className="text-[10px] text-gray-500">সর্বনিম্ন</p>

                        <p className="mt-1 text-[11px] font-semibold text-green-700">
                          {formatNumber(market.min)} ৳
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] text-gray-500">সর্বোচ্চ</p>

                        <p className="mt-1 text-[11px] font-semibold text-red-600">
                          {formatNumber(market.max)} ৳
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] text-gray-500">গড় দাম</p>

                        <p className="mt-1 text-[11px] font-bold">
                          {formatNumber((market.min + market.max) / 2)} ৳
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden overflow-x-auto rounded-xl border border-[#e5ece2] md:block">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-[#f0f5ef] text-gray-600">
                      <th className="px-4 py-3 font-medium">বাজার</th>
                      <th className="px-4 py-3 font-medium">বিভাগ</th>
                      <th className="px-4 py-3 text-right font-medium">
                        সর্বনিম্ন
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        সর্বোচ্চ
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        গড় দাম
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-t border-[#e2e8df] transition hover:bg-[#eaf2e7] ${
                          index % 2 === 0 ? "bg-white" : "bg-[#f1f6ef]"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium">
                          {market.market}
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-4 py-3 text-right text-green-700">
                          {formatPrice(market.min)}
                        </td>

                        <td className="px-4 py-3 text-right text-red-600">
                          {formatPrice(market.max)}
                        </td>

                        <td className="px-4 py-3 text-right font-semibold">
                          {formatPrice((market.min + market.max) / 2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-[#dce5d9] py-10 text-center">
              <p className="text-sm text-gray-500">
                এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
              </p>
            </div>
          )}
        </section>

        {/* Price History */}
        <section className="mt-4 rounded-2xl border border-[#e5ece2] bg-[#fbfcfa] p-4 sm:p-5">
          <h2 className="mb-4 text-sm font-bold">দামের ইতিহাস</h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white p-3">
              <p className="text-[10px] text-gray-500 sm:text-xs">গতকাল</p>

              <p className="mt-2 text-sm font-bold sm:text-base">
                {formatPrice(product.yesterday)}
              </p>
            </div>

            <div className="rounded-xl bg-white p-3">
              <p className="text-[10px] text-gray-500 sm:text-xs">গত সপ্তাহ</p>

              <p className="mt-2 text-sm font-bold sm:text-base">
                {formatPrice(product.lastWeek)}
              </p>
            </div>

            <div className="rounded-xl bg-white p-3">
              <p className="text-[10px] text-gray-500 sm:text-xs">গত মাস</p>

              <p className="mt-2 text-sm font-bold sm:text-base">
                {formatPrice(product.lastMonth)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
