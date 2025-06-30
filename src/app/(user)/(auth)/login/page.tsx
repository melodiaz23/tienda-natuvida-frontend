'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/app/(user)/(auth)/login/_schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/app/(user)/(auth)/login/_schemas/registerSchema";
import { RestartPasswordSchema, restartPasswordSchema } from "@/app/(user)/(auth)/login/_schemas/restartPasswordSchema";
import { toast } from "react-toastify";
import EmailVerification from './_components/EmailVerification';
import LoginForm from './_components/LoginForm';
import { MODE } from './_types';
import { Card } from '@heroui/react';


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

  const onSubmit = async (data: RegisterSchema | LoginSchema | RestartPasswordSchema) => {
    setIsLoading(true);

    try {
      if (mode === MODE.REGISTER) {
        const response = await registerUser({
          name: (data as RegisterSchema).name,
          lastName: (data as RegisterSchema).lastName,
          email: (data as RegisterSchema).email,
          password: (data as RegisterSchema).password
        });
        if (response && response.success) {
          setMode(MODE.EMAIL_VERIFICATION);
        }
      }

      else if (mode === MODE.LOGIN) {
        const response = await login({
          email: (data as LoginSchema).email,
          password: (data as LoginSchema).password
        });

        if (response && response.success) {
          const redirectUrl = response.data?.redirectUrl || '/mi-cuenta';
          router.push(redirectUrl);
        }
      }

      else if (mode === MODE.RESET_PASSWORD) {
        toast.info('Si el email existe en nuestro sistema, se ha enviado un correo de restablecimiento de contraseña');
        setMode(MODE.LOGIN);
      }
    } finally {
      setIsLoading(false);
      reset({ name: '', email: '', password: '' });
    }
  };

  return (
    <div className="flex items-center justify-center pt-32">
      <Card className='p-8 mx-auto'>
        {mode === MODE.EMAIL_VERIFICATION ? (
          <EmailVerification onBackToLogin={() => setMode(MODE.LOGIN)} />
        ) : (
          <LoginForm
            mode={mode}
            isLoading={isLoading}
            authLoading={authLoading}
            isValid={isValid}
            errors={errors}
            register={register}
            onSubmit={handleSubmit(onSubmit)}
            onModeChange={setMode}
            onReset={reset}
          />
        )}
      </Card>
    </div>
  );
};

function Page() {
  return <LoginPage />;
}

export default Page;