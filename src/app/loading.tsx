const CategoryLoading = () => {
  return (
    <main className="min-h-screen bg-[#f0f5ef] px-4 py-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Category heading */}
        <div className="mb-6 h-8 w-56 rounded-lg bg-gray-300" />

        {/* Sorting section */}
        <div className="mb-6 h-10 w-40 rounded-lg bg-gray-300" />

        {/* Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="mb-4 h-32 rounded-lg bg-gray-200" />
              <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mb-3 h-6 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-1/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryLoading;
