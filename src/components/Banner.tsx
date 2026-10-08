import Image from "next/image";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-4  bg-[##FAFCFA]">
      <div className="flex min-h-[220px] items-center  h-[283px] justify-between overflow-hidden rounded-[22px] border border-[#e2e8e3] bg-[##FAFCFA] px-6 py-7 sm:px-8 md:min-h-[220px] md:px-12">
        {/* Left Content */}
        <div className="max-w-2xl">
          <p className="mb-4  inline-block rounded-full bg-[#e5f5e9] px-3  text-sm font-medium text-[#16854b]">
            {date}
          </p>

          <h1 className="mt-2 text-2xl font-bold leading-tight text-[#1D271F] sm:text-3xl md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="mt-5 rounded-md bg-[#05893E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#05893E">
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden shrink-0 sm:block">
          <Image
            src="/banner.png"
            alt="Fresh vegetables and fruits"
            width={315}
            height={263}
            className="h-auto w-[315px] object-contain md:w-[263px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
