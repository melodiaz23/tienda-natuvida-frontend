import React from 'react';

interface EmailVerificationProps {
  onBackToLogin: () => void;
}

const EmailVerification = ({ onBackToLogin }: EmailVerificationProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Por favor, verifica tu correo para completar tu registro.
      </h2>
      <div className="text-center py-8">
        <p className="mb-4">
          Hemos enviado un email de verificación a tu correo electrónico.
          Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
        </p>
        <button
          className="text-green-dark underline"
          onClick={onBackToLogin}
        >
          Volver al inicio de sesión
        </button>
      </div>
    </>
  );
};

export default EmailVerification;