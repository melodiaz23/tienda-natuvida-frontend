

import Link from "next/link";
import ProductProvider from '@/context/ProductContext';
import { ProductsList } from "@/components/admin/products/ProductsList";

export default function AdminProductPage() {


  return (
    <ProductProvider >
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-2xl text-bold">Página de Productos</h1>
        </div>
        <ProductsList />
        <div className="mt-4">
          <Link href="/admin/dashboard/productos/nuevo">
            <button className="p-4 bg-green-dark rounded-xl text-whiteygreen font-bold">Adicionar Producto</button>
          </Link>
        </div>
      </div>
    </ProductProvider>
  );
}


