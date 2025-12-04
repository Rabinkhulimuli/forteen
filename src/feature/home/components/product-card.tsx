
import type { Product } from '../types/product-type';
import { BadgeInfoIcon, Star, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard ({ product, onViewDetails }:ProductCardProps){
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="text-yellow-400 opacity-70" />);
      } else {
        stars.push(<Star key={i} className="text-gray-300" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 product-card h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-start mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Tag className="mr-1 w-5 sm:w-6" /> {product.category}
          </span>
          <div className="hidden sm:flex items-center">
            {renderStars(product.rating.rate)}
            <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
          </div>
        </div>
        
        <div className="h-48 flex items-center justify-center mb-6">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 h-14">
          {product.title}
        </h3>
          <div className="flex items-center sm:hidden">
            {renderStars(product.rating.rate)}
            <span className="ml-2 text-sm text-gray-600">({product.rating.count})</span>
          </div>
        <div className="mt-4">
          <div className="flex flex-col gap-2 sm:flex-row justify-between sm:items-center">
            <div>
              <span className="text-3xl font-bold text-gray-900">Rs.{product.price}</span>
            </div>
            <button 
              onClick={() => onViewDetails(product)}
              className="flex cursor-pointer w-full sm:w-fit items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium"
            >
              <BadgeInfoIcon className="mr-2" /> Details
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};
