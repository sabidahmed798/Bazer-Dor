// "use client";

// import { useEffect, useState } from "react";

// type Market = {
//   name?: string;
//   bazarName?: string;
//   marketName?: string;
//   district?: string;
//   location?: string;
//   min?: number;
//   max?: number;
//   average?: number;
//   avg?: number;
//   today?: number;
//   price?: number;
//   minPrice?: number;
//   maxPrice?: number;
//   avgPrice?: number;
// };

// type Product = {
//   id: number;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn: string;
//   categoryIcon: string;
//   image: string;
//   unit: string;
//   today: number;
//   yesterday: number;
//   lastWeek: number;
//   lastMonth: number;
//   change: {
//     dir: string;
//     pct: number;
//   };
//   markets: Market[];
// };

// type ProductsDetailsProps = {
//   params: Promise<{
//     productsId: string;
//   }>;
// };

// const formatPrice = (price: number) =>
//   `${new Intl.NumberFormat("bn-BD", {
//     maximumFractionDigits: 2,
//   }).format(price)} টাকা`;

// const getUnit = (unit: string) => {
//   const units: Record<string, string> = {
//     kg: "কেজি",
//     liter: "লিটার",
//     litre: "লিটার",
//     dozen: "ডজন",
//     piece: "পিস",
//     pcs: "পিস",
//     gram: "গ্রাম",
//   };

//   return units[unit?.toLowerCase()] || unit || "কেজি";
// };

// const getMarketName = (market: Market) =>
//   market.name || market.bazarName || market.marketName || "বাজারের নাম";

// const getMarketMin = (market: Market) =>
//   Number(market.minPrice ?? market.min ?? market.today ?? market.price ?? 0);

// const getMarketMax = (market: Market) =>
//   Number(market.maxPrice ?? market.max ?? market.today ?? market.price ?? 0);

// const getMarketAverage = (market: Market) =>
//   Number(
//     market.avgPrice ??
//       market.average ??
//       market.avg ??
//       market.today ??
//       market.price ??
//       0,
//   );

