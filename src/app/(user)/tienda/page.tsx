import { productService } from "@/services/productService";

export default async function ProductsPage() {
  const response = await productService.getAllProducts();
  const products = response.data;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.pricing.unitPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}