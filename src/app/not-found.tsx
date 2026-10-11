import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-base-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl bg-base-100 px-5 py-12 text-center shadow-xl sm:px-10 sm:py-16 md:px-16">
        {/* 404 Illustration */}
        <div className="relative mb-6">
          <h1 className="text-8xl font-black leading-none tracking-tight text-[#05893e] sm:text-9xl md:text-[150px]">
            404
          </h1>

          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-[#05893e] sm:w-28" />
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-xl font-bold text-base-content sm:text-2xl md:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-[#05893e] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#046f32] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05893e] sm:text-base"
        >
          <span aria-hidden="true" className="text-xl">
            ←
          </span>
          হোম পেজে ফিরে যান
        </Link>

        {/* Footer */}
        <div className="mt-10 border-t border-base-300 pt-5">
          <p className="text-sm font-semibold text-[#05893e]">বাজার দর</p>
          <p className="mt-1 text-xs text-base-content/50 sm:text-sm">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
