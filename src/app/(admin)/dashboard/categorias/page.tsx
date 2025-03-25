import { categoryService } from "@/services/categoryService";
import CreateUpdateCategoriesForm from "@/components/admin/CreateUpdateCategoriesForm";
import CategoryCard from "@/components/admin/CategoryCard";

export default async function AdminCategoriesPage() {
  const response = await categoryService.getAllCategories();
  const categories = response.data;

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Página de Categorías</h1>
      </div>

      <CreateUpdateCategoriesForm />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {categories.length > 0 ?
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          )) :
          <div className="text-gray-600 italic">No existen categorías por mostrar</div>
        }
      </div>
    </div>
  );
}