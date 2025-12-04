
export default function ProductListSkeleton(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="h-10 w-72 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-4 w-52 bg-gray-200 rounded"></div>
      </div>

      <div className="max-w-7xl mx-auto mb-8">
        <div className="h-14 bg-white shadow-md rounded-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div className="h-5 w-60 bg-gray-300 rounded"></div>
        <div className="hidden md:block h-5 w-48 bg-gray-300 rounded"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col"
          >
            <div className="h-56 bg-gray-200 rounded-xl mb-4"></div>

            <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>

            <div className="flex justify-between items-center mt-auto">
              <div className="h-6 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

