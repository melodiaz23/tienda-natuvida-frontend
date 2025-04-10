export { generateMetadata } from './metadata';
import ProductCard from "@/components/product/ProductCard";
import { productService } from "@/services/productService";


export default async function ProductsPage() {
  const response = await productService.getAllProducts();
  const products = response.data || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-nv-green-light text-center text-xl md:text-3xl font-bold mb-8 justify-center">Mejora tu día a día y dale a tu cuerpo lo que merece con productos naturales</h1>
      <div className="flex flex-wrap gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}