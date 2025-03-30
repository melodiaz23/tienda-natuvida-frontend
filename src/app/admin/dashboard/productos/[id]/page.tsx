import CreateUpdateProductForm from "@/components/admin/CreateUpdateProductForm";
import { productService } from "@/services/productService";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const response = await productService.getProductById(resolvedParams.id);
    const product = response.data;

    return (
      <div>
        <CreateUpdateProductForm initialData={product} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Error loading product. Please try again.</div>;
  }
}