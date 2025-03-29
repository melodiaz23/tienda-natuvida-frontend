'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { RestartPasswordSchema, restartPasswordSchema } from "@/lib/schemas/restartPasswordSchema";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import LoadingDots from "@/components/common/loading-dots";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login, register: registerUser, loading: authLoading } = useAuth();

  const [mode, setMode] = useState(MODE.LOGIN);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<RegisterSchema | LoginSchema | RestartPasswordSchema>({
    resolver: zodResolver(
      mode === MODE.REGISTER
        ? registerSchema
        : mode === MODE.LOGIN
          ? loginSchema
          : restartPasswordSchema
    ),
    mode: 'onTouched'
  });

  const formTitle = mode === MODE.LOGIN
    ? "Ingresar"
    : mode === MODE.REGISTER
      ? "Registrarse"
      : mode === MODE.RESET_PASSWORD
        ? "Restablecer contraseña"
        : "Por favor, verifica tu correo para completar tu registro.";

  const buttonTitle = mode === MODE.LOGIN
    ? "Ingresar"
    : mode === MODE.REGISTER
      ? "Registrarse"
      : mode === MODE.RESET_PASSWORD
        ? "Reestablecer"
        : "Ingresar";

  const onSubmit = async (data: RegisterSchema | LoginSchema | RestartPasswordSchema) => {
    setIsLoading(true);

    try {
      if (mode === MODE.REGISTER) {
        const response = await registerUser({
          name: (data as RegisterSchema).name,
          email: (data as RegisterSchema).email,
          password: (data as RegisterSchema).password
        });
        if (response && response.success) {
          setMode(MODE.EMAIL_VERIFICATION);
          toast.success('¡Registro exitoso! Por favor, revisa tu correo para verificar tu cuenta.');
        }
      }

      else if (mode === MODE.LOGIN) {
        const response = await login({
          email: (data as LoginSchema).email,
          password: (data as LoginSchema).password
        });
        if (response && response.success) {
          // Si el login es exitoso, redirigir al usuario
          router.push('/mi-cuenta');
          router.refresh();
        }
      }

      else if (mode === MODE.RESET_PASSWORD) {
        // Implement password reset functionality
        toast.info('Se ha enviado un correo de restablecimiento de contraseña si el email existe en nuestro sistema.');
        setMode(MODE.LOGIN);
      }
    } finally {
      setIsLoading(false);
      reset({ name: '', email: '', password: '' });
    }
  };

  return (
    <div className="flex items-center justify-center pt-32">
      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{formTitle}</h2>
        {mode === MODE.EMAIL_VERIFICATION ? (
          <div className="text-center py-8">
            <p className="mb-4">
              Hemos enviado un email de verificación a tu correo electrónico.
              Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
            </p>
            <button
              className="text-green-dark underline"
              onClick={() => setMode(MODE.LOGIN)}
            >
              Volver al inicio de sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {mode === MODE.REGISTER && (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ingresa tu nombre de usuario"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  {...register('name')}
                />
                {(errors as FieldErrors<RegisterSchema>).name && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors as FieldErrors<RegisterSchema>).name?.message}
                  </p>
                )}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="loginEmail"
                autoComplete="on"
                placeholder="Ingresa tu correo electrónico"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                {...register('email')}
              />
              {(errors as FieldErrors<LoginSchema>).email && (
                <p className="text-red-500 text-sm mt-1">
                  {(errors as FieldErrors<LoginSchema>).email?.message}
                </p>
              )}
            </div>

            {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                  {...register('password')}
                />
                {(errors as FieldErrors<LoginSchema>).password && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors as FieldErrors<LoginSchema>).password?.message}
                  </p>
                )}
              </div>
            )}

            {mode === MODE.LOGIN && (
              <div className="text-right mb-4">
                <button
                  type="button"
                  className="text-sm text-green-dark hover:underline"
                  onClick={() => {
                    reset({ email: '', password: '' });
                    setMode(MODE.RESET_PASSWORD);
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || authLoading || !isValid}
              className="w-full bg-green-dark text-whiteygreen py-2 px-4 rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isLoading || authLoading ? <LoadingDots className="bg-whiteygreen" /> : buttonTitle}
            </button>

            <div className='mt-4'>
              <SocialLogin />
            </div>

            <div className="mt-4 text-center">
              {mode === MODE.LOGIN ? (
                <p className="text-gray-600">
                  ¿No tienes una cuenta?{' '}
                  <button
                    type="button"
                    className="text-green-dark hover:underline"
                    onClick={() => {
                      reset({ name: '', email: '', password: '' });
                      setMode(MODE.REGISTER);
                    }}
                  >
                    Regístrate aquí
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  ¿Ya tienes una cuenta?{' '}
                  <button
                    type="button"
                    className="text-green-dark hover:underline"
                    onClick={() => {
                      reset({ name: '', email: '', password: '' });
                      setMode(MODE.LOGIN);
                    }}
                  >
                    Inicia sesión aquí
                  </button>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;