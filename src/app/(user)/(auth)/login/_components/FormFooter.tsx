import React from 'react';
import { MODE } from '../_types';

interface FormFooterProps {
  mode: MODE;
  onModeChange: (mode: MODE) => void;
  onReset: () => void;
}

const FormFooter = ({ mode, onModeChange, onReset }: FormFooterProps) => {
  return (
    <div className="mt-4 text-center">
      {mode === MODE.LOGIN ? (
        <p className="text-gray-600">
          ¿No tienes una cuenta?{' '}
          <button
            type="button"
            className="text-green-dark hover:underline"
            onClick={() => {
              onReset();
              onModeChange(MODE.REGISTER);
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
              onReset();
              onModeChange(MODE.LOGIN);
            }}
          >
            Inicia sesión aquí
          </button>
        </p>
      )}
    </div>
  );
};

export default FormFooter;