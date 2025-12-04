import React, { useState } from 'react';
import type { FilterState } from '../types/product-type';
import { Filter, Search, Sliders } from 'lucide-react';

interface SearchFilterProps {
  filterState: FilterState;
  categories: string[];
  onFilterChange: (filter: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  filterState, 
  categories, 
  onFilterChange, 
  onResetFilters 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchQuery: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ category: e.target.value });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    onFilterChange(type === 'min' ? { minPrice: numValue } : { maxPrice: numValue });
  };

  const handleRatingChange = (value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    onFilterChange({ minRating: numValue });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products by name, description, or category..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
              aria-label="Search products"
            />
          </div>
        </div>
        
        <div className="flex relative gap-2 items-center  sm:gap-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex w-full sm:w-fit items-center cursor-pointer cursor-pointer px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-medium"
          >
            <Sliders className="mr-2" /> {showAdvanced ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {(filterState.searchQuery || filterState.category !== 'all' || filterState.minPrice !== null || filterState.maxPrice !== null || filterState.minRating !== null) && (
            <button
              onClick={onResetFilters}
              className="px-4 py-3 cursor-pointer text-nowrap md:absolute top-14 border-red-100 border bg-white  text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors duration-300 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {showAdvanced && (
        <div className="border-t border-gray-200 pt-6 mt-6 animate-slideDown">
          <div className="flex items-center mb-4">
            <Filter className="text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filterState.category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                <input
                  type="number"
                  value={filterState.minPrice || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  placeholder="Min"
                  min="0"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                <input
                  type="number"
                  value={filterState.maxPrice || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  placeholder="Max"
                  min="0"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Rating
              </label>
              <select
                value={filterState.minRating || ''}
                onChange={(e) => handleRatingChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
              >
                <option value="">Any Rating</option>
                <option value="4">★★★★ & above</option>
                <option value="3">★★★ & above</option>
                <option value="2">★★ & above</option>
                <option value="1">★ & above</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;