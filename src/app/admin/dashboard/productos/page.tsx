'use server';
import ProductCard from "@/components/admin/ProductCard";
import { productService } from "@/services/productService";
import Link from "next/link";

export default async function AdminProductPage() {
  const response = await productService.getAllProducts();
  const products = response.data;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl text-bold">Página de Productos</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products && products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className="mt-4">
        <Link href="/dashboard/productos/nuevo">
          <button className="p-4 bg-green-dark rounded-xl text-whiteygreen font-bold">Adicionar Producto</button>
        </Link>
      </div>
    </div>
  );
}


