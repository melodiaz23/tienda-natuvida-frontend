import ProductForm from '@/components/admin/products/ProductForm';
import ProductProvider from '@/context/ProductContext';

type PageProps = { params: { id: string } };

export default async function EditProductPage({ params }: PageProps) {
  const { id } = params;


  return (
    <ProductProvider >
      <div>
        <ProductForm mode="edit" id={id} />
      </div>
    </ProductProvider>
  );
}
