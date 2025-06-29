interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  product?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    location: "Bogotá, Colombia 🇨🇴",
    rating: 5,
    comment: `"La loción termoactiva de Natuvida me ha ayudado muchísimo con el dolor de articulaciones. Sin mencionar que la atención al cliente que recibí fue la mejor!"`,
    product: "Loción Termoactiva"
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    location: "Medellín, Colombia 🇨🇴",
    rating: 5,
    comment: `"Llevo 3 meses tomando Fibra Coliplus y mi digestión ha mejorado notablemente. Me siento mucho mejor cada día."`,
    product: "Fibra Coliplus"
  },
  {
    id: 3,
    name: "Ana Martín",
    location: "Cali, Colombia 🇨🇴",
    rating: 5,
    comment: `"El colágeno hidrolizado ha transformado mi piel y cabello. La calidad es excepcional y los resultados son visibles."`,
    product: "Colágeno Hidrolizado"
  },
  {
    id: 4,
    name: "Luis Fernández",
    location: "Barranquilla, Colombia 🇨🇴",
    rating: 4,
    comment: `"Liteplex me ha ayudado muchísimo con la gastritis. Desde que lo tomo, ya no tengo molestias estomacales."`,
    product: "Liteplex"
  }
];