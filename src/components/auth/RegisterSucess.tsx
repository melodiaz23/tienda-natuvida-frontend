'use client';
import { useRouter } from "next/navigation"

export default function RegisterSuccess() {
  const router = useRouter()
  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 items-center justify-center flex flex-col text-green-dark font-semibold">
      <div className="border rounded-lg shadow-xl w-2/5 h-1/2 flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl text-center">Te has registrado exitosamente</h1>
        <p className="text-center text-gray-500">Ahora puedes iniciar sesión con tu cuenta</p>
        <div className="w-2/3 text-lg text-green-dark text-center rounded-md underline px-4 py-3 cursor-pointer border border-green-dark" onClick={() => router.push('/login')}>Ingresar ahora</div>
      </div>
    </div>
  )
}