'use client';

import LoadingDots from "@/components/common/LoadingDots";
import { useAuth } from "@/context/AuthContext";
import { profileSchema, ProfileSchema } from "@/app/(user)/(auth)/login/_schemas/registerSchema"
import { ApiErrorData, ApiResponse } from "@/types/api.types";
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { FieldErrors, useForm } from "react-hook-form"
import { toast } from "react-toastify"

export default function EditInfoProfileForm() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting } } = useForm<ProfileSchema>({
      resolver: zodResolver(profileSchema),
      mode: 'onTouched',
      defaultValues: user ? {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city
      } : {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: ''
      }
    }
    )


  const onSubmit = async (data: ProfileSchema) => {
    try {
      const result = await updateProfile(data);
      if (result.success) {
        toast.success('Tu perfil se actualizó correctamente');
        router.push('/mi-cuenta');
      } else {
        toast.error(result.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      let errorMessage = 'Error al actualizar el perfil';
      if (error instanceof AxiosError) {
        // Manejar errores de Axios
        const errorData = error.response?.data as ApiErrorData;
        errorMessage =
          errorData?.message ||
          (errorData as ApiResponse<null>)?.errors?.[0] ||
          error.message;
      } else if (error instanceof Error) {
        // Manejar errores de JS estándar
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-12 justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Diligencia tus datos</h1>
          <p className="text-gray-500">Por favor, ingresa tu información para actualizar los datos de tu perfil.</p>
        </div>
        <form className="w-2/5 flex flex-col gap-4 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Nombre Completo</label>
          <input
            type="text"
            {...register('name')}
            id="name"
            placeholder="Ingresa tu nombre de usuario"
            required
            className="ring-2 ring-gray-300 rounded-md p-2"
          />
          {(<p className="text-red-500 text-sm">{(errors as FieldErrors<ProfileSchema>).name?.message}</p>
          )}
          <label htmlFor="lastName">Apellidos</label>
          <input
            type="text"
            {...register('lastName')}
            id="lastName"
            placeholder="Ingresa tus apellidos"
            className="ring-2 ring-gray-300 rounded-md p-2"
          />
          {<p className="text-red-500 text-sm">{(errors as FieldErrors<ProfileSchema>).lastName?.message}</p>}

          <label htmlFor="">Email</label>
          <input
            type="email"
            {...register('email')}
            id="email"
            placeholder="Ingresa tu email"
            required
            className="ring-2 ring-gray-300 rounded-md p-2"
          />
          {(<p className="text-red-500 text-sm">{(errors as FieldErrors<ProfileSchema>).email?.message}</p>
          )}
          <label htmlFor="">Teléfono</label>
          <input type="text" {...register('phone')} id="phone" placeholder="Ingresa tu telefono" className="ring-2 ring-gray-300 rounded-md p-2" />
          {<p className="text-red-500 text-sm">{(errors as FieldErrors<ProfileSchema>).phone?.message}</p>}
          <label htmlFor="">Dirección</label>
          <input type="text" {...register('address')} id="address" placeholder="Ingresa tu dirección" className="ring-2 ring-gray-300 rounded-md p-2" />
          {<p className="text-red-500 text-sm">{(errors as FieldErrors<ProfileSchema>).address?.message}</p>}
          <label htmlFor="city"> Ciudad</label>
          <input type="text" {...register('city')} id="city" placeholder="Ingresa tu ciudad" className="ring-2 ring-gray-300 rounded-md p-2" />
          {<p className="text-red-500 text-sm">{(errors as FieldErrors<ProfileSchema>).city?.message}</p>}
          <button
            type="submit"
            className="w-full bg-green-dark text-white rounded-md py-2 disabled:bg-green-dark/70"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? <LoadingDots className="bg-white" /> : 'Actualizar'}
          </button>
        </form>

      </div>

    </>
  )
}