import ProductForm from "@/components/admin/products/ProductForm";

export default function NewProductPage() {

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Producto 🎉 </h1>
      <ProductForm mode="create" id={""} />
    </div>
  );
}