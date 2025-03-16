export const perks: Record<string, JSX.Element[]> = {
  salud: [
    <span key="salud-1">
      <strong>Fortalece las articulaciones y alivia el dolor:</strong> Mejora la
      salud de las articulaciones y reduce el dolor de la osteoartritis.
    </span>,
    <span key="salud-2">
      <strong>Mejora la salud ósea:</strong> Fortalece los huesos e hidrata las
      articulaciones, previniendo dolores.
    </span>,
    <span key="salud-3">
      <strong>Mejora la recuperación de lesiones:</strong> Facilita la
      reparación de tejidos y acelera la recuperación.
    </span>,
    <span key="salud-4">
      <strong>Combate el estrés y la ansiedad:</strong> Ayuda a regular el
      sistema nervioso, mejorando el sueño y reduciendo la ansiedad.
    </span>,
    <span key="salud-5">
      <strong>Reduce el cansancio:</strong> El magnesio mejora la producción de
      energía, reduciendo la fatiga.
    </span>,
    <span key="salud-6">
      <strong>Mejora la movilidad:</strong> Aumenta la flexibilidad y movilidad
      de las articulaciones.
    </span>,
    <span key="salud-7">
      <strong>Soporte estructural integral:</strong> Apoya la salud del corazón,
      músculos y otros órganos vitales.
    </span>,
    <span key="salud-8">
      <strong>Aumento de la concentración:</strong> para las actividades del día
      a día.
    </span>,
    <span key="salud-9">
      <strong>Respuesta con mayor eficiencia:</strong> del sistema inmunológico.
    </span>,
  ],
  belleza: [
    <span key="belleza-1">
      <strong>Mantiene la piel firme:</strong> Reduce arrugas y líneas de
      expresión, mejorando la elasticidad de la piel.
    </span>,
    <span key="belleza-2">
      <strong>Estimula el crecimiento del cabello:</strong> Fortalece el
      cabello, aumentando su grosor y reduciendo la caída.
    </span>,
    <span key="belleza-3">
      <strong>Fortalece las uñas:</strong> Mejora la resistencia y crecimiento
      de las uñas débiles.
    </span>,
  ],
  sport: [
    <span key="sport-1">
      <strong>Tonifica los músculos:</strong> Mantiene la masa muscular y mejora
      la función muscular.
    </span>,
    <span key="sport-2">
      <strong>Mejora la recuperación de lesiones:</strong> Facilita la
      reparación de tejidos y acelera la recuperación.
    </span>,
    <span key="sport-5">
      <strong>Reduce el cansancio:</strong> El magnesio mejora la producción de
      energía, reduciendo la fatiga.
    </span>,
    <span key="sport-8">
      <strong>Aumento de la concentración:</strong> para las actividades del día
      a día.
    </span>,
  ],
  default: [],
};

// Function to remove duplicates based on inner text content
const uniqueElements = (elements: JSX.Element[]) => {
  const seen = new Set();
  return elements.filter((element) => {
    const textContent = element.props.children
      .map((child: any) =>
        typeof child === 'string' ? child : child.props.children
      )
      .join('');
    if (seen.has(textContent)) {
      return false;
    } else {
      seen.add(textContent);
      return true;
    }
  });
};

perks.default = uniqueElements([
  ...perks.salud,
  ...perks.belleza,
  ...perks.sport,
]);

export default perks;
