
export default function Price({ value, className = 'text-2xl font-bold text-green-dark' }: { value: number, className?: string }) {
  return (
    <span className={className}>
      {value.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replace(/\u00A0/g, '')}
    </span>
  );
}