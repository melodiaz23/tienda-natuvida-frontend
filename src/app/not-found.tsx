import Link from 'next/link';
import { Suspense } from 'react';

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="p-4 pt-24 flex flex-col items-center h-screen">
          <h2>Página no encontrada</h2>
          <p>La página que estás buscando no existe.</p>
          <Link
            href="/"
            className="p-4">
            Regresar a la página principal
          </Link>
        </div>
      </div>
    </Suspense>
  );
}
