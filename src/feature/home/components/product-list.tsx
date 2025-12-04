import React, { useState, useMemo, useCallback, memo } from 'react';
import type { FilterState, Product } from '../types/product-type';
import SearchFilter from './search-filter';
import { Tag } from 'lucide-react';
import ProductCard from './product-card';
import ProductDetail from './product-detail';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = memo(({ products }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    minPrice: null,
    maxPrice: null,
    minRating: null
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const categories = useMemo(() => 
    ['all', ...new Set(products.map(p => p.category))]
  , [products]);
  
  const filteredProducts = useMemo(() => 
    products.filter(product => {
      const matchesSearch = filterState.searchQuery === '' || 
        product.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(filterState.searchQuery.toLowerCase());
      
      const matchesCategory = filterState.category === 'all' || product.category === filterState.category;
      
      const matchesMinPrice = filterState.minPrice === null || product.price >= filterState.minPrice;
      const matchesMaxPrice = filterState.maxPrice === null || product.price <= filterState.maxPrice;
      
      const matchesRating = filterState.minRating === null || product.rating.rate >= filterState.minRating;
      
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesRating;
    })
  , [products, filterState]);
  
  const handleFilterChange = useCallback((filter: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...filter }));
  }, []);
  
  const handleResetFilters = useCallback(() => {
    setFilterState({
      searchQuery: '',
      category: 'all',
      minPrice: null,
      maxPrice: null,
      minRating: null
    });
  }, []);
  
  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);
  
  const handleCloseDetails = useCallback(() => {
    setSelectedProduct(null);
  }, []);
  
  const headerComponent = useMemo(() => (
    <header className="max-w-7xl mx-auto mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Modern Product Collection</h1>
      <p className="text-gray-600 text-lg">Discover our premium selection of high-quality products</p>
    </header>
  ), []);
  
  const resultsSummaryComponent = useMemo(() => (
    <div className="flex  items-center mb-8">
      <div>
        <p className="text-gray-700">
          Showing <span className="font-semibold text-blue-600">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold">{products.length}</span> products
          {(filterState.searchQuery || filterState.category !== 'all') && (
            <span className="ml-2 text-sm text-gray-500">
              {filterState.searchQuery && ` matching "${filterState.searchQuery}"`}
              {filterState.category !== 'all' && ` in ${filterState.category}`}
            </span>
          )}
        </p>
      </div>
    </div>
  ), [filteredProducts.length, products.length, filterState.searchQuery, filterState.category]);
  
  const emptyStateComponent = useMemo(() => (
    <div className="text-center py-16 bg-white rounded-2xl shadow">
      <div className="text-gray-400 text-6xl mb-4">
        <Tag />
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
      <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
      <button
        onClick={handleResetFilters}
        className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
      >
        Reset All Filters
      </button>
    </div>
  ), [handleResetFilters]);
  
  const productGridComponent = useMemo(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  ), [filteredProducts, handleViewDetails]);
  
  const productDetailModal = useMemo(() => 
    selectedProduct ? (
      <ProductDetail 
        product={selectedProduct} 
        onClose={handleCloseDetails}
      />
    ) : null
  , [selectedProduct, handleCloseDetails]);
  
  const contentComponent = useMemo(() => {
    if (filteredProducts.length === 0) {
      return emptyStateComponent;
    }
    return productGridComponent;
  }, [filteredProducts.length, emptyStateComponent, productGridComponent]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {headerComponent}
      
      <main className="max-w-7xl mx-auto">
        <SearchFilter 
          filterState={filterState}
          categories={categories.filter(cat => cat !== 'all')}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        
        {resultsSummaryComponent}
        
        {contentComponent}
      </main>
      
      {productDetailModal}
    </div>
  );
});

export default ProductList;