import React from "react";
import type { Product } from "../types/product-type";
import {
  ArrowLeft,
  Star,
  Tag,
  X,
} from "lucide-react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({
  product,
  onClose,
}:ProductDetailProps){
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="text-yellow-400 w-5 h-5" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="text-yellow-400 opacity-70 w-5 h-5" />);
      } else {
        stars.push(<Star key={i} className="text-gray-300 w-5 h-5" />);
      }
    }

    return stars;
  };

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-hidden animate-slideUp">

        <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Product Details
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium bg-blue-100 text-blue-800">
              <Tag className="w-4 h-4 mr-1" /> {product.category}
            </span>

            <button
              onClick={onClose}
              className="p-2 rounded-full hidden sm:block cursor-pointer hover:bg-gray-100 transition"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-90px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            <div>
              <div className="h-64 md:h-80 flex items-center justify-center bg-gray-50 rounded-xl p-4 md:p-6 mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-between mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating.rate)}
                  <span className="ml-2 text-sm md:text-lg text-gray-700">
                    {product.rating.rate}
                    <span className="text-gray-500">
                      {" "}
                      ({product.rating.count} reviews)
                    </span>
                  </span>
                </div>

                <span className="text-2xl md:text-4xl font-bold text-gray-900">
                  Rs.{product.price}
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl  font-bold text-gray-900 mb-4 md:mb-6">
                {product.title}
              </h1>

              <div className="mb-6 md:mb-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 text-justify text-sm md:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <InfoBox title="Category" value={product.category} />
                <InfoBox title="Product ID" value={`#${product.id}`} />
                <InfoBox
                  title="Rating"
                  value={`${product.rating.rate} stars (${product.rating.count} reviews)`}
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

const InfoBox = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-gray-50 p-3 md:p-4 rounded-xl">
    <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">
      {title}
    </h4>
    <p className="text-gray-700 text-sm md:text-base">{value}</p>
  </div>
);