// const ProductsDetails = ({ params }: ProductsDetailsProps) => {
//   const [productsId, setProductsId] = useState("");
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     const loadProduct = async () => {
//       try {
//         const resolvedParams = await params;

//         if (cancelled) return;

//         setProductsId(resolvedParams.productsId);

//         const response = await fetch(
//           `${process.env.BACKEND_URL}/api/bazardor/products/${resolvedParams.productsId}`,
//         );
//         // (`${process.env.BACKEND_URL}/api/bazardor/categories`)
//         // { cache: "no-store" },

//         if (!response.ok) {
//           throw new Error("পণ্যের তথ্য পাওয়া যায়নি।");
//         }

//         const data = await response.json();

//         if (!cancelled) {
//           const result = data.product ?? data.data ?? data;
//           setProduct(result);
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setError(
//             err instanceof Error ? err.message : "তথ্য লোড করতে সমস্যা হয়েছে।",
//           );
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     loadProduct();

//     return () => {
//       cancelled = true;
//     };
//   }, [params]);

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-[#f0f5ef] px-4 py-10">
//         <div className="mx-auto max-w-6xl animate-pulse rounded-xl bg-white p-8 text-gray-500">
//           পণ্যের তথ্য লোড হচ্ছে...
//         </div>
//       </main>
//     );
//   }

//   if (error || !product) {
//     return (
//       <main className="min-h-screen bg-[#f0f5ef] px-4 py-10">
//         <div className="mx-auto max-w-6xl rounded-xl bg-white p-8">
//           <h1 className="text-xl font-bold text-gray-800">
//             {error || "পণ্য পাওয়া যায়নি"}
//           </h1>
//           <p className="mt-2 text-sm text-gray-500">Product ID: {productsId}</p>
//         </div>
//       </main>
//     );
//   }

//   const markets = product.markets || [];

//   const marketPrices = markets.map((market) => ({
//     min: getMarketMin(market),
//     max: getMarketMax(market),
//     average: getMarketAverage(market),
//   }));

//   const validMinPrices = marketPrices
//     .map((item) => item.min)
//     .filter((price) => price > 0);

//   const validMaxPrices = marketPrices
//     .map((item) => item.max)
//     .filter((price) => price > 0);

//   const validAveragePrices = marketPrices
//     .map((item) => item.average)
//     .filter((price) => price > 0);

//   const minPrice =
//     validMinPrices.length > 0 ? Math.min(...validMinPrices) : product.today;

//   const maxPrice =
//     validMaxPrices.length > 0 ? Math.max(...validMaxPrices) : product.today;

//   const averagePrice =
//     validAveragePrices.length > 0
//       ? validAveragePrices.reduce((sum, price) => sum + price, 0) /
//         validAveragePrices.length
//       : product.today;

//   const unit = getUnit(product.unit);
//   const priceUnit = `টাকা / ${unit}`;

//   return (
//     <main className="min-h-screen bg-[#f0f5ef] px-3 py-5 text-[#252b26] sm:px-5 sm:py-7">
//       <div className="mx-auto max-w-6xl">
//         {/* Breadcrumb */}
//         <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
//           <span>হোম</span>
//           <span>/</span>
//           <span>বাজার দর</span>
//           <span>/</span>
//           <span>{product.nameBn}</span>
//         </nav>

//         {/* Product Summary */}
//         <section className="mb-4 flex flex-col gap-4 rounded-xl border border-[#e7eee5] bg-[#fbfcfa] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
//           <div className="flex min-w-0 items-center gap-4">
//             <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ee] text-3xl sm:h-16 sm:w-16 sm:text-4xl">
//               {product.image || product.categoryIcon || "🛒"}
//             </div>

//             <div className="min-w-0">
//               <h1 className="text-xl font-bold sm:text-2xl">
//                 {product.nameBn}
//               </h1>

//               <p className="mt-1 text-xs text-gray-500 sm:text-sm">
//                 {product.categoryNameBn} · {priceUnit}
//               </p>

//               <div className="mt-2 flex flex-wrap items-center gap-2">
//                 <span className="rounded-full bg-[#e7f4e9] px-2.5 py-1 text-xs font-medium text-[#36834a]">
//                   {product.categoryNameBn}
//                 </span>

//                 <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
//                   প্রতি {unit}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between gap-4 rounded-lg bg-[#f3f7f1] px-4 py-3 sm:min-w-40 sm:flex-col sm:items-end sm:bg-transparent sm:px-0">
//             <div>
//               <p className="text-xs text-gray-500">আজকের বাজার দর</p>
//               <p className="mt-1 text-2xl font-bold">
//                 {formatPrice(product.today)}
//               </p>
//               <p className="text-xs text-gray-500">{priceUnit}</p>
//             </div>

//             <p
//               className={`text-xs font-semibold ${
//                 product.change?.dir === "up"
//                   ? "text-red-600"
//                   : product.change?.dir === "down"
//                     ? "text-green-600"
//                     : "text-gray-500"
//               }`}
//             >
//               {product.change?.dir === "up"
//                 ? "▲"
//                 : product.change?.dir === "down"
//                   ? "▼"
//                   : "●"}{" "}
//               {new Intl.NumberFormat("bn-BD", {
//                 maximumFractionDigits: 2,
//               }).format(product.change?.pct ?? 0)}
//               %
//             </p>
//           </div>
//         </section>

//         {/* Price Summary */}
//         <section className="mb-4 rounded-xl border border-[#e7eee5] bg-[#fbfcfa] p-4 sm:p-5">
//           <h2 className="mb-4 text-sm font-bold sm:text-base">
//             দামের সারসংক্ষেপ
//           </h2>

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//             <div className="rounded-xl border border-[#e7eee5] bg-white p-4">
//               <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
//               <p className="mt-2 text-xl font-bold text-green-600">
//                 {formatPrice(minPrice)}
//               </p>
//               <p className="mt-1 text-xs text-gray-500">{priceUnit}</p>
//             </div>

//             <div className="rounded-xl border border-[#e7eee5] bg-white p-4">
//               <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
//               <p className="mt-2 text-xl font-bold text-red-600">
//                 {formatPrice(maxPrice)}
//               </p>
//               <p className="mt-1 text-xs text-gray-500">{priceUnit}</p>
//             </div>

//             <div className="rounded-xl border border-[#e7eee5] bg-white p-4">
//               <p className="text-xs text-gray-500">গড় দাম</p>
//               <p className="mt-2 text-xl font-bold text-[#398b55]">
//                 {formatPrice(averagePrice)}
//               </p>
//               <p className="mt-1 text-xs text-gray-500">
//                 {markets.length}টি বাজারের গড়
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Market-wise Price Table */}
//         <section className="rounded-xl border border-[#e7eee5] bg-[#fbfcfa] p-4 sm:p-5">
//           <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
//             <h2 className="text-sm font-bold sm:text-base">
//               বাজারভিত্তিক আজকের দাম
//             </h2>

//             <span className="text-xs text-gray-500">
//               মোট {new Intl.NumberFormat("bn-BD").format(markets.length)}টি
//               বাজার
//             </span>
//           </div>

//           {markets.length > 0 ? (
//             <>
//               {/* Mobile cards */}
//               <div className="space-y-3 md:hidden">
//                 {markets.map((market, index) => (
//                   <div
//                     key={`${getMarketName(market)}-${index}`}
//                     className="rounded-lg border border-[#e7eee5] bg-white p-3"
//                   >
//                     <div className="mb-3 flex items-start justify-between gap-3">
//                       <div>
//                         <p className="text-sm font-semibold">
//                           {getMarketName(market)}
//                         </p>
//                         <p className="mt-1 text-xs text-gray-500">
//                           {market.district ||
//                             market.location ||
//                             "স্থানীয় বাজার"}
//                         </p>
//                       </div>

//                       <span className="rounded-md bg-[#e7f4e9] px-2 py-1 text-xs text-green-700">
//                         {unit}
//                       </span>
//                     </div>

//                     <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
//                       <div>
//                         <p className="text-[11px] text-gray-500">সর্বনিম্ন</p>
//                         <p className="mt-1 text-xs font-semibold">
//                           {formatPrice(getMarketMin(market))}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-[11px] text-gray-500">সর্বোচ্চ</p>
//                         <p className="mt-1 text-xs font-semibold">
//                           {formatPrice(getMarketMax(market))}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-[11px] text-gray-500">গড় দাম</p>
//                         <p className="mt-1 text-xs font-semibold text-green-700">
//                           {formatPrice(getMarketAverage(market))}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Desktop table */}
//               <div className="hidden overflow-x-auto rounded-lg border border-[#e7eee5] md:block">
//                 <table className="w-full border-collapse text-left text-sm">
//                   <thead>
//                     <tr className="bg-[#f5f8f3] text-xs text-gray-500">
//                       <th className="px-4 py-3 font-medium">বাজার</th>
//                       <th className="px-4 py-3 font-medium">বিভাগ / এলাকা</th>
//                       <th className="px-4 py-3 text-right font-medium">
//                         সর্বনিম্ন
//                       </th>
//                       <th className="px-4 py-3 text-right font-medium">
//                         সর্বোচ্চ
//                       </th>
//                       <th className="px-4 py-3 text-right font-medium">
//                         গড় দাম
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {markets.map((market, index) => (
//                       <tr
//                         key={`${getMarketName(market)}-${index}`}
//                         className={`border-t border-[#e7eee5] ${
//                           index % 2 === 0 ? "bg-white" : "bg-[#f2f6f0]"
//                         }`}
//                       >
//                         <td className="px-4 py-3 font-medium">
//                           {getMarketName(market)}
//                         </td>

//                         <td className="px-4 py-3 text-gray-600">
//                           {market.district || market.location || "—"}
//                         </td>

//                         <td className="px-4 py-3 text-right">
//                           {formatPrice(getMarketMin(market))}
//                         </td>

//                         <td className="px-4 py-3 text-right">
//                           {formatPrice(getMarketMax(market))}
//                         </td>

//                         <td className="px-4 py-3 text-right font-semibold text-green-700">
//                           {formatPrice(getMarketAverage(market))}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           ) : (
//             <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center">
//               <p className="text-sm text-gray-500">
//                 এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
//               </p>
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default ProductsDetails;
import { notFound } from "next/navigation";

type Market = {
  market?: string;
  name?: string;
  bazarName?: string;
  marketName?: string;
  division?: string;
  district?: string;
  location?: string;
  min?: number;
  max?: number;
  average?: number;
  avg?: number;
  today?: number;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
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
    dir: string;
    pct: number;
  };
  markets?: Market[];
};

type Props = {
  params: Promise<{
    productsId: string;
  }>;
};

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

const getMarketName = (market: Market) =>
  market.market ||
  market.name ||
  market.bazarName ||
  market.marketName ||
  "বাজারের নাম";

const getMarketDivision = (market: Market) =>
  market.division || market.district || market.location || "—";

const getMarketMin = (market: Market) =>
  Number(market.minPrice ?? market.min ?? market.today ?? market.price ?? 0);

const getMarketMax = (market: Market) =>
  Number(market.maxPrice ?? market.max ?? market.today ?? market.price ?? 0);

const getMarketAverage = (market: Market) => {
  const average = Number(market.avgPrice ?? market.average ?? market.avg ?? 0);

  if (average > 0) return average;

  const min = getMarketMin(market);
  const max = getMarketMax(market);

  if (min > 0 && max > 0) return (min + max) / 2;

  return min || max;
};

async function getProduct(id: string): Promise<Product | null> {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_URL .env ফাইলে সেট করা নেই।");
  }

  const response = await fetch(
    `${backendUrl.replace(/\/+$/, "")}/api/bazardor/products/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  const product = data?.product ?? data?.data ?? data;

  if (!product || !product.id || !product.nameBn) {
    return null;
  }

  return product as Product;
}

export default async function ProductsDetails({ params }: Props) {
  const { productsId } = await params;

  let product: Product | null;

  try {
    product = await getProduct(productsId);
  } catch {
    return (
      <main className="min-h-screen bg-[#f0f5ef] px-4 py-10">
        <div className="mx-auto max-w-6xl rounded-xl border border-[#e5ece2] bg-white p-6">
          <h1 className="text-xl font-bold text-gray-800">
            পণ্যের তথ্য লোড করা যায়নি।
          </h1>
          <p className="mt-2 text-sm text-gray-500">Product ID: {productsId}</p>
          <p className="mt-2 text-sm text-gray-500">
            BACKEND_URL এবং API endpoint যাচাই করো।
          </p>
        </div>
      </main>
    );
  }

  if (!product) notFound();

  const markets = Array.isArray(product.markets) ? product.markets : [];
  const unit = getUnit(product.unit);
  const priceUnit = `টাকা / ${unit}`;

  const validMinPrices = markets
    .map(getMarketMin)
    .filter((price) => price > 0 && Number.isFinite(price));

  const validMaxPrices = markets
    .map(getMarketMax)
    .filter((price) => price > 0 && Number.isFinite(price));

  const validAveragePrices = markets
    .map(getMarketAverage)
    .filter((price) => price > 0 && Number.isFinite(price));

  const minPrice =
    validMinPrices.length > 0 ? Math.min(...validMinPrices) : product.today;

  const maxPrice =
    validMaxPrices.length > 0 ? Math.max(...validMaxPrices) : product.today;

  const averagePrice =
    validAveragePrices.length > 0
      ? validAveragePrices.reduce((sum, price) => sum + price, 0) /
        validAveragePrices.length
      : product.today;

  const changeDirection = product.change?.dir;
  const changePercentage = product.change?.pct ?? 0;

  return (
    <main className="min-h-screen bg-[#f0f5ef] px-3 py-5 text-[#252b26] sm:px-5 sm:py-7">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <a href="/" className="hover:text-green-700">
            হোম
          </a>
          <span>›</span>
          <a href="/product" className="hover:text-green-700">
            বাজার দর
          </a>
          <span>›</span>
          <span>{product.nameBn}</span>
        </nav>

        {/* Product summary */}
        <section className="mb-4 flex flex-col gap-4 rounded-xl border border-[#e5ece2] bg-[#fbfcfa] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f4ee] sm:h-16 sm:w-16">
              {product.image && /^https?:\/\//i.test(product.image) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.nameBn}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <span className="text-3xl">{product.categoryIcon || "🛒"}</span>
              )}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold sm:text-2xl">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {product.categoryNameBn} · {priceUnit}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#e7f4e9] px-2.5 py-1 text-xs font-medium text-[#36834a]">
                  {product.categoryNameBn}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                  প্রতি {unit}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg bg-[#f3f7f1] px-4 py-3 sm:min-w-40 sm:flex-col sm:items-end sm:bg-transparent sm:px-0">
            <div>
              <p className="text-xs text-gray-500">আজকের বাজার দর</p>
              <p className="mt-1 text-2xl font-bold">
                {formatPrice(product.today)}
              </p>
              <p className="text-xs text-gray-500">{priceUnit}</p>
            </div>

            <p
              className={`text-xs font-semibold ${
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

        {/* Price summary */}
        <section className="mb-4 rounded-xl border border-[#e5ece2] bg-[#fbfcfa] p-4 sm:p-5">
          <h2 className="mb-4 text-sm font-bold sm:text-base">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e5ece2] bg-white p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-xl font-bold text-green-600">
                {formatPrice(minPrice)}
              </p>
              <p className="mt-1 text-xs text-gray-500">প্রতি {unit}</p>
            </div>

            <div className="rounded-xl border border-[#e5ece2] bg-white p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-2 text-xl font-bold text-red-600">
                {formatPrice(maxPrice)}
              </p>
              <p className="mt-1 text-xs text-gray-500">প্রতি {unit}</p>
            </div>

            <div className="rounded-xl border border-[#e5ece2] bg-white p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="mt-2 text-xl font-bold text-[#398b55]">
                {formatPrice(averagePrice)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {formatNumber(validAveragePrices.length)}টি বাজারের গড়
              </p>
            </div>
          </div>
        </section>

        {/* Market prices */}
        <section className="rounded-xl border border-[#e5ece2] bg-[#fbfcfa] p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-bold sm:text-base">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <span className="text-xs text-gray-500">
              মোট {formatNumber(markets.length)}টি বাজার
            </span>
          </div>

          {markets.length > 0 ? (
            <>
              {/* Mobile cards */}
              <div className="space-y-3 md:hidden">
                {markets.map((market, index) => (
                  <article
                    key={`${getMarketName(market)}-${index}`}
                    className="rounded-lg border border-[#e5ece2] bg-white p-3"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold">
                          {getMarketName(market)}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {getMarketDivision(market)}
                        </p>
                      </div>
                      <span className="rounded-md bg-[#e7f4e9] px-2 py-1 text-xs text-green-700">
                        {unit}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
                      <div>
                        <p className="text-[11px] text-gray-500">সর্বনিম্ন</p>
                        <p className="mt-1 text-xs font-semibold">
                          {formatPrice(getMarketMin(market))}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-500">সর্বোচ্চ</p>
                        <p className="mt-1 text-xs font-semibold">
                          {formatPrice(getMarketMax(market))}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-500">গড় দাম</p>
                        <p className="mt-1 text-xs font-semibold text-green-700">
                          {formatPrice(getMarketAverage(market))}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden overflow-x-auto rounded-lg border border-[#e5ece2] md:block">
                <table className="w-full border-collapse text-left text-xs lg:text-sm">
                  <thead>
                    <tr className="bg-[#f5f8f3] text-gray-500">
                      <th className="px-4 py-3 font-medium">বাজার</th>
                      <th className="px-4 py-3 font-medium">বিভাগ / এলাকা</th>
                      <th className="px-4 py-3 text-right font-medium">
                        সর্বনিম্ন
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        সর্বোচ্চ
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        গড় দাম
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${getMarketName(market)}-${index}`}
                        className={`border-t border-[#e5ece2] ${
                          index % 2 === 0 ? "bg-white" : "bg-[#f2f6f0]"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium">
                          {getMarketName(market)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {getMarketDivision(market)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatPrice(getMarketMin(market))}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {formatPrice(getMarketMax(market))}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-green-700">
                          {formatPrice(getMarketAverage(market))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center">
              <p className="text-sm text-gray-500">
                এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
