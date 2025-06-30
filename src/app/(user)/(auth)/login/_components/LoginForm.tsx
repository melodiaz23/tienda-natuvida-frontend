import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { LoginSchema } from '@/app/(user)/(auth)/login/_schemas/loginSchema';
import { RegisterSchema } from '@/app/(user)/(auth)/login/_schemas/registerSchema';
import { RestartPasswordSchema } from '@/app/(user)/(auth)/login/_schemas/restartPasswordSchema';
import LoadingDots from '@/components/common/LoadingDots';
import SocialLogin from '@/components/auth/SocialLogin';
import FormFooter from './FormFooter';
import { MODE } from '../_types';
import { Button, CardBody, CardHeader } from '@heroui/react';
import { FormFields } from './FormFields';

interface LoginFormProps {
  mode: MODE;
  isLoading: boolean;
  authLoading: boolean;
  isValid: boolean;
  errors: FieldErrors<RegisterSchema | LoginSchema | RestartPasswordSchema>;
  register: UseFormRegister<RegisterSchema | LoginSchema | RestartPasswordSchema>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onModeChange: (mode: MODE) => void;
  onReset: () => void;
}

const LoginForm = ({
  mode,
  isLoading,
  authLoading,
  isValid,
  errors,
  register,
  onSubmit,
  onModeChange,
  onReset
}: LoginFormProps) => {
  const buttonTitle = mode === MODE.LOGIN
    ? "Ingresar"
    : mode === MODE.REGISTER
      ? "Registrarse"
      : "Reestablecer";

  return (
    <>
      <CardHeader className='flex flex-col items-center justify-center text-2xl font-bold mb-4 text-center' >
        {mode === MODE.LOGIN
          ? "Ingresar"
          : mode === MODE.REGISTER
            ? "Registrarse"
            : "Restablecer contraseña"}
      </CardHeader>

      <CardBody>
        <form onSubmit={onSubmit}>
          <FormFields
            mode={mode}
            errors={errors}
            register={register}
          />

          <Button
            type="submit"
            isDisabled={isLoading || authLoading || !isValid}
            isLoading={isLoading || authLoading}
            variant="solid"
            size="lg"
            className="w-full mt-6 bg-green-dark text-whiteygreen"
            spinner={<LoadingDots className="bg-white" />}
          >
            {buttonTitle}
          </Button>

          {mode === MODE.LOGIN && (
            <div className="text-right">
              <Button
                variant="light"
                size="sm"
                className="text-sm text-green-dark hover:underline px-0 h-auto hover:bg-white!"
                onPress={() => {
                  onReset();
                  onModeChange(MODE.RESET_PASSWORD);
                }}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
          )}

          <div className='mt-4'>
            <SocialLogin />
          </div>

          <FormFooter
            mode={mode}
            onModeChange={onModeChange}
            onReset={onReset}
          />
        </form>
      </CardBody>
    </>
  );
};

export default LoginForm;