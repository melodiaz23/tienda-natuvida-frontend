// app/(admin)/dashboard/page.tsx
import { RefreshButton } from '@/components/common/RefreshButton';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold my-8">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products Card */}
        <DashboardCard
          title="Productos"
          count="Administración de productos"
          link="/admin/dashboard/productos"
          icon="📦"
        />

        {/* Orders Card */}
        <DashboardCard
          title="Ordenes"
          count="Ver nuevas órdenes"
          link="/admin/dashboard/ordenes"
          icon="🛒"
        />

        {/* Customers Card */}
        <DashboardCard
          title="Clientes"
          count="Manejo de clientes"
          link="/admin/dashboard/customers"
          icon="👤"
        />

        {/* Categories Card */}
        <DashboardCard
          title="Categorías"
          count="Administración de categorías"
          link="/admin/dashboard/categorias"
          icon="🏷️"
        />
      </div>
      <div className="my-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-4">

          <RefreshButton tag="products" />
          {/* Puedes agregar otros botones de revalidación por categoría */}
          <RefreshButton tag="categories" />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Usar estos botones actualizará los datos mostrados en la tienda para todos los usuarios.
        </p>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  count: string;
  link: string;
  icon: string;
}

function DashboardCard({ title, count, link, icon }: DashboardCardProps) {
  return (
    <Link href={link}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-1">{count}</p>
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </div>
    </Link>
  );
}