'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string },
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
    // TODO: Implement actual error logging service
  }, [error]);

  return (
    <div className="mx-auto my-12 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12">
      <h2 className="text-2xl font-bold text-red-600 text-center">¡Algo salió mal!</h2>
      <p className="my-4 text-gray-700">
        Ocurrió un error inesperado.
        Nuestro equipo ha sido notificado.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="flex-1 bg-nv-green-light text-white p-3 rounded-md hover:bg-green-dark"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-md text-center hover:bg-gray-300"
        >
          Ir al Inicio
        </Link>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 text-sm text-gray-500">
          <summary>Detalles técnicos</summary>
          <pre>{error.message}</pre>
          {error.digest && <p>Error Digest: {error.digest}</p>}
        </details>
      )}
    </div>
  );
}