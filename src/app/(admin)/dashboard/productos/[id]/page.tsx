import { productService } from "@/services/productService";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const response = await productService.getProductById(resolvedParams.id);
  const product = response.data;

  return (
    <div>
      <h1>Edición de Producto</h1>
      <p>Nombre: {product.name}</p>
      <p>Descripción: {product.description}</p>
      <p>Precio: {product.pricing.unitPrice}</p>
      {/* TODO: List all the categories */}
      <p>Categoría: {product.category?.name}</p>
    </div>
  );
}