import { useEffect, useState, useCallback, useMemo } from 'react';
import type { Product } from './types/product-type';
import ProductList from './components/product-list';
import ProductDetailSkeleton from './components/product-list-skeleton';
import { apiClient } from '../../libs/apiClient';
import { AlertTriangle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await apiClient.get<Product[]>("/");
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const skeletonComponent = useMemo(() => <ProductDetailSkeleton />, []);

  const errorFetching = useMemo(() => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="text-red-500 text-6xl mb-4"><AlertTriangle/></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Products</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  ), [error, fetchProducts]);

  const emptyStateComponent = useMemo(() => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="text-gray-400 text-6xl mb-4"><ShoppingBag/></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
        <p className="text-gray-600">There are no products available at the moment.</p>
      </div>
    </div>
  ), []);

  if (isLoading) {
    return skeletonComponent;
  }

  if (error) {
    return errorFetching;
  }

  if (!isLoading && products.length === 0) {
    return emptyStateComponent;
  }

  return <ProductList products={products} />;
}