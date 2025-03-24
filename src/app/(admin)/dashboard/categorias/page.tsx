import ProductCard from "@/components/admin/ProductCard";
import { productService } from "@/services/productService";

export default async function AdminCategoriesPage() {
  const response = await productService.getAllProducts();
  const products = response.data;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl text-bold">Página de Categorías</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <button>Adicionar Categoría</button>
    </div>
  );
}


