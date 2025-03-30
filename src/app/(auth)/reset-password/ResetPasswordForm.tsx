'use client'
import { resetPassword } from "@/app/actions/authActions"
import LoadingDots from "@/components/loading-dots"
import { forgetPasswordSchema, ForgetPasswordSchema } from "@/lib/schemas/forgetPasswordSchema"
import { ActionResult } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"

export default function ResetPasswordForm() {
  const searhParams = useSearchParams()
  const [result, setResult] = useState<ActionResult<string | null>>()

  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitting } } = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: 'onTouched'
  })

  const onSubmit = async (data: ForgetPasswordSchema) => {
    const getResult = await resetPassword(data.password, searhParams.get('token') as string)
    setResult(getResult)
    reset()
    if (result?.status === 'success') {
      toast.success(result?.data as string)
    }
    if (result?.status === 'error') {
      toast.error(result?.message as string)
    }
  }

  return (<>
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <div className="w-2/5 flex flex-col gap-8 shadow-lg rounded-lg p-12 justify-center">
        <h2 className="text-2xl text-center">Recuperar contraseña</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="password">Ingresa tu nueva contraseña</label>
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="border border-neutral-200 px-4 py-2 rounded-lg"
            autoComplete="on"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          <label htmlFor="password">Confirma tu nueva contraseña</label>
          <input
            type="password"
            placeholder="Confirma tu nueva contraseña"
            className="border border-neutral-200 px-4 py-2 rounded-lg"
            autoComplete="on"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          <button
            type="submit"
            className="bg-green-dark text-whiteygreen hover:opacity-90 px-4 py-2 rounded-lg"
            disabled={!isValid || isSubmitting}
          > {
              isSubmitting
                ? <LoadingDots className="bg-whiteygreen" />
                : 'Recuperar contraseña'
            }</button>
          <ToastContainer />
        </form>

      </div>
    </div>
  </>)
}