import React, { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { LoginSchema } from '@/app/(user)/(auth)/login/_schemas/loginSchema';
import { RegisterSchema } from '@/app/(user)/(auth)/login/_schemas/registerSchema';
import { RestartPasswordSchema } from '@/app/(user)/(auth)/login/_schemas/restartPasswordSchema';
import { MODE } from '../_types';
import { Input } from '@heroui/input';

interface FormFieldsProps {
  mode: MODE;
  errors: FieldErrors<RegisterSchema | LoginSchema | RestartPasswordSchema>;
  register: UseFormRegister<RegisterSchema | LoginSchema | RestartPasswordSchema>;
}

export const FormFields = ({
  mode,
  errors,
  register,
}: FormFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <div className="space-y-4">
      {mode === MODE.REGISTER && (
        <>
          <Input
            label="Nombre"
            type="text"
            variant="underlined"
            placeholder="Ingresa tu nombre"
            isInvalid={!!(errors as FieldErrors<RegisterSchema>).name}
            errorMessage={(errors as FieldErrors<RegisterSchema>).name?.message}
            {...register('name')}
          />

          <Input
            label="Apellido"
            type="text"
            variant="underlined"
            placeholder="Ingresa tu apellido"
            isInvalid={!!(errors as FieldErrors<RegisterSchema>).lastName}
            errorMessage={(errors as FieldErrors<RegisterSchema>).lastName?.message}
            {...register('lastName')}
          />
        </>
      )}

      <Input
        label="Email"
        type="email"
        variant="underlined"
        placeholder="Ingresa tu correo electrónico"
        autoComplete="email"
        isInvalid={!!(errors as FieldErrors<LoginSchema>).email}
        errorMessage={(errors as FieldErrors<LoginSchema>).email?.message}
        {...register('email')}
      />

      {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
        <Input
          label="Contraseña"
          variant="underlined"
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          isInvalid={!!(errors as FieldErrors<LoginSchema>).password}
          errorMessage={(errors as FieldErrors<LoginSchema>).password?.message}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="h-5 w-5 text-default-400 pointer-events-none" />
              )}
            </button>
          }
          {...register('password')}
        />
      )}

      {mode === MODE.REGISTER && (
        <Input
          label="Repite la contraseña"
          variant="underlined"
          placeholder="Repite la contraseña"
          autoComplete="new-password"
          type={showPassword2 ? 'text' : 'password'}
          isInvalid={!!(errors as FieldErrors<RegisterSchema>).password2}
          errorMessage={(errors as FieldErrors<RegisterSchema>).password2?.message}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? (
                <EyeSlashIcon className="h-5 w-5 text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="h-5 w-5 text-default-400 pointer-events-none" />
              )}
            </button>
          }
          {...register('password2')}
        />
      )}
    </div>
  );
};