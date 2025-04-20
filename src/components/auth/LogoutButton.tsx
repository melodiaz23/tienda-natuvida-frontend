'use client'

import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

type LogoutButtonProps = {
  className?: string;
  redirectTo?: string;
  children?: React.ReactNode;
};

export default function LogoutButton({
  className = "block p-2 rounded hover:bg-whiteygreen hover:text-green-dark",
  redirectTo = "/login",
  children = "Log Out"
}: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success('Sesión cerrada exitosamente');
      router.push(redirectTo);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={className}
    >
      {isLoggingOut ? 'Cerrando sesión...' : children}
    </button>
  );
}