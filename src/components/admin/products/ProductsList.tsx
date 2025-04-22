'use client'
import { useProduct } from '@/hooks/useProduct';
import AdminProductCard from './AdminProductCard';


export const ProductsList = () => {
  const { products } = useProduct();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products && products.map((product) => (
        <AdminProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
