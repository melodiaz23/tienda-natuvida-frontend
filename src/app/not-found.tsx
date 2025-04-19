import Link from 'next/link';


export default function NotFound() {
  return (
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
  );
}
