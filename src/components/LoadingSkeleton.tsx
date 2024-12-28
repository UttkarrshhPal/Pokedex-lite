export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="p-4">
            <div className="w-full pt-[100%] bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="mt-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
              <div className="flex gap-2 mt-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
