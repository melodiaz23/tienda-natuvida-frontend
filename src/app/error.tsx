'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12">
      <h2 className="text-xl font-bold">Oh no!</h2>
      <p className="my-2">
        Hubo un error inesperado. Por favor, vuelve a intentarlo luego.
      </p>
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-green-dark p-4 tracking-wide text-white hover:opacity-90"
        onClick={() => reset()}
      >
        Intentar de nuevo.
      </button>
    </div>
  );
}
