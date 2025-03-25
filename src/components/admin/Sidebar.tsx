import Link from "next/link";


export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col fixed left-0 top-2">
      <div className="p-4 h-24">
      </div>
      <nav className="p-4 flex-grow overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block p-2 rounded hover:bg-whiteygreen hover:text-green-dark">
              Panel
            </Link>
          </li>
          <div className="ml-2">
            <li>
              <Link href="/dashboard/productos" className="block p-2 rounded hover:bg-whiteygreen hover:text-green-dark">
                Productos
              </Link>
            </li>
            <li>
              <Link href="/dashboard/ordenes" className="block p-2 rounded hover:bg-whiteygreen hover:text-green-dark">
                Ordenes
              </Link>
            </li>
            <li>
              <Link href="/dashboard/clientes" className="block p-2 rounded hover:bg-whiteygreen hover:text-green-dark">
                Clientes
              </Link>
            </li>
            <li>
              <Link href="/dashboard/categorias" className="block p-2 rounded hover:bg-whiteygreen hover:text-green-dark">
                Categorias
              </Link>
            </li>
            <li className="pt-4 mt-4 border-t">
              <Link href="/" className="block p-2 rounded hover:bg-whiteygreen hover:text-green-dark">
                Back to Store
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
