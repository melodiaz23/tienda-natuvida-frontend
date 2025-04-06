
import ProductCard from "@/components/ProductCard";
import { productService } from "@/services/productService";


export default async function ProductsPage() {
  const response = await productService.getAllProducts();
  const products = response.data || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 justify-center">Tienda</h1>

      <div className="flex flex-wrap gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}