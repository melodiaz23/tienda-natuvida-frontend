import ProductForm from '@/components/admin/products/ProductForm';
import ProductProvider from '@/context/ProductContext';

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;


  return (
    <ProductProvider >
      <div>
        <ProductForm mode="edit" id={id} />
      </div>
    </ProductProvider>
  );
}
