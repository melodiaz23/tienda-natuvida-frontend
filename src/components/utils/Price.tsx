
export default function Price({ value }: { value: number }) {
  return (
    <span>
      {value.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replace(/\u00A0/g, '')}
    </span>
  );
}