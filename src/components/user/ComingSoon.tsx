import Link from "next/link";

export default function ComingSoon() {
  return (<div className="bg-gray-100 dark:bg-green-dark">
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">¡Muy pronto!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center">Sitio en Construcción</p>
        <div className="flex flex-wrap justify-center p-4 text-2xl">
          <Link
            href={'https://api.whatsapp.com/send?phone=573208680091&text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Natuvida'}
            className="inline-block w-1/2 bg-gray-950 text-white font-bold text-l p-2 m-4 rounded text-center">
            Escríbenos
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}