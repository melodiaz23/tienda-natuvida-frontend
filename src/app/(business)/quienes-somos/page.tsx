export default function QuienesSomos() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      {/* Encabezado */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Quiénes Somos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Conoce la historia detrás de Natuvida, una familia comprometida con tu bienestar y salud natural.
        </p>
      </div>

      {/* Nuestra Historia */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Nuestra Historia</h2>
          <p className="mb-4 text-gray-700">
            Natuvida nació en el seno de nuestra familia, impulsada por una profunda pasión por el bienestar y la salud natural.
            Lo que comenzó como una búsqueda personal de alternativas saludables para nuestra propia familia, se transformó
            en una misión para compartir ese conocimiento con toda la comunidad.
          </p>
          <p className="mb-4 text-gray-700">
            Fundada en 2024, nuestra empresa surgió cuando descubrimos el impacto positivo que los productos naturales tuvieron en
            nuestra calidad de vida. Decidimos entonces que estas soluciones debían estar al alcance de todos, con la
            garantía de calidad y el respaldo del conocimiento que habíamos adquirido.
          </p>
          <p className="text-gray-700">
            Hoy, Natuvida se ha convertido en un propulsor del bienestar de todos nuestros clientes, manteniendo siempre
            el espíritu familiar y cercano que nos caracterizó desde el primer día.
          </p>
        </div>
        {/* <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-full max-w-md h-80 rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-green-100 flex items-center justify-center">
              <span className="text-green-800">Imagen: Familia fundadora de Natuvida</span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Misión y Visión */}
      <div className="bg-green-50 rounded-xl p-8 md:p-12 mb-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">Nuestra Misión</h2>
            <p className="text-gray-700">
              En Natuvida, nos dedicamos a empoderar a las personas en su camino hacia una vida más saludable,
              proporcionando productos naturales de la más alta calidad y compartiendo conocimientos sobre el
              cuidado integral de la salud y el bienestar.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-6">Nuestra Visión</h2>
            <p className="text-gray-700">
              Aspiramos a ser reconocidos como el referente nacional en soluciones naturales para el bienestar,
              creando una comunidad educada y consciente sobre la importancia de incorporar lo natural en su estilo
              de vida, contribuyendo así a un mundo más saludable.
            </p>
          </div>
        </div>
      </div>

      {/* Nuestros Valores */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Nuestros Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">Autenticidad</h3>
            <p className="text-gray-600">
              Promovemos productos genuinamente naturales, respetando siempre la transparencia en nuestra comunicación.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">Bienestar Integral</h3>
            <p className="text-gray-600">
              Creemos en el equilibrio entre cuerpo y mente como base fundamental de una vida plena y saludable.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-3">Espíritu Familiar</h3>
            <p className="text-gray-600">
              Tratamos a nuestros clientes como parte de nuestra familia, con cercanía, calidez y compromiso.
            </p>
          </div>
        </div>
      </div>

      {/* Nuestro Compromiso */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        {/* <div className="flex justify-center">
          <div className="relative w-full max-w-md h-80 rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-green-100 flex items-center justify-center">
              <span className="text-green-800">Imagen: Productos naturales Natuvida</span>
            </div>
          </div>
        </div> */}
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-6">Nuestro Compromiso</h2>
          <p className="mb-4 text-gray-700">
            En Natuvida, nos comprometemos a seleccionar cuidadosamente cada uno de nuestros productos,
            garantizando su origen natural y beneficios reales para la salud. Trabajamos directamente con
            proveedores confiables que comparten nuestra visión de calidad y respeto por la naturaleza.
          </p>
          <p className="mb-4 text-gray-700">
            Además, nos dedicamos a la educación continua sobre el bienestar integral, compartiendo información
            valiosa sobre prácticas saludables, propiedades de los ingredientes naturales y formas de incorporarlos
            en la vida diaria.
          </p>
          <p className="text-gray-700">
            Creemos firmemente que el verdadero bienestar se construye día a día, con decisiones informadas
            y hábitos conscientes. En Natuvida, no solo vendemos productos: compartimos un estilo de vida.
          </p>
        </div>
      </div>

      {/* Únete a Nuestra Familia */}
      <div className="text-center bg-green-700 text-white rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-6">Únete a la Familia Natuvida</h2>
        <p className="max-w-3xl mx-auto mb-8 text-green-50">
          Te invitamos a ser parte de nuestra comunidad comprometida con el bienestar natural.
          Descubre nuestros productos y conoce más sobre cómo cuidar tu salud de manera integral.
        </p>
        <button className="bg-white text-green-700 font-semibold py-3 px-8 rounded-lg hover:bg-green-100 transition duration-300">
          Explora Nuestros Productos
        </button>
      </div>
    </div>
  );
}