'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';


export default function Page() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="my-8 mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mi cuenta</h1>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Información personal</h2>
            <p><span className="font-medium">Nombre:</span> {user?.name} {user?.lastName}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p><span className="font-medium">Teléfono:</span> {user != null ? user.phone : ''}</p>
            <p><span className="font-medium">Dirección:</span> {user != null ? user.address : ''}</p>
            <div className="mt-4">
              <Link
                href="/mi-cuenta/editar"
                className="bg-green-dark hover:bg-green-800 text-white py-2 px-4 rounded transition-colors"
              >
                Editar información
              </Link>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Mis pedidos</h2>
            {/* Aquí puedes mostrar los pedidos del usuario o un mensaje si no tiene */}
            <p>No tienes pedidos recientes.</p>
            <div className="mt-4">
              <Link
                href="/tienda"
                className="bg-green-dark hover:bg-green-800 text-white py-2 px-4 rounded transition-colors"
              >
                Ir a la tienda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}