import ProductForm from "@/components/admin/products/ProductForm";
import { productService } from "@/services/productService";
import { ProductRequest } from "@/types/product.types";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: PageProps) {

  try {
    console.log("Resolved params:", (await params).id);
    const response = await productService.getProductById((await params).id);
    const product = response.data;

    if (!product) {
      return <div>Product not found.</div>;
    }

    const productRequest: ProductRequest = {
      ...product,
      categories: Array.isArray(product.categories)
        ? product.categories.map(cat => typeof cat === 'object' ? cat.id : cat)
        : [],
    };

    return (
      <div>
        <ProductForm mode="edit" initialData={productRequest} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Error loading product. Please try again.</div>;
  }
}