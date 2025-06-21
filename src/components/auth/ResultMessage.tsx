'use client'

import clsx from "clsx";
import { useRouter } from "next/navigation";

import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

// TODO: Add prop types and implment authentication

export default function ResultMessage({ result }: { result: { status: string, message?: string, data?: string } }) {
  const router = useRouter()

  if (!result) return null

  return (
    <div className={clsx('p-3 rounded-xl w-full flex flex-col items-center justify-center gap-2 text-sm', {
      'text-red-800 bg-red-50': result?.status === 'error',
      'text-green-800 bg-green-50': result?.status === 'success',
    })}>
      {result.status === "success" ? (
        <FaCheckCircle size={20} className="text-green-800" />
      ) : (
        <FaExclamationTriangle size={20} className="text-red-800" />
      )}
      <div>{result.status === "success" ? (

        <p>
          {result.data}
        </p>

      ) : result.message as string}</div>
      {
        result.status === "success" && (
          <button className="border border-green-dark text-green-dark px-4 py-1 rounded-lg" onClick={() => router.push('/login')}>Ingresar</button>
        )
      }

    </div>
  )
}