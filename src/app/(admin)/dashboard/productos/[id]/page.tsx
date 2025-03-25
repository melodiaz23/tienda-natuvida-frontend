
import CreateUpdateProductForm from "@/components/admin/CreateUpdateProductForm";
import { productService } from "@/services/productService";


export default async function EditProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const response = await productService.getProductById(resolvedParams.id);
  const product = response.data;

  return (
    <div>
      <CreateUpdateProductForm initialData={product} />
    </div>
  );
}