
import AdminProductCard from "@/components/admin/products/AdminProductCard";
import { productService } from "@/services/productService";
import { notFound } from "next/navigation";

export default async function AdminClientPage() {
  const response = await productService.getAllProducts();
  const products = response.data;

  if (!products) return notFound();

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl text-bold">Página de Productos</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <AdminProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}


