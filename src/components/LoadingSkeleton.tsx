const LoadingSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {Array.from({ length: 20 }).map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-md overflow-hidden shadow-md animate-pulse"
      >
        <div className="bg-gray-200 aspect-square"></div>
        <div className="p-2">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
