export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your favorites...</p>
        </div>
      </div>
    );
  }