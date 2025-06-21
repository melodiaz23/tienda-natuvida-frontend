
import { AuthProvider } from "@/context/AuthContext";
import ToastProvider from "./toast.provider";
import { ReactNode } from "react";
import CartProvider from "@/context/CartContext";


export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider >
          {children}
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}